<?php

class Controller {

    public $layout = 'main';

    public $layoutFile;

    public function __construct() {
      if($this->layoutFile == NULL){
          $this->layoutFile = 'application/modules/' . Configs::getPath();
      }

    }
    /**
     *
     * @param type $paramName
     * @param type $params
     * @return type
     *
     */
    protected function getParam($paramName, $params) {
        return (isset($params[$paramName]) ? $params[$paramName] : null);
    }

    /**
     *
     * @param type $view
     * @param type $values
     * @param type $useLayout
     * @param type $labels
     * @param type $valid
     * @throws Exception
     *
     */
    protected function loadView($view, $values = array(), $useLayout = false) {
        extract($values);
        $controller = substr(strtolower(get_class($this)), 0, -10);
            $viewFile =  $this->layoutFile . "/views/{$controller}/{$view}.php";
            if (!file_exists($viewFile)) {
                throw new Exception("View '{$view}.php' was not found in 'views/{$controller}' directory.");
            }
        ob_start();
        require_once $viewFile;
        $viewDate = ob_get_clean();
        if ($useLayout) {
                $layoutFile = $this->layoutFile . "/views/layouts/{$this->layout}.php";
                if (!file_exists($layoutFile)) {
                    throw new Exception("Layout '{$this->layout}.php' was not found in 'views/layouts' directory.");
                }
            require_once $layoutFile;
        } else {
            echo $viewDate;
        }
    }

    /**
     *
     * @param type $view
     * @param type $values
     *
     */
    public function render($view, $values = array()) {
        echo $this->loadView($view, $values, TRUE);
    }

    /**
     *
     * @param type $view
     * @param type $values
     *
     */
    public function renderPartial($view, $values = array()) {
        echo $this->loadView($view, $values, false);
    }

    /**
     *
     * @param type $text
     *
     */
    public function renderText($text) {
        echo $text;
    }

    /**
     *
     * @param type $uri
     * @param type $method
     * @param type $code
     *
     */
    function redirect($uri = '', $method = 'auto', $code = NULL) {
        if (!preg_match('#^(\w+:)?//#i', $uri)) {
            $uri = Base::siteUrl($uri);
        }

        header('Location: ' . $uri, TRUE, $code);
    }

}
