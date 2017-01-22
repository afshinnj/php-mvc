<?php

class Valid{

    private static $source = [];
    public static $errors = FALSE;
    public $table = '';

    public function __construct() {

    }

    public static function addSource($var) {
        self::$source = $var;
    }

    /**
     *
     * @param type $var
     * @param type $data
     *
     */
    public static function addRole($var, $data = []) {

        if (!empty($_POST) and isset($_POST) and !empty($var)) {
            self::addSource($_POST);
            setcookie('valid_'.$var, '', time() - 1200);
            setcookie($var, '', time() - 1200);
            $_COOKIE['valid_'.$var] = htmlspecialchars(self::$source[$var]);// Set Error
            $_COOKIE[$var] = htmlspecialchars(self::$source[$var]);// input value set of rolBack
            self::is_set($var);

            if (isset($data['safe'])) {
                if ($data['safe'] == true) {

                }
            }

            if(!isset($data['max'])){
              $data['max'] = 255;
            }
            if(!isset($data['min'])){
              $data['min'] = 1;
            }
            switch ($data['type']) {
                case 'string':
                    self::validateString($var, $data['min'], $data['max']);
                    break;
                case 'numeric':
                    self::validateNumeric($var, $data['min'], $data['max']);
                    break;
                case 'email':
                    self::validateEmail($var, $data['min'], $data['max']);
                    break;
                case 'url':
                    self::validateUrl($var, $data['min'], $data['max']);
                    break;
            }

            if (isset($data['required'])) {
                if ($data['required'] == TRUE) {
                    self::validateRequired($var);
                }
            }
            if (isset($data['compare'])) {
                if ($data['compare'] == true) {
                    self::compare($var);
                }
            }

            if (isset($data['message'])) {
                if ($data['message'] != '') {
                    self::message($var, $data['message']);
                }
            }

            if (isset($data['unique'])) {
                if ($data['unique'] != '') {

                    self::unique($var, $data['unique']);
                }
            }
        }
    }

    /**
     *
     * @param type $var
     * @return type
     *
     */
    private static function validateRequired($var) {
        $required = self::$source[$var];
        if (empty($required)) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] =  Langs::get($var) .' '. Langs::get('not empty');
        } else {
            // $_COOKIE['valid_'.$var] = '';
        }
    }

    /**
     *
     * @param type $var
     * @param type $min
     * @param type $max
     * @param type $required
     * @return boolean
     */
    private static function validateString($var, $min = 0, $max = 0) {

        if (isset(self::$source[$var])) {
            if (strlen(self::$source[$var]) < $min) {
                self::$errors['error'] = TRUE;
                $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is too short');
            } elseif (strlen(self::$source[$var]) > $max) {
                self::$errors['error'] = TRUE;
                $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is too long');
            } elseif (!is_string(self::$source[$var])) {
                self::$errors['error'] = TRUE;
                $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is invalid');
            } else {
                $_COOKIE['valid_'.$var] = '';
            }
        }
    }

    /**
     *
     * @param type $var
     * @param type $min
     * @param type $max
     *
     */
    private static function validateNumeric($var, $min = 0, $max = 0) {

        if (strlen(self::$source[$var]) > $max) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is too short');
        } elseif (strlen(self::$source[$var]) < $min) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is too long');
        } elseif (filter_var(self::$source[$var], FILTER_VALIDATE_INT) === FALSE) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is an invalid number');
        } else {
            $_COOKIE['valid_'.$var] = '';
        }
    }

    /**
     *
     * @param type $var
     *
     */
    private static function validateUrl($var) {

        if (filter_var(self::$source[$var], FILTER_VALIDATE_URL) === FALSE) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is not a valid URL');
        } else {
            $_COOKIE['valid_'.$var] = '';
        }
    }

    /**
     *
     * @param type $var
     * @return boolean
     *
     */
    private static function validateEmail($var) {
        if (filter_var(self::$source[$var], FILTER_VALIDATE_EMAIL) === FALSE) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is not a valid email address');
        } else {
            $_COOKIE['valid_'.$var] = '';
        }
    }

    /**
     *
     * @param type $var
     *
     */
    private static function is_set($var) {

        if (!isset(self::$source[$var])) {
            self::$errors['error'] = TRUE;
            $_COOKIE['notSet'] = $var . ' is not set';
        } else {
            $_COOKIE['notSet'] = '';
        }
    }

    public static function compare($var) {
        $a = self::$source[$var];
        $b = self::$source[$var . '_compare'];

        if ($a != $b) {
            self::$errors['error'] = TRUE;
            $_COOKIE['valid_'.$var] = Langs::get($var) .' '. Langs::get('is not compare');
        }
    }

    public static function message($var, $message) {
        //self::$source[$var];
        $_COOKIE['valid_'.$var] = $var . '' . $message;
    }

    public static function unique($var, $unique){

        if($unique == true){
            $_COOKIE['valid_'.$var] =Langs::get($var) .' '. Langs::get('not unique');
            self::$errors['error'] = TRUE;
        } else {
            $_COOKIE['valid_'.$var] = '';
        }

    }

    /**
     *
     * @param type $err
     * @return type
     *
     */
    public static function error($err) {

        if (isset($_COOKIE['valid_'.$err])) {
            echo $_COOKIE['valid_'.$err];
        }
    }

    /* function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
      } */
}
