<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class PostController extends Controller {

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
      $post = new PostModel();
      $section = new SectionModel();

      $this->render('index',[
              'find' => $post->find()->All()]);
    }

    public function actionInsert()
    {
        $post = new PostModel();
      if (Valid::$errors == FALSE AND !empty($_POST)) {
        $post->title = Input::post('title');
        $post->text = Input::post('text');
        $post->section = Input::post('section');
        $post->author = User::get_username();
        $post->tag = Input::post('tag');
        $post->date = jDateTime::date('Y-m-d', false, false);
        $post->insert();
        Message::set('Success',Language::get('Text saved successfully'));
        $this->redirect('post');
      }

      $section = new SectionModel();
      $this->render('post',['section' => $post->dropdown($section->find()->All())]);
    }


    public function actionEdit(){
        $id = Input::post('id');
        $post = new PostModel();
        $find = $post->find()->where(['id'=>$id])->One();
        $this->render('update',['find' => $find]);
    }

    public function actionUpdate(){
        $post = new PostModel();
      if (Valid::$errors == FALSE AND !empty($_POST)) {
        $post->title = Input::post('title');
        $post->text = Input::post('text');
        $post->section = Input::post('section');
        $post->author = User::get_username();
        $post->tag = Input::post('tag');
        $post->date = jDateTime::date('Y-m-d', false, false);
        $post->update(Input::post('id'));
        Message::set('Success',Language::get('Text saved successfully'));
        $this->redirect('post');
      }

    }

    public function actionDelete(){

        $id = (int) Input::post('id');
        $post = new PostModel();
        $post->delete($id);
        $this->redirect('post');
    }

}
