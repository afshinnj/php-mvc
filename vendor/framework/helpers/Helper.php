<?php

class Helper {

    public static function inc($helper = array()) {
        if (is_array($helper) || is_object($helper)) {
            foreach ($helper as $value) {
                include_once $value . '.php';
            }
        }
    }

}
