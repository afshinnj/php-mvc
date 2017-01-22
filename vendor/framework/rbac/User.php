<?php

class User {

    public static $pdo;
    public static $log;

//public static $config;
    public function __construct() {
        $this->_createTable();
        self::$pdo = Loader::load('PDO_Driver');

        Loader::load('UserRole');
        self::$log = new Logger();

        self::$pdo->query("UPDATE `user` SET `login` = 0 WHERE `expire` < " . time() . "");
    }

    private function _createTable() {
        Driver::Query("
                    CREATE TABLE IF NOT EXISTS `user` (
                      `id` int(11) NOT NULL AUTO_INCREMENT,
                      `token` char(32) NOT NULL,
                      `username` varchar(255) NOT NULL,
                      `password` varchar(255) NOT NULL,
                      `profile_id` int(11) NOT NULL,
                      `ip` char(32) NOT NULL,
                      `login` int(11) NOT NULL,
                      `hash` char(32) NOT NULL,
                      `role_id` int(11) DEFAULT 0,
                      `expire` int(11) DEFAULT NULL,
                      `data` LONGTEXT DEFAULT NULL,
                    PRIMARY KEY (`id`)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ");
    }

    public static function get_hash() {
        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT `hash` FROM user WHERE token = :token LIMIT 1");
    }

    public static function get_pass() {
        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT `password` FROM user WHERE token = :token LIMIT 1");
    }

    public static function get_id() {
        self::$pdo->bind("token", $_SESSION['token']);
       $id =  self::$pdo->single("SELECT `id` FROM user WHERE token = :token LIMIT 1");
       $_SESSION['User_Id'] = $id;
       return $id;
    }

    public static function check_login() {
        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT `login` FROM user WHERE token = :token LIMIT 1");
    }

    public static function set_login() {
        $id = self::get_id();
        self::$pdo->bind("login", 1);
        self::$pdo->bind("token", $_SESSION['token']);
        self::$pdo->bind("id", $id);
        self::$pdo->bind("expire", Configs::get('sessExpire') + time());
        return self::$pdo->single("UPDATE `user` SET `login` = :login, `expire` = :expire   WHERE `user`.`token` = :token and `user`.`id` = :id");
    }

    public static function set_token() {
        $config = Loader::load('Configs');
        $token = Encryption::token();
        $id = self::get_id();
        self::$pdo->bind("token", $token);
        self::$pdo->bind("id", $id);
        self::$pdo->single("UPDATE `user` SET `token` = :token WHERE `user`.`id` = :id");

        $_SESSION['token'] = $token;

        $sess_id = session_id();
        Driver::Query("UPDATE `$config->sessTable` SET `token` = '{$token}' WHERE id = '{$sess_id}'");
    }

    public static function get_token($username) {

        self::$pdo->bind("username", $username);
        $token = self::$pdo->single("SELECT `token` FROM user WHERE username = :username LIMIT 1");
        $_SESSION['token'] = $token;
        return $token;
    }

    public static function logout() {
        self::$pdo->bind("token", $_SESSION['token']);
        self::$pdo->bind("login", 0);
        self::$pdo->single("UPDATE `user` SET `login` = :login WHERE `user`.`token` = :token");
        session_unset();
        //session_destroy();
    }

    public static function get_username() {

        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT `username` FROM user WHERE token = :token LIMIT 1");
    }

    /**
     *
     * @param type $username
     * @param type $password
     * @return boolean|string
     */
    public static function login($username, $password) {

        $token = self::get_token($username);

        if (self::check_login() == true) {
            self::logout();
        } else {

            if (self::get_username() == $username) {
                $passVerify = Encryption::passVerify($password . self::get_hash(), self::get_pass());
                if ($passVerify == True) {
                    self::set_token();
                    self::set_login();
                    self::expire();
                    return TRUE;
                }else{
                    return FALSE;
                }
            }
        }

    }

    public static function Register($username, $password, $unique = array()) {
        $config = Loader::load('Configs');
        if ($username and $password) {
            $token = Encryption::token();
            $hash = Encryption::randomString('md5');

            self::$pdo->query("INSERT INTO user
                (token, username, password, profile_id, ip, login, hash, role_id) VALUES
                (:token, :username, :password, :profile_id, :ip, :login, :hash, :role_id)", [
                "token" => $token,
                "username" => $username,
                "password" => Encryption::passHash($password . $hash),
                "profile_id" => "1",
                "ip" => $_SERVER['REMOTE_ADDR'],
                "login" => "0",
                "hash" => $hash,
                "role_id" => "3",
            ]);
            $lastInsertId = self::$pdo->lastInsertId();
            $_SESSION['token'] = $token;
            $_SESSION['User_Id'] = $lastInsertId;
            self::data($lastInsertId, ['active' => '0', 'activeCode' => $token]);
            $sess_id = session_id();
            Driver::Query("UPDATE `$config->sessTable` SET `token` = '{$token}' WHERE id = '{$sess_id}'");

            if (isset($lastInsertId) and ! empty($lastInsertId)) {
                Message::set('UserRegisterSuccess', 'ok');
            }
        }
    }

    /**
     *
     * @param type $code
     * @return type
     *
     */
    public static function verifyActiveCode($code) {

        self::$pdo->bind("token", $_SESSION['token']);
        $data = self::$pdo->single("SELECT `data` FROM user WHERE token = :token LIMIT 1");

        $activeCode = unserialize($data);
        if ($activeCode['activeCode'] == $code) {
            self::$pdo->bind("t", $code);
            self::$pdo->bind("active", '2000');
            self::$pdo->single("UPDATE `user` SET `data` = :active WHERE `user`.`token` = :token");
        }
        return $activeCode['activeCode'];
    }

    /**
     *
     * @param type $where
     * @return type
     *
     */
    public static function unique($where = []) {


        foreach ($where as $field => $value) {
            $q[] = $field . ' = :' . $field;
        }

        $query = ' WHERE ' . implode(' AND ', $q);

        foreach ($where as $field => $value) {

            self::$pdo->bind("$field", $value);
        }
        return self::$pdo->single("SELECT * FROM user $query");
    }

    /**
     *
     * @param type $token
     * @param type $id
     * @return type
     *
     */
    public static function get_Role_id() {

        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT `role_id` FROM user WHERE token = :token LIMIT 1");
    }

    /**
     *
     * @param type $id
     *
     */
    public static function expire($id = null) {

        $expire = Configs::get('sessExpire') + time();

        self::$pdo->bind("token", $_SESSION['token']);
        $user_expire = self::$pdo->single("SELECT `expire` FROM user WHERE token = :token LIMIT 1");

        if ($user_expire > time()) {
            self::$pdo->bind("token", $_SESSION['token']);
            self::$pdo->bind("expire", $expire);
            self::$pdo->single("UPDATE `user` SET `expire` = :expire WHERE `token` = :token");
        } else {
            self::logout($_SESSION['token']);
        }
    }

    /**
     *
     * @param type $id
     * @param type $data
     */
    public static function data($id = null, $data = array()) {
        self::$pdo->bind("id", $id);
        self::$pdo->bind("data", serialize($data));
        self::$pdo->single("UPDATE `user` SET `data` = :data WHERE `id` = :id");
    }

    public static function select() {
        self::$pdo->bind("id", $_SESSION['User_Id']);
        self::$pdo->bind("token", $_SESSION['token']);
        return self::$pdo->single("SELECT * FROM user WHERE id = :id and token = :token LIMIT 1");
    }

    public static function selectAll() {

        return self::$pdo->single("SELECT * FROM user");
    }

    /**
     *
     * @param type $id
     * @param type $username
     * @param type $password
     */
    public static function update($username = NULL, $password = NULL) {
        $hash = Encryption::randomString('md5');
        self::$pdo->bind("token", $_SESSION['token']);
        self::$pdo->bind("username", $username);
        self::$pdo->bind("password", Encryption::passHash($password . $hash));
        self::$pdo->bind("hash", $hash);
        self::$pdo->single("UPDATE `user` SET `username` = :username, `password` = :password, `hash` = :hash WHERE `token` = :token");
    }

    public static function changePassword($oldpassword = NULL, $newpassword = NULL, $comparePassword = NULL) {


        return Encryption::passVerify($oldpassword . self::get_hash(), self::get_pass());
    }

    public static function delete() {
        self::$pdo->bind("token", $_SESSION['token']);
        self::$pdo->single("DELETE FROM `user` WHERE `token` = :token");
        session_destroy();
    }

    /**
     *
     * @param type $token
     */
    public static function deleteByToken($token) {
        self::$pdo->bind("token", $token);
        self::$pdo->single("DELETE FROM `user` WHERE `token` = :token");
    }

}
