<?php

class SectionModel extends ActiveRecord\Model {

    public static $table_name = 'section';
    public static $primary_key = 'id';
    public function __construct ($attributes=array(), $guard_attributes=TRUE, $instantiating_via_find=FALSE, $new_record=TRUE) {

         // Call the default Model constructor
         parent::__construct ($attributes, $guard_attributes, $instantiating_via_find, $new_record);


   }



}
