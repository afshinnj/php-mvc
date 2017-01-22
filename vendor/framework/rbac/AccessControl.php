<?php

class AccessControl {

    public static $redirect = 'login';

    public function __construct() {
        
    }

    public static function access($access) {
        $log = new Logger();

        $getAction = Router::getAction();

        $UserRole = self::getUserRole();

        if (!isset($access)) {
            $log->write('accessControl => access not set .');
            header('Location: ' . Base::siteUrl(403), TRUE);
        }

        if (!isset($access[$UserRole])) {
            $log->write('accessControl => Role note find .');
            header('Location: ' . Base::siteUrl(403), TRUE);
        }

        if (isset($UserRole)) {
            $action = $access[$UserRole]['actions'];
           
            $onearr = array_combine(range(1, count($action)), $action);

            $index = array_search($getAction, $onearr);

            if (empty($index)) {
                header('Location: ' . Base::siteUrl(self::$redirect), TRUE);
            } else {
                if ($UserRole != '?') {
                    self::Auth($UserRole, self::$redirect);
                }
            }
        }
    }

    public static function getUserRole() {

        if (isset($_SESSION['token']) and isset($_SESSION['User_Id'])) {

            $role_id = User::get_Role_Id($_SESSION['token'], $_SESSION['User_Id']);

            return UserRole::_get($role_id);
        } else {
            return '?';
        }
    }

    /**
     * 
     * @param type $auth
     * @param type $uri
     * @return boolean
     */
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
