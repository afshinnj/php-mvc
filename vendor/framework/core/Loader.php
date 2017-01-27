<?php

class Loader {

    public $config;
    private static $loaded = array();

    public function __construct() {

    }

    public static function load($object) {
        $valid = array(
            'Configs',
            'Language',
            'Router',
            'Session',
            'Driver',
            'PDO_Driver',//delete
            'Connect',
            'Encryption',
            'Crud',
            'User',
            'UserAuth',
            'UserRole',
            'Logger',
            'Validation',
            'Widgets',

        );
        if (!in_array($object, $valid)) {

            //$config = self::load('Configs');
            throw new Exception("Not a valid object'{$object}'to load.");
        }
        if (empty(self::$loaded[$object])) {
            self::$loaded[$object] = new $object();
        }
        return self::$loaded[$object];
    }

    public function loaded() {
        Base::inspect(array_keys(self::$loaded));
    }

}
