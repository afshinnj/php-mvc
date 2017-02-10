<?php

class UserModel{

  public function __construct ($attributes=array(), $guard_attributes=TRUE, $instantiating_via_find=FALSE, $new_record=TRUE) {

       // Call the default Model constructor
       parent::__construct ($attributes, $guard_attributes, $instantiating_via_find, $new_record);
               Valid::addRole('username', ['type' => 'string', 'required' => true, 'min' => 3, 'max' => 10, 'trim' => true,'unique' => User::unique(['username' => Input::post('username')])]);
               Valid::addRole('password', ['type' => 'string', 'required' => true, 'min' => 5, 'max' => 10, 'trim' => true, 'compare' => true]);
               Valid::addRole('password_compare', ['type' => 'string', 'required' => true, 'min' => 5, 'max' => 10, 'trim' => true]);

               Html::selLable([
                   'username' => Language::get('username'),
                   'password' => Language::get('password'),
                   'rpassword' => Language::get('rpassword'),
                   'oldpassword' => Language::get('oldpassword'),
                   'newpassword' => Language::get('newpassword'),
                   'password_compare' => Language::get('password_compare'),
               ]);
           }


    /*public static function unique($filde) {
        return parent::unique(['username'], ['username' => $filde]);
    }*/

}
