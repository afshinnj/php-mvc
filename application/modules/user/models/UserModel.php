<?php

class UserModel extends ActiveRecord\Model{

  public static $table_name = 'user';
  public static $primary_key = 'id';

  public function __construct ($attributes=array(), $guard_attributes=TRUE, $instantiating_via_find=FALSE, $new_record=TRUE) {

    Valid::addRole('username', ['type' => 'string', 'required' => true, 'min' => 3, 'max' => 10, 'trim' => true,'on'=>'login']);//,'unique' => User::unique(['username' => Input::post('username')])
    Valid::addRole('password', ['type' => 'string', 'required' => true, 'min' => 5, 'max' => 10, 'trim' => true,'on'=>'login']);
    //Valid::addRole('password_compare', ['type' => 'string', 'required' => true, 'min' => 5, 'max' => 10, 'trim' => true]);, 'compare' => true

    Html::selLable([
        'username' => Language::get('username'),
        'password' => Language::get('password'),
        'rpassword' => Language::get('rpassword'),
        'oldpassword' => Language::get('oldpassword'),
        'newpassword' => Language::get('newpassword'),
        'password_compare' => Language::get('password_compare'),
    ]);

       // Call the default Model constructor
       parent::__construct ($attributes, $guard_attributes, $instantiating_via_find, $new_record);

   }




}
