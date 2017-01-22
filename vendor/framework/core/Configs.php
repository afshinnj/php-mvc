<?php

class Configs {

    private static $config;

    public function __construct() {
        require_once 'vendor/framework/config/configs.php';
        @include_once CONFIG . '/configs.php';
        self::$config = $configs;
    }

    public function __get($var) {
        return (isset(self::$config[$var]) ? self::$config[$var] : null);
    }

    public static function get($var) {

       return (isset(self::$config[$var]) ? self::$config[$var] : null);
    }

}
