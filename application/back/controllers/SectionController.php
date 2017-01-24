<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SectionController extends Controller {

    public $layoutFile = ADMIN;

    public function __construct() {
        parent::__construct();

        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index','insert','edit','delete','update'],
                        'redirect' => 'login',
                    ],
                    '?' => [
                        'actions' => ['login',],
                        'redirect' => 'login',
                    ]
                ]
        );
    }

    public function actionIndex() {
      $section = new SectionModel();
      $find = $section->find()->All();
      $this->render('index',['find' => $find]);
    }

    public function actionInsert()
    {
      $section = new SectionModel();
      if (Valid::$errors == FALSE AND !empty($_POST)) {
        $section->title = Input::post('title');
        $section->insert();
        Message::set('Success',Language::get('Text saved successfully'));
        $this->redirect('section');
      }
      $this->render('insert');
    }


    public function actionEdit(){
        $id = Input::post('id');
        $section = new SectionModel();
        $find = $section->find()->where(['id'=>$id])->One();
        if (Valid::$errors == FALSE) {
          $section->title = Input::post('title');
          $section->update(Input::post('id'));
          Message::set('Success',Language::get('Text saved successfully'));
         $this->redirect('section');
        }

        $this->render('update',['find' => $find]);
    }

    public function actionDelete(){
      $id = (int) Input::post('id');
      $section = new SectionModel();
      $section->delete($id);
      $this->redirect('post');
    }

}
