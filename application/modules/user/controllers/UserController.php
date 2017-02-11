<?php

class UserController extends Controller {

    public $layoutFile ;

    public function __construct() {
        parent::__construct();

        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index'],
                        'redirect' => 'login',
                    ],
                    '*' => [
                        'actions' => ['login'],
                        'redirect' => 'login',
                    ],
                ]
        );


    }

    public function actionIndex() {
        echo 'asd';
    }

    public function actionLogin() {
          new UserModel();
        $this->renderPartial('login');
    }


}
