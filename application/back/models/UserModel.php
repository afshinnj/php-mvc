<?php

class UserModel extends ActiveRecord {

    public $table = 'user';
    public $pk = 'token';

    public function __construct() {
        parent::__construct();

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
