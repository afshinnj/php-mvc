<?php

class Model extends ActiveRecord {
  public $table = 'section';
  public $pk = 'id';

    public function __construct() {

    }

    public function test(){

        return 'asd';
    }

}
