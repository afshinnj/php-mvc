<?php

/**
 * Upload::do_upload(
*       [
*         'name' => 'upload',
*         'target' => 'uploads',
*         'ext' => ['jpg' => 'image/jpeg','png' => 'image/png','gif' => 'image/gif',],
*         'size' => '50000000',
*         'width' => '1600',
*         'height' => '9000',
*         'exists' => true
*     ]);
 */
class Upload
{



  function __construct()
  {

  }


  public static function do_upload($args){

    if(!isset($args['name'])){
      $_SESSION['uploadMsg'] = 'file input name not find.';
    }

    if(isset($args['target'])){
      if(isset($args['exists']) and $args['exists'] == TRUE)
      {
        /**
        * check file exists
        */
        //if (file_exists($target_file)) {
          //  return "Sorry, file already exists.";
        //}

          $target_file =  basename($_FILES[$args['name']]["name"]);

      }else{
        //rename uploaded file
        $temp = explode(".", $_FILES[$args['name']]["name"]);
        $target_file =  md5(round(microtime(true))) . '.' . end($temp);
        }

    }


    $temp = explode(".", $_FILES[$args['name']]["name"]);
    $fileName = md5(round(microtime(true))) . '.' . end($temp);


    $fileSize = $_FILES[$args['name']]["size"];

    /**
    *  check file size
    */
    if(isset($args['size']))
    {
      if($fileSize > $args['size']){
        $_SESSION['uploadMsg'] = 'Exceeded filesize limit.';
      }
    }


    /**
    *
    * get image attr
    * width
    * height
    */
    list($width, $height, $type, $attr) = getimagesize($_FILES[$args['name']]["tmp_name"]);

    if($width > $args['width']){
      $_SESSION['uploadMsg'] = 'Sorry, image width big';
    }
    if($width > $args['height']){
      $_SESSION['uploadMsg'] = 'Sorry, image height big';
    }

    /**
    *
    * check file ext
    */
    $finfo = new finfo(FILEINFO_MIME_TYPE);
     if (false === $ext = array_search(
         $finfo->file($_FILES[$args['name']]['tmp_name']),
          $args['ext']
         ,
         true
     )) {
        $_SESSION['uploadMsg'] =  'Invalid file format.';
     }else{
       if (move_uploaded_file($_FILES[$args['name']]["tmp_name"],$args['target'] .'/'. $target_file)) {

           $_SESSION['uploadMsg'] = $target_file;
       } else {
           return false;
       }

     }




  }

  /**
  *
  *   upload file message or error
  */
public static function msg(){
    if(isset($_SESSION['uploadMsg'])){
        echo $_SESSION['uploadMsg'];
        unset($_SESSION['uploadMsg']);
    }

}



}
