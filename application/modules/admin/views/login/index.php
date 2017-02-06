<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Configs::get('title') ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap-rtl.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/login.css' ?>">
    </head>
    <body>

    <div class="container">
      <?php echo Html::form_open('login', ['name' => 'Login Page','class'=>'form-signin'], ['test' => 'test']) ?>
        <h4 class="form-signin-heading">لطفا وارد شوید.</h4>
        <div class="lable"><?php echo Html::getLable('username', 'lable', ['class' => "sr-only" , 'for' =>'username']); ?></div>
        <div><?php echo Html::inputText('username', '', ['class'=>"form-control" ,'placeholder'=>"نام کاربری"]) ?></div>
        <div class="lable"><?php echo Html::getLable('password', 'lable', ['class' => "sr-only"]); ?></div>
        <div><?php echo Html::inputPassword('password', '', ['class'=>"form-control", 'placeholder'=>"رمزعبور"]) ?></div>
        <div><?php echo Html::submitButton('text', 'ورود', 'class="btn btn-lg btn-primary btn-block"') ?></div>
        <div class="error">
          <div><?php  Valid::error('username');?></div>
          <div><?php  Valid::error('password');?></div>
          <div><?php Message::get('User_Not_Find');?></div>

      </div>
      <?php echo Html::form_close(); ?>

    </div> <!-- /container -->

    </body>
</html>
