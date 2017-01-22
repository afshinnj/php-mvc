<?php

class Language {

    private static $Lang;

    public function __construct() {
        require_once 'vendor/framework/language/language.php';
        if (isset($_SESSION['lang'])) {
            @include_once LANGUAGE ."/" . $_SESSION['lang'] . '.php';
        } else {
            @include_once LANGUAGE . "/". Configs::get('lang') . '.php';
        }

        self::$Lang = $Langs;
    }

    public static function get($var) {

        return (isset(self::$Lang[$var]) ? self::$Lang[$var] : $var);
    }

}
