<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class PostController extends Controller {

    public $layoutFile = ADMIN;

    public function __construct() {
        parent::__construct();

        AccessControl::access(
                [
                    'user' => [
                        'actions' => ['index','insert','edit','delete','update','connector'],
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
        $section = new SectionModel();
        $this->render('update',['find' => $find, 'section' => $post->dropdown($section->find()->All())]);
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
/**
*
*
*/
    public function actionDelete(){

        $id = (int) Input::post('id');
        $post = new PostModel();
        $post->delete($id);
        $this->redirect('post');
    }

    /**
    *
    *
    */
    public function ActionConnector(){
      // Optional: instance name (might be used to adjust the server folders for example)
      $target_dir = "uploads/";
      $target_file = $target_dir . basename($_FILES["upload"]["name"]);
      $uploadOk = 1;
       $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
      // Check if image file is a actual image or fake image
      if(isset($_POST["ckCsrfToken"])) {
          $check = getimagesize($_FILES["upload"]["tmp_name"]);
          if($check !== false) {
              //echo "File is an image - " . $check["mime"] . ".";
              $uploadOk = 1;
          } else {
              echo "File is not an image.";
              $uploadOk = 0;
          }
      }

      // Check if file already exists
      if (file_exists($target_file)) {
          echo "Sorry, file already exists.";
          $uploadOk = 0;
      }
      // Check file size
      if ($_FILES["upload"]["size"] > 500000) {
          echo "Sorry, your file is too large.";
          $uploadOk = 0;
      }
      // Allow certain file formats
      if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
      && $imageFileType != "gif" ) {
          echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
          $uploadOk = 0;
      }
      // Check if $uploadOk is set to 0 by an error
      if ($uploadOk == 0) {
          echo "Sorry, your file was not uploaded.";
          $message = 'No file has been sent';
      // if everything is ok, try to upload file
      } else {
          if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_file)) {
              //echo "The file ". basename( $_FILES["upload"]["name"]). " has been uploaded.";
               //$are = ["uploaded" => 1,"fileName" => "foo.jpg","url"=> "/files/foo.jpg"];
               $url = 'uploads/'.$_FILES["upload"]["name"];
               //return $are;
               echo "<script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction('1', '$url', 'message')</script>";
          } else {
              echo "Sorry, there was an error uploading your file.";
          }
      }

    }///end Action

}
