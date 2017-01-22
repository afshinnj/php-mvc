<?php

class Router {

    //private static $route;
    private static $controller;
    private static $action = 'index';
    private static $params;
    private static $log;
    private static $url;

    public function __construct() {
        self::$log = Loader::load('Logger');

        if (isset($_GET['r'])) {
            self::$url = preg_replace(Configs::get('invalidUrlChars'), '', $_GET['r']);
        }

        self::$controller = Configs::get('defaultController');
    }

    public static function getController() {
        include CONFIG . '/routing.php';
        //$controller = null;
        $segment = self::segment(0);

        if ($segment == NULL and empty($segment)) {
            // $controller = Configs::get('defaultController');
        } else {

            self::$controller = $segment;
            foreach ($route as $keys => $val) {
                if ($segment == $keys) {
                   // self::$log->write($val);
                    $c = explode('/', $val);
                    self::$controller = $c[0];
                    if (isset($c[1])) {
                        self::$action = $c[1];
                    }
                    if(isset($c[2])){
                        self::$params = $c[2];
                    }
                }
            }
        }
        return ucwords(strtolower(self::$controller));
    }

    /*
     * get action
     *
     */

    public static function getAction() {

        $segment = str_replace('.html', '', self::segment(1));
        if (!$segment) {
            // self::$action = 'index';
        } else {
            self::$action = $segment;
        }

        return self::$action;
    }

    public static function getParams() {
        $routeParts = explode('/', self::$url);
        array_shift($routeParts);

        array_shift($routeParts);

        foreach ($routeParts as $key => $value) {
            if (trim($value) === '') {
                unset($routeParts[$key]);
            }
        }

        self::$params = array();
        if (count($routeParts) % 2 == 1) {
            throw new Exception('You must specify parameters as \'Key/value\' pairs(eg. type/valid/page/2 means type = valid and page=2 . ');
        }

        foreach (array_keys($routeParts) as $key) {
            if ($key % 2 == 1) {
                continue;
            }
            self::$params[$routeParts[$key]] = $routeParts[$key + 1];
        }
        if (!empty(self::$params)) {
            return str_replace('.html', '', self::$params);
        }
    }

    /*
     *
     *
     */

    public static function getParam($param) {

        if (!empty(self::getParams())) {
            $params = self::$params;
            return $params[$param];
        }
    }

    public static function segment($segment) {
        if (!empty(self::$url)) {
            $seg = explode('/', self::$url);
            if (isset($seg[$segment])) {
                return $seg[$segment];
            }
        }
    }

}
