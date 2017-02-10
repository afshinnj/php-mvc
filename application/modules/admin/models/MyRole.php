<?php

class MyRole extends ActiveRecord {

    public $table = 'role';
    public $pk = 'id';
    public function __construct ($attributes=array(), $guard_attributes=TRUE, $instantiating_via_find=FALSE, $new_record=TRUE) {

         // Call the default Model constructor
         parent::__construct ($attributes, $guard_attributes, $instantiating_via_find, $new_record);


   }
    public function unique($filde) {

        return parent::unique(['role'], ['role' => $filde]);
    }

}
