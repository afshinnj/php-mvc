<?php
 /**
  *
  */
 class Widgets
 {

   function __construct()
   {
     # code...
   }


 public static function CKEditor($val=NULL){
   $EDITOR = '<textarea name="text" class="form-control" id="editor" rows="8" cols="80">'.$val.'</textarea>';
   $EDITOR .= '<script src="'.Base::baseUrl() .'assets/framework/ckeditor/ckeditor.js"></script>';
   $EDITOR .="<script type='text/javascript'>
   var editor = CKEDITOR.replace( 'editor', {
    extraPlugins: 'uploadimage,image2',
    height: 400,
    filebrowserBrowseUrl : 'ckfinder/ckfinder.html',
    filebrowserImageBrowseUrl : 'ckfinder/ckfinder.html?type=Images',
    filebrowserUploadUrl : 'post/connector?command=QuickUpload&type=Images',
    filebrowserImageUploadUrl : 'post/connector',
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
