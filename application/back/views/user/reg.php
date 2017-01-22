<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Configs::get('title') ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/login.css' ?>"> 
    </head>
    <body>
        <div class="container">
            <div class="login">
                <div><?php echo Html::encode($msg)?></div>
                <?php echo Html::form_open('user/reg'); ?>

                <div class="lable"><?php echo Html::getLable('username', 'lable', ['class' => "lable"]); ?></div>
                <div><?php echo Html::inputText('username', '', 'class="input"') ?></div>
                <div><?php echo Valid::error('username'); ?></div>

                <div class="lable"><?php echo Html::getLable('password', 'lable', ['class' => "lable"]); ?></div>
                <div><?php echo Html::inputPassword('password', '', 'class="input"') ?></div>
                <div><?php echo Valid::error('password'); ?></div>

                <div class="lable"><?php echo Html::getLable('password_compare', 'lable', ['class' => "lable"]); ?></div>
                <div><?php echo Html::inputPassword('password_compare', '', 'class="input"') ?></div>
                <div><?php echo Valid::error('password_compare'); ?></div>

                <div><?php echo Html::submitButton('text', 'ثبت', 'class="btn"') ?></div>

                <?php echo Html::form_close(); ?>

            </div>
        </div>

    </body>
</html>
