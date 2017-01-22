<?php

define('DEVELOPMENT_ENVIRONMENT', TRUE);
define('ADMIN', 'application/back');
define('FRONT', 'application/front');
define('CONFIG', 'application/config');
define('LANGUAGE', 'application/language');
define('BASEPATH', str_replace("\\", "/", CONFIG));

require(__DIR__ . '/vendor/framework/autoload.php');

$log = Loader::load('Logger');

try {
    Initializer::init();
    Loader::load('Session');
    Loader::load('User');
    Loader::load('Router');
    Loader::load('Language');

    Dispatcher::dispatch();

} catch (Exception $e) {
    $log->write($e->getMessage());

}
