<?php

class Dispatcher {

    public static function dispatch() {
        global $app;
       

        $controller = Router::getController();

        $controllerClass = "{$controller}Controller";

        $action = 'action' . Router::getAction();

        $params = Router::getParams();

        $controllerFile = ADMIN . "/controllers/{$controllerClass}.php";
        if (!file_exists($controllerFile)) {
            $controllerFile = FRONT . "/controllers/{$controllerClass}.php";
            if (!file_exists($controllerFile)) {
                echo "Controller '{$controller}' not found.";
                throw new Exception("Controller '{$controller}' not found.");
            }
        }
        include $controllerFile;
        $app = new $controllerClass();
        if (!method_exists($app, $action)) {
            $actionName = substr($action, 6);
            echo "Action '{$actionName}' not found in '{$controller}' controller.";
            throw new Exception("Action '{$actionName}' not found in '{$controller}' controller.");
        }
        $content = $app->$action($params);
    }

}
