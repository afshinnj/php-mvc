<?php  UserAuth::Token('login');

class AdminController extends Controller {

   public $layoutFile ;

    public function __construct() {


        parent::__construct();
         AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index'],
                        'redirect' => 'login',
                    ],
                ]
        );
    }

    public function actionIndex() {
        //throw new Exception("Not a valid object afafafafto load.");
        $this->render('index');
        
    }


}
