<?php

class Encryption {

    /**
     *
     * @param type $password
     * @return type
     */
    public static function password_hash($password) {
        $options = [
            'cost' => 12,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];
        $password = password_hash($password, PASSWORD_BCRYPT, $options);
        return $password;
    }

    /**
     *
     * @param type $password
     * @param type $hash
     * @return boolean
     */
    public static function password_verify($password, $hash) {
        if (password_verify($password, $hash)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @param type $algorithm
     * @return type
     */
    public static function randomString($algorithm = null) {
        $str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $string = Null;
        if ($algorithm == 'md5') {
            $string = md5(str_shuffle($str));
        } else {
            $string = str_shuffle($str);
        }
        return $string;
    }



    public static function token() {

        return md5(uniqid(self::randomString(), true) . time());
    }

}
