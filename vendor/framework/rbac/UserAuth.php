<?php

class UserAuth {

    public function __construct() {
        
    }

    public static function Auth($auth, $uri) {

        if (!preg_match('#^(\w+:)?//#i', $uri)) {
            $uri = Base::siteUrl($uri);
        }


        if (isset($_SESSION['User_Id'])) {

            User::expire($_SESSION['User_Id']);

            $check_login = User::check_login($_SESSION['User_Id']);
            if ($check_login == 1) {

                $role_id = User::get_Role_Id($_SESSION['token'], $_SESSION['User_Id']);

                if ($auth == UserRole::_get($role_id)) {
                    return true;
                } else {
                    header('Location: ' . $uri, TRUE);
                }
            }
        } else {
            header('Location: ' . $uri, TRUE);
        }
    }

}
