<?php

class UserController extends Controller {

  public $layoutFile ;
    public function __construct() {
        parent::__construct();

        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index', 'create', 'update', 'delete', 'edit', 'profile','changePassword'],
                        'redirect' => 'login',
                    ],
                    '?' => [
                        'actions' => ['reg', 'login', 'active'],
                        'redirect' => 'login',
                    ]
                ]
        );
    }

    public function actionIndex() {

        /*$user = new UserModel();
        $users = $user->find()->order('id', 'DESC')->All();
        $this->render('index', ['users' => $users]);*/
        User::signOut();
        $this->redirect('login');
    }

    public function actionDelete() {

        User::delete();
        // $this->redirect('admin');
    }

    public function actionEdit() {
        new UserModel();
        /* $id =  Router::getParam('token');
          $user = new UserModel();
          $edit = $user->find()->where(['token' => $id])->fetchOne(); */
        $edit = User::select();
        $this->render('edit', ['edit' => $edit]);
    }

    /**
     *
     *
     */
    public function actionUpdate() {

        User::update(Input::post('username'), Input::post('password'));
        $this->redirect('user/index');
    }

    public function actionReg() {
        new UserModel();
        $msg = null;
        if (Valid::$errors == FALSE AND ! empty($_POST)) {

            User::Register(Input::post('username'), Input::post('password'));
            $msg = Message::get('UserRegisterSuccess');
        }
        $this->renderPartial('reg', ['msg' => $msg]);
    }

    public function actionActive() {
        //echo Router::getParam('code');
        //echo Uri::segment(3);
        print_r(User::verifyActiveCode(Uri::segment(3)));

        $this->renderPartial('active');
    }

    public function actionloguot() {

        User::signOut();
        $this->redirect('login');
    }

    public function actionProfile() {

        echo 'profile';
    }

    public function actionchangePassword() {

         User::changePassword(Input::post('oldpassword'),
                                    Input::post('newpassword'),
                                    Input::post('password_compare'));
    }

    public function actionTest() {
        $test = new MyRole();
        $test->role = 'afshin';
        if (!$test->unique('afshin')) {
            echo $test->insert();
        } else {
            echo 'نام کاربری قبلا انتخاب شده است';
        }
    }

}
