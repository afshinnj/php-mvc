<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class PostController extends Controller {

    public $layoutFile = ADMIN;

    public function __construct() {
        parent::__construct();

        Ckeditor::Connector();

        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index','insert','edit','delete','update','finder'],
                        'redirect' => 'login',
                    ],
                    '?' => [
                        'actions' => ['login',],
                        'redirect' => 'login',
                    ]
                ]
        );

        Valid::addRole('title', ['type' => 'string', 'required' => true,  'trim' => true]);
        Valid::addRole('text', ['type' => 'string', 'required' => true,  'trim' => true]);
        Valid::addRole('section', ['type' => 'string', 'required' => true, 'trim' => true]);

        Html::selLable([
            'title' => Language::get('Title'),
            'text' => Language::get('Text'),
            'section' => Language::get('Section'),
            'tag' => Language::get('Tag'),
        ]);

    }

    public function actionIndex() {

       $this->render('index',['find' => PostModel::find('all', ['order' => 'id desc'])]);
    }

    public function actionInsert()
    {
        $post = new PostModel();
      if (Valid::$errors == FALSE AND !empty($_POST)) {
        $post->title = Input::post('title');
        $post->text = Input::post('text',FALSE);
        $post->section = Input::post('section');
        $post->author = User::get_username();
        $post->tag = Input::post('tag');
        $post->save();
        Message::set('Success',Language::get('Text saved successfully'));
        $this->redirect('post');
      }


      $this->render('post',['section' => $post->dropdown(SectionModel::All())]);
    }


    public function actionEdit(){
        $id = Input::post('id');
        $post = new PostModel();
        $find = $post->find()->where(['id'=>$id])->One();
        $section = new SectionModel();
        $this->render('update',['find' => $find, 'section' => $post->dropdown($section->find()->All())]);
    }

    public function actionUpdate(){
        $post = new PostModel();
      if (Valid::$errors == FALSE AND !empty($_POST)) {
        $post->title = Input::post('title');
        $post->text = Input::post('text',FALSE);
        $post->section = Input::post('section');
        $post->author = User::get_username();
        $post->tag = Input::post('tag');
        $post->update(Input::post('id'));
        Message::set('Success',Language::get('Text saved successfully'));
        $this->redirect('post');
      }

    }
/**
*
*
*/
    public function actionDelete(){

        $id = (int) Input::post('id');
        //$post = new PostModel();
        //$post = PostModel::find($id);
        //$post->delete();
        //PostModel::table()->delete(array('id'=>$id));
        PostModel::delete_all(array('conditions' => 'id > "100"'));
    }
    /**
    *
    *
    */
    public function ActionFinder(){
        Ckfinder::view();
    }///end Action

}
