<?php

class LoginController extends Controller {
public $layoutFile = ADMIN;
    public function __construct() {
        parent::__construct();
        new Login();
    }

    public function actionIndex() {
        $_SESSION['lang'] = 'fa-IR';
        $msg = null;
        $a = User::signIn();
        if (Valid::$errors == FALSE) {
            $a = User::signIn();
            if ($a) {
                $this->redirect('admin');
            } else {
              Message::set('User_Not_Find', Language::get('User Not Find'));

            }
        }
        $this->renderPartial('index', ['msg' => $msg]);
    }

}
