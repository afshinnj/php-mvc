<?php

class SiteController extends Controller {

    public $layoutFile = FRONT;

    public function actionIndex() {
      //UserAuth::Auth('admin', 'login');
        $post = new PostModel();
        $this->render('index', array('post' => $post->find()->fetchAll()));
    }

    

}
