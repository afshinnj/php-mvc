<?php

class AdminController extends Controller {

public $layoutFile = ADMIN;

    public function __construct() {
        parent::__construct();
        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index'],
                        'redirect' => 'login',
                    ],
                    '?' => [
                        'actions' => ['reg', 'login', 'active'],
                    //'redirect' => 'login',
                    ],
                ]
        );
    }

    public function actionIndex() {
        //throw new Exception("Not a valid object afafafafto load.");
        $this->render('index', ['a' => 'neda']);
    }

    public function actionHelp() {
        UserAuth::Auth('admin', 'login');

        $this->render('index', ['a' => 'test']);
    }

    public function actionForbidden() {
        echo 'Access forbidden!';
    }

}
