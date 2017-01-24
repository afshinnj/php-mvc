<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Configs::get('title')?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/bootstrap/css/bootstrap-rtl.css' ?>">
        <link rel="stylesheet" href="<?php echo Base::baseUrl() . 'assets/css/main.css' ?>">
        <script src="<?php echo Base::baseUrl() . 'assets/js/Angular.js' ?>"></script>
        <script src="<?php echo Base::baseUrl() . 'assets/ckeditor/adapters/jquery1.js' ?>"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="<?php echo Base::baseUrl() . 'assets/ckeditor/ckeditor.js' ?>"></script>

    </head>
    <body>
        <div>
          <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <?= Html::a(Configs::get('title'), 'admin',['class'=>'navbar-brand'])?>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav navbar-left">
                <li><?php echo Html::a('کاربر', 'user')?></li>
                <li><?php echo Html::a('نوشتن', 'post')?></li>
                <li><?php echo Html::a('بخش بندی', 'section')?></li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
            <div class="container">
                <?= $viewDate?>

            </div>
            <p>If you click on the "Hide" button, I will disappear.</p>

            <button id="hide">Hide</button>
            <button id="show">Show</button>
        </div>
        <script type="text/javascript">
        $(document).ready(function(){
            $("#hide").click(function(){
                $("p").hide();
            });
            $("#show").click(function(){
                $("p").show();
            });
            $(".returnImage").click("click", function (e) {
              var urlImage = [yoururlimage];
              window.opener.$("#cke_" + input_id + "_textInput").val(urlImage);
          });
          var urlImage = 'asdasd';
          window.opener.$("#cke_113_textInput").val(urlImage);
        });
        </script>
        <script type="text/javascript">
        var editor = CKEDITOR.replace( 'editor', {
        	//filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
        	//filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
        	filebrowserUploadUrl : 'post/connector?command=QuickUpload&type=Images',
        	filebrowserImageUploadUrl : 'post/connector?command=QuickUpload&type=Images',

        });
        CKFinder.setupCKEditor( editor, '../' );
        </script>

    </body>
</html>
