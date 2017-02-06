<?php

class User extends ActiveRecord\Model{

  public static $table_name = 'user';
  public static $primary_key = 'id';


  static $before_save = ['beforeSave']; # new OR updated records
  static $before_create = ['beforeCreate']; # new records only

  static $after_update = ['afterUpdate'];

  public function afterUpdate(){

    $_SESSION['afterUpdate'] = 'after_update';
  }

  public function beforeSave() {
       $this->ip =  $_SERVER['REMOTE_ADDR'];
       $this->expire = time();
  }

  public function beforeCreate() {
      if($this->role_id == NULL){
        $this->role_id =3;
      }

  }

  public static function afterLogin($id = NULL){
      $token = Encryption::token();
      $_SESSION['UserToken'] = $token;
      $find = User::find($id);
      $find->login = 1;
      $find->user_token = $token;
      $find->save();

  }

  public static function get_token(){
      if(isset($_SESSION['user_id'])){
          $find = User::find($_SESSION['user_id']);
           return $find->user_token;
      }else{
        return NULL ;
      }
  }
  public static function get_role(){
    if(isset($_SESSION['user_id'])){
        $find = User::find($_SESSION['user_id']);
          return Role::get($find->role_id);
    }else{
      return '*' ;
    }


  }
  /**
  **
  *
  *User Login
  */
  public static function signIn(){
    $find = User::find_all_by_Username(Input::post('username'));
    if($find != NULL){
      foreach ($find as $key) {
          $password = $key->password;
          $hash = $key->hash;
          $id = $key->id;
      }
      $verify = Encryption::password_verify(Input::post('password').$hash,$password);
      if($verify == TRUE){
          $_SESSION['user_id'] = $key->id;
          self::afterLogin($id);
          return TRUE;
      }else{
          return FALSE;
      }

    }

  }

    /**
    **
    *
    *User Register
    */
  public static function signUp(){
      $new = new User();
      $hash = Encryption::randomString('md5');
      if($_POST){
        $new->username = Input::post('username');
        $new->password = Encryption::password_hash(Input::post('password').$hash);
        $new->hash = $hash;
        $new->save();
      }

  }

    /**
    **
    *
    *User logout
    */
  public static function signOut(){
     $id = $_SESSION['user_id'];
    $find = User::find($id);
    $find->login = 0;
    $find->save();
    session_unset();
    session_destroy();
  }


}
