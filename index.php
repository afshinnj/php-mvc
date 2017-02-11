<?php
define('DEVELOPMENT_ENVIRONMENT', TRUE);
//define('ADMIN', 'application/modules/admin');
//define('FRONT', 'application/modules/front');
define('CONFIG', 'application/config');
define('LANGUAGE', 'application/language');
define('BASEPATH', str_replace("\\", "/", CONFIG));

require(__DIR__ . '/vendor/framework/autoload.php');

$log = Loader::load('Logger');

try {
    Loader::load('Session');
    Loader::load('Router');
    Loader::load('Language');
    Initializer::init();
    Dispatcher::dispatch();

} catch (Exception $e) {
    $log->write($e->getMessage());

}

function MyErrorHandler($eNumber, $eMessage, $eFile = NULL, $eLine = NULL, $eContext = NULL) {
  echo '<div dir="ltr" style="margin:10px">';
    echo  'Number: ' . $eNumber . '<br />' . PHP_EOL;
    echo 'Message: ' . $eMessage . '<br />' . PHP_EOL;
    echo 'File: ' . $eFile . '<br />' . PHP_EOL;
    echo 'Line: ' . $eLine . '<br />' . PHP_EOL;
    echo 'Context: ' . print_r($eContext, true) . '<br />' . PHP_EOL;
    echo '</div>';
}
set_error_handler('MyErrorHandler', E_ALL);

//print_r($_SERVER);
