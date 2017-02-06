<?php

class AccessControl {

    public static $redirect = 'login';

    public function __construct(){


    }

    public static function access($access = []){

        $UserRole = User::get_role();

        $getAction = Router::getAction();

        if(isset($access[$UserRole])){
           $action = $access[$UserRole]['actions'];
           self::$redirect = $access[$UserRole]['redirect'];
           $onearr = array_combine(range(1, count($action)), $action);
           $index = array_search($getAction, $onearr);

           if(!empty($index)){

           }else{
              header('Location: ' . Base::siteUrl(self::$redirect), TRUE);
          }//end if

        }else{
           header('Location: ' . Base::siteUrl(self::$redirect), TRUE);
        }//end if

    }


}
