<?php

class View {

    private $vars = array();
    private $template = 'index';

    public function __get($key) {
        return (isset($this->vars[$key]) ? $this->vars[$key] : null);
    }

    public function __set($key, $value) {
        $this->vars[$key] = $value;
    }

    public function getVars($controller = null) {
        if (!empty($controller)) {
            $this->vars['app'] = $controller;
        }
        return $this->vars;
    }

    public function getTemplate($action = null) {
        if(empty($this->template)) {
            return $action;
        }
        return $this->template; 
    }

    public function setTemplate($template){
        $this->template =  $template;
    }
}
