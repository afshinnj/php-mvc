<?php

class Login extends User {

    public function __construct() {

        parent::__construct();
        Html::selLable([
            'username' => Language::get('username'),
            'password' => Language::get('password'),
        ]);

        Valid::addRole('username', ['type' => 'string', 'required' => true, 'min' => 5, 'trim' => true]);
        Valid::addRole('password', ['type' => 'string', 'required' => true, 'min' => 5, 'trim' => true]);
    }

}
