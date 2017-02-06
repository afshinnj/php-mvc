<?php

class Dispatcher extends Controller{

    public static function dispatch() {
        global $app;

        $controller = Router::getController();

        $controllerClass = "{$controller}Controller";

        $action = 'action' . Router::getAction();

        $params = Router::getParams();
        $controllerFile =  Configs::getPath() . "/controllers/{$controllerClass}.php";
        if (!file_exists($controllerFile)) {
                echo "Controller '{$controller}' not found.";
                if($controller !='Assets'){
                  throw new Exception("Controller '{$controller}' not found.");
                }
        }
        if($controller !='Assets'){
            include $controllerFile;
            $app = new $controllerClass();
          }

        if (!method_exists($app, $action)) {
            $actionName = substr($action, 6);
            echo "Action '{$actionName}' not found in '{$controller}' controller.";
            throw new Exception("Action '{$actionName}' not found in '{$controller}' controller.");
        }
        $content = $app->$action($params);
    }

}
