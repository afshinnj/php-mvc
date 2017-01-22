<?php

class Uri {

    public static function segment($segment) {
        $url = preg_replace(Configs::get('invalidUrlChars'), '', $_GET['r']);
        $seg = explode('/', $url);
        if (isset($seg[$segment])) {
            return $seg[$segment];
        }
    }

}
