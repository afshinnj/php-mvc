<?php

class MyUser extends User {

    public static function Register($username, $password) {
        parent::Register($username, $password);
    }

    public static function Labels() {
        return [
            'username' => 'نام کاربری',
            'password' => 'رمز عبور'
        ];
    }

}
