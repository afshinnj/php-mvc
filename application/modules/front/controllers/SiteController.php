<?php

class SiteController extends Controller {

    public $layoutFile = FRONT;
    public function __construct() {
              AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index'],
                        'redirect' => 'login',
                    ],
                    '*' => [
                        'actions' => ['enter'],
                        'redirect' => 'login',
                    ],

                ]
        );
    }
    public function actionIndex() {
        $this->render('reg');

    }

    public function actionEnter() {


        $this->render('enter');

    }

}
