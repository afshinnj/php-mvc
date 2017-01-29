<?php

class LoginController extends Controller {

    public function __construct() {
        parent::__construct();
        new Login();
    }

    public function actionIndex() {
        $_SESSION['lang'] = 'fa-IR';
        $msg = null;

        ///echo User::login(Input::post('username'), Input::post('password'));

        if (Valid::$errors == FALSE and ! empty($_POST)) {
            $a = User::login(Input::post('username'), Input::post('password'));
            if ($a) {
                $this->redirect('admin');
            } else {
              Message::set('User_Not_Find', Language::get('User Not Find'));

            }
        }
        $this->renderPartial('index', ['msg' => $msg]);
    }

}
