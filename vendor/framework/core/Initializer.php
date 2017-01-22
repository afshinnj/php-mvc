<?php

class Initializer {

    public static function init() {
        //set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/core/driver/pdo');
        set_include_path(get_include_path() . PATH_SEPARATOR . 'vendor/framework/libraries');
        set_include_path(get_include_path() . PATH_SEPARATOR . ADMIN . '/controllers');
        set_include_path(get_include_path() . PATH_SEPARATOR . ADMIN . '/models');
        set_include_path(get_include_path() . PATH_SEPARATOR . ADMIN . '/views');
        set_include_path(get_include_path() . PATH_SEPARATOR . FRONT . '/controllers');
        set_include_path(get_include_path() . PATH_SEPARATOR . FRONT . '/models');
        set_include_path(get_include_path() . PATH_SEPARATOR . FRONT . '/views');
    }

}
