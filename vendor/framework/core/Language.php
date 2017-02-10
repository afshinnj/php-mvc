<?php

class Language {

    private static $Lang;

    public function __construct() {
        require_once 'vendor/framework/language/language.php';
        @include_once LANGUAGE . "/". Configs::get('lang') . '.php';


        self::$Lang = $Langs;
    }

    public static function get($var) {

        return (isset(self::$Lang[$var]) ? self::$Lang[$var] : $var);
    }

}
