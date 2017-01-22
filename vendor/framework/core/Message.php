<?php

class Message {

    public function __construct() {

        $_SESSION[$key] = null;
    }
    public static function set($key = null, $msg = null) {

        $_SESSION[$key] = $msg;
    }

    public static function get($key = null) {

        if (isset($_SESSION[$key])) {
            $msg = htmlentities($_SESSION[$key], ENT_QUOTES, "UTF-8");
            unset($_SESSION[$key]);
            return $msg;
        }else{
            return null;

        }
    }

}
