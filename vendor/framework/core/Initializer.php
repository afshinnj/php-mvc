<?php

class Initializer {

    public static function init() {
      //include_once CONFIG . '/modules.php';$modules[Router::getController()]['module']
     set_include_path(get_include_path() . PATH_SEPARATOR . Configs::getPath() . '/models');

    }

}
