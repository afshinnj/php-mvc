<?php

set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/core');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/session');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/driver/pdo');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/driver');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/rbac');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/helpers');
/* * * specify extensions that may be loaded ** */
spl_autoload_extensions('.php');

function AutoLoad($object) {

    require_once $object . '.php';
}

spl_autoload_register('AutoLoad');


include_once  CONFIG . '/autoload.php';