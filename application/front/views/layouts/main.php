<?php $config = Loader::load('Configs');?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Configs::get('title')?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap-rtl.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/screen.css' ?>">
    </head>
    <body>
      <div class="container">
        <div class="col-md-3">
            
        </div>
        <div class="col-md-9">
          <div><?= $viewDate?></div>
        </div>


      </div>

    </body>
</html>
