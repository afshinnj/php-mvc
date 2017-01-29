<?php

/**
 *
 * Filter post and get input
 * @author afshin
 *
 */
class Input {

    function __construct() {

    }

    /**
     *
     * @return type
     */
    function isAjax() {
        if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
                strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            return true;
        }

        return false;
    }

    /**
     *
     * clean and return $_GET request
     *
     * @param : index :: index of $_GET request
     * @access public
     */
    public static function get($index = NULL) {
        $out = array();

        if ($index === NULL AND ! empty($_GET)) {
            if (isset($_GET)) {
                foreach ($_GET as $key => $val) {
                    $out[$key] = self::clean($val);
                }
                return $out;
            } else
                throw new Exception('$_GET Not Set');
        }
        else {
            return self::clean($_GET[$index]);
        }
    }

    /**
     *
     * clean and return $_POST request
     *
     * @param : index :: index of $_POST request
     * @access public
     */
    public static function post($index = NULL, $Clean = TRUE) {
        $out = array();

          if($Clean == TRUE){
            if ($index === NULL AND ! empty($_POST)) {
                foreach ($_POST as $key => $val) {
                    $out[$key] = self::clean($val);
                }
                return $out;
            } else {
                if (!empty($_POST) and isset($_POST[$index])) {
                    return self::clean($_POST[$index]);
                }
            }
          }else{

            if ($index === NULL AND ! empty($_POST)) {
                foreach ($_POST as $key => $val) {
                    $out[$key] = $val;
                }
                return $out;
            } else {
                if (!empty($_POST) and isset($_POST[$index])) {
                    return $_POST[$index];
                }
            }

          }



    }

    /**
     * Cleaning Input Script
     * Copyright 2009 - www.pgmr.co.uk - contact@pgmr.co.uk
     */
    public static function clean($str) {
        if (is_array($str))
            array_map(array('Input', 'clean'), $str);

        if (!get_magic_quotes_gpc()) {
            $str = addslashes($str);
        }

        $str = strip_tags(htmlspecialchars($str));
        return $str;
    }

}
