<?php
class Session {
    public $sessionTable = null;
    public $autoCreateSessionTable = true;
    public $expire; // 20 minutes
    public $autoStart = true;
    /**
     * Create the session table
     */
    private function _createTable() {
        Driver::Query("
            CREATE TABLE IF NOT EXISTS `{$this->sessionTable}` (
                `id` char(32) COLLATE utf8_bin NOT NULL,
                `expire` int(11) DEFAULT NULL,
                `data` longblob,
                `token` char(32) COLLATE utf8_bin NOT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8
        ");
    }
    /**
     * Deletes expired session
     */
    private function _deleteExpired() {
        $expire = time();
        Driver::Query("DELETE FROM '{$this->sessionTable}` WHERE (`expire`<'{$expire}')");
       
    }
    /**
     * Constructor
     */
    public function __construct($autoStart = true) {
       Loader::load('Configs');
       $this->expire = Configs::get('sessExpire') + 1200;
      
       $this->sessionTable = Configs::get('sessTable');
        ini_set('session.save_handler', 'user');
        $this->autoStart = $autoStart;
        if ($this->autoStart) {
            $this->start();
        }
       //$this->checkSession();
        register_shutdown_function(array($this, 'sessionClose'));
    }
    /**
     * Update the current session ID with a newly generated one.
     * @param boolean $deleteOldSession Whether to delete the old associated session values or not
     */
    public function regenerateId($deleteOldSession = false) {
        $oldId = session_id();
        if (empty($oldId)) {
            return;
        }
        session_regenerate_id();
        $newId = session_id();
        if (!$deleteOldSession) {
            Driver::Query("UPDATE `{$this->sessionTable}` SET `id`='{$newId}' WHERE (`id`='{$oldId}')");
        } else {
            $expire = time() + $this->expire;
            Driver::Query("INSERT INTO `{$this->sessionTable}` VALUES ('{$newId}','{$expire}','','')");
        }
    }
    /**
     * Actually start the session
     */
    public function start() {
        session_set_save_handler(
                array($this, 'sessionOpen'), array($this, 'sessionClose'), array($this, 'sessionRead'), array($this, 'sessionWrite'), array($this, 'sessionDestroy'), array($this, 'sessionGC')
        );
        session_start();
        if (session_id() == '') {
            throw new Exception('Failed to start session.');
        }
    }
    /**
     * Ends the current session and store session data
     * Do not call this method directly.
     */
    public function sessionClose() {
        $this->_deleteExpired();
        if (session_id() !== '') {
            @session_write_close();
        }
    }
    /**
     * Session destroy handler
     * Do not call this method directly.
     * param string $id session ID
     * @return boolean whether session is destroyed successfully
     */
    public function sessionDestroy($id) {
        Driver::Query("DELETE FROM `{$this->sessionTable}` WHERE (`expire`= 0 )");
        Driver::Query("DELETE FROM `{$this->sessionTable}` WHERE (`id`='{$id}')");
        return (Driver::AffectedRows() > 0);
    }
    /**
     * Session GC (garbage collector) handler
     * Do not call this method directly.
     * @param integer $maxLifetime The number of seconds after which data will be seen as 'garbage' and cleaned up.
     * @return boolean whether session is GCed successfully.
     */
    public function sessionGC($id) {
        $this->_deleteExpired();
        return true;
    }
    /**
     * Session open handler
     * Do not call this method directly.
     * @param string @savePath session save path
     * @param @sessionName session name
     * @return boolean Whether session is opened successfully
     */
    public function sessionOpen($savePath, $sessionName) {
        if ($this->autoCreateSessionTable) {
            $this->_deleteExpired();
            if (Driver::AffectedRows() < 0) {
                $this->_createTable();
            }
        }
        return true;
    }
    /**
     * Session read handler
     * Do not call this method directly.
     * @param string $id session ID
     * @return string the session data
     */
    public function sessionRead($id) {
        $expire = time();
        $data = Driver::ArrayQuery("SELECT `data` FROM `{$this->sessionTable}` WHERE (`id`='{$id}' AND `expire`>='{$expire}')");
        return (count($data) > 0 ? base64_decode($data[0]['data']) : null);
    }
    /**
     * Session write hanlder
     * Do not call this method directly.
     * @param string $id Session ID
     * @param string $data session data
     * @return boolean Whether session write is successful
     */
    public function sessionWrite($id, $data) {
        $data = base64_encode($data);
        $expire = time() + $this->expire;
        Driver::Query("INSERT INTO `{$this->sessionTable}` VALUES ('{$id}','{$data}','{$expire}','') ON DUPLICATE KEY UPDATE `data`='{$data}',`expire`='{$expire}'");
    }
    /**
     * Count online users
     */
    public function onlineCount() {
        $expire = time();
        $data = Driver::ArrayQuery("SELECT COUNT(*) AS `total` FROM `{$this->sessionTable}` WHERE (`expire`>='{$expire}')");
        return $data[0]['total'];
    }
    public function onlineUsers() {
        $expire = time();
        $data = Driver::ArrayQuery("SELECT `data` FROM `{$this->sessionTable}` WHERE (`expire`>='{$expire}')");
        $users = array();
        foreach ($data as $item) {
            $item = base64_decode($item['data']);
            if (preg_match('#username.*?"(.*?)"#i', $item, $match)) {
                $users[] = $match[1];
            }
        }
        return $users;
    }

}