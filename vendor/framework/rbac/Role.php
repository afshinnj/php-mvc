<?php

class Role extends ActiveRecord\Model {

    public static $table_name = 'role';
    public static $primary_key = 'id';


    public static function get($id) {

      $find = Role::find($id);
      return $find->role;

    }

}
