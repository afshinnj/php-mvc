<?php

class Configs {

    private static $config;
    public static $module;
    public function __construct() {
        require_once 'vendor/framework/config/configs.php';
        @include_once CONFIG . '/configs.php';
        self::$config = $configs;

        self::$module = $modules;
    }

    public function __get($var) {
        return (isset(self::$config[$var]) ? self::$config[$var] : null);
    }

    public static function get($var) {

       return (isset(self::$config[$var]) ? self::$config[$var] : null);
    }

    /**
    *get Modules path
    */
    public static function getPath(){

      foreach (self::$module as $key => $value) {
        if (in_array(Router::getController(), self::$module[$key])) {
            return $key ;
        }
      }
        
    }

}
