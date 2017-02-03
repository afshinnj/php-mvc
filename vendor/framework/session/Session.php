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
        SessionModel::Query("
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
        SessionModel::delete_all(array('conditions' => 'expire < "'.$expire.'"'));
    }
    /**
     * Constructor
     */
    public function __construct() {
      ini_set('session.save_handler', 'user');

       Loader::load('Configs');
       $this->expire = Configs::get('sessExpire') + 1200;
       $this->sessionTable = Configs::get('sessTable');
       $this->start();

      register_shutdown_function(array($this, 'sessionClose'));

      $sess = SessionModel::find('all', array('conditions' => array('id = ?', session_id())));
      if($sess == NULL){
        $expire = time() + $this->expire;
        $insert = new SessionModel();
        $insert->id = session_id();
        $insert->expire = $expire;
        $insert->save();
        }


    }
    /**
     * Update the current session ID with a newly generated one.
     * @param boolean $deleteOldSession Whether to delete the old associated session values or not
     */
    /*public function regenerateId($deleteOldSession = false) {
        $oldId = session_id();
        if (empty($oldId)) {
            return;
        }
        session_regenerate_id();
        $newId = session_id();
        if (!$deleteOldSession) {
          $update = SessionModel::find($oldId);
          $update->id = $newId;
          $update->save();
        } else {
            $expire = time() + $this->expire;
            $insert = new SessionModel();
            $insert->id = $newId;
            $insert->expire = $expire;
            $insert->save();
        }
    }*/
    /**
     * Actually start the session
     */
    public function start() {
        session_set_save_handler(
                array($this, 'sessionOpen'),
                array($this, 'sessionClose'),
                array($this, 'sessionRead'),
                array($this, 'sessionWrite'),
                array($this, 'sessionDestroy'),
                array($this, 'sessionGC')
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
        ///SessionModel::delete_all(array('conditions' => 'expire = "0"'));
        SessionModel::delete_all(array('conditions' => 'id = "'.$id.'"'));
        return TRUE;//(Driver::AffectedRows() > 0);
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
                $this->_createTable();
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
        $rows = SessionModel::find('all', array('conditions' => array('id = ? AND expire > ?', $id, time())));
        $data = 0;
        foreach ($rows as $key => $value) {
            $data = $value->data;
        }
        return (count($data) > 0 ? base64_decode($data) : null);
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
        SessionModel::Query("INSERT INTO `{$this->sessionTable}` VALUES ('{$id}','{$data}','{$expire}','') ON DUPLICATE KEY UPDATE `data`='{$data}',`expire`='{$expire}'");
    }

}
