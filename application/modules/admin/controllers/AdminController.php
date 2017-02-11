<?php  UserAuth::Token('login');

class AdminController extends Controller {

   public $layoutFile ;

    public function __construct() {


        parent::__construct();
         AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index','upload'],
                        'redirect' => 'login',
                    ],
                ]
        );
    }

    public function actionIndex() {
        //throw new Exception("Not a valid object afafafafto load.");
        $this->render('index');
        Upload::msg();
    }

    public function actionUpload(){

      $a= Upload::do_upload(
            [
              'name' => 'upload',
              'target' => 'uploads',
              'ext' => ['jpg' => 'image/jpeg','png' => 'image/png','gif' => 'image/gif',],
              'size' => '50000000',
              'width' => '1600',
              'height' => '9000',
              'exists' => false
          ]);
      $this->redirect('admin');
    }
}
