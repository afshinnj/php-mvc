<?php
//
/**
 *
 */
class ErrorHandler
{

  public function __construct()
  {
      set_error_handler('MyErrorHandler', E_ALL);
  }

 function MyErrorHandler($eNumber, $eMessage, $eFile = NULL, $eLine = NULL, $eContext = NULL) {
      echo 'Number: ' . $eNumber . '<br />' . PHP_EOL;
      echo 'Message: ' . $eMessage . '<br />' . PHP_EOL;
      echo 'File: ' . $eFile . '<br />' . PHP_EOL;
      echo 'Line: ' . $eLine . '<br />' . PHP_EOL;
      echo 'Context: ' . print_r($eContext, true) . '<br />' . PHP_EOL;
  }

}
