<?php

class Base {

    public static function pre($array) {
        echo '<pre>' . print_r($array, true) . '</pre>' . PHP_EOL;
    }

    public static function basePath() {
        return str_replace('\\', '/', dirname(dirname(dirname(__FILE__))) . '/');
    }

    public static function baseUrl() {
        return Loader::load('Configs')->baseUrl;
    }
    public static function siteUrl($url) {
        return Loader::load('Configs')->baseUrl . $url;
    }
}
