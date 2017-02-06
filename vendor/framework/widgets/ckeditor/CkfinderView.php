
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap.css' ?>">
    <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap-rtl.css' ?>">
    <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/framework/ckeditor/finder.css' ?>">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type='text/javascript'></script>
    <script>
    $(document).ready(function(){
        $("img").click(function(){
          var src = $(this).attr('url');
            window.top.opener.CKEDITOR.tools.callFunction( 1, src);
            window.top.close() ;
    	      window.top.opener.focus() ;

        });
    });
    </script>
  </head>
  <body>
        <div class="container well well-sm">
          <?php
          $directory = 'uploads';
          $scanned_directory = array_diff(scandir($directory), array('..', '.'));
          foreach ($scanned_directory as $key ):?>
            <img  src="<?= Base::baseUrl()?>uploads/<?= $key?>" url="uploads/<?= $key?>" alt="" class="img-rounded" width="200">
          <?php endforeach?>
        </div>
  </body>
</html>
