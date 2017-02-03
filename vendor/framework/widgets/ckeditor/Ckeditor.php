<?php

/**
 *
 */
class Ckeditor
{


  public static function Connector() //__construct
  {

    if(isset($_FILES["upload"])){
      $target_dir = "uploads/";
      $temp = explode(".", $_FILES["upload"]["name"]);
      $fileName = md5(round(microtime(true))) . '.' . end($temp);

      $target_file = $target_dir . $fileName;
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

       // Check file size
       if ($_FILES["upload"]["size"] > 20000000) {
           echo "Sorry, your file is too large." .$_FILES["upload"]["size"];
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
       // if everything is ok, try to upload file
       } else {
         $temp = explode(".", $_FILES["upload"]["name"]);
          $newfilename = round(microtime(true)) . '.' . end($temp);
           if (move_uploaded_file($_FILES["upload"]["tmp_name"], $target_file)) {

                $url = 'uploads/'.$fileName;
                echo "<script type='text/javascript'> window.parent.CKEDITOR.tools.callFunction('1', '$url')</script>";
           } else {
               echo "Sorry, there was an error uploading your file.";

           }
       }
    }


  }


  public static function editor($val=NULL){
    $EDITOR = '<textarea name="text" class="form-control" id="editor" rows="8" cols="80">'.$val.'</textarea>';
    $EDITOR .= '<script src="assets/framework/ckeditor/ckeditor.js"></script>';
    $EDITOR .="<script type='text/javascript'>
    var editor = CKEDITOR.replace( 'editor', {
     extraPlugins: 'uploadimage,image2',
     height: 400,
     filebrowserImageBrowseUrl : '".Router::getController()."/finder',
     filebrowserImageUploadUrl : '".Router::getController()."',
     stylesSet: [
                 { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { 'class': 'image-narrow' } },
                 { name: 'Wide image', type: 'widget', widget: 'image', attributes: { 'class': 'image-wide' } }
               ],

      // Load the default contents.css file plus customizations for this sample.
      contentsCss: [ CKEDITOR.basePath + 'contents.css', 'http://sdk.ckeditor.com/samples/assets/css/widgetstyles.css' ],
     image2_alignClasses: [ 'image-align-left', 'image-align-center', 'image-align-right' ],
     image2_disableResizer: true
    });
    CKFinder.setupCKEditor( editor, '../' );
    </script>";
    $EDITOR .= '';

    return $EDITOR;
  }




}
