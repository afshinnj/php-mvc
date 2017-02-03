<?php
require_once 'vendor/framework/database/ActiveRecord.php';

set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/core');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/session');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/rbac/pdo');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/rbac');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/helpers');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/widgets');
set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/widgets/ckeditor');
/* * * specify extensions that may be loaded ** */
spl_autoload_extensions('.php');



function AutoLoad($object) {

    require_once $object . '.php';

}

spl_autoload_register('AutoLoad');


include_once  CONFIG . '/autoload.php';
