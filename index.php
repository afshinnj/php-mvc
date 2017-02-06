<?php

define('DEVELOPMENT_ENVIRONMENT', TRUE);
define('ADMIN', 'application/modules/admin');
define('FRONT', 'application/modules/front');
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
