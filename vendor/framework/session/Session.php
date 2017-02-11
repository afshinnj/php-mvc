<?php

class Session {

  public $expire;

  public function __construct(){

          Loader::load('Configs');
          $this->expire = Configs::get('sessExpire') + 1200;
          // Set handler to overide SESSION
          session_set_save_handler(
            array($this, "_open"),
            array($this, "_close"),
            array($this, "_read"),
            array($this, "_write"),
            array($this, "_destroy"),
            array($this, "_gc")
          );

          // Start the session
          session_start();
  }

  /**
   * Open
   */
  public function _open(){
          // Return True
          return true;
  }

      /**
     * Close
     */
    public function _close(){
        return true;

    }

    /**
     * Read
     */
    public function _read($id){
          $data = SessionModel::find($id);
          return base64_decode($data->data);
    }

    /**
     * Write
     */
    public function _write($id, $data){
      // Create time stamp
      $access = time() + $this->expire;
      $data = base64_encode($data);
      if(SessionModel::find(session_id())){
        $insert = SessionModel::find(session_id());
        $insert->id = $id;
        $insert->access = $access;
        $insert->data = $data;
        $insert->ip_address = $_SERVER['SERVER_ADDR'];
        $insert->save();
      }else{
        $insert = new SessionModel();
        $insert->id = $id;
        $insert->access = $access;
        $inser->data = $data;
        $insert->ip_address = $_SERVER['SERVER_ADDR'];
        $insert->save();
      }

      return true;
    }

    /**
    * Destroy
     */
    public function _destroy($id){
        SessionModel::delete($id);
        return true;
    }

/**
 * Garbage Collection
 */
public function _gc($max){
  // Calculate what is to be deemed old
  $old = time() + $this->expire;
  SessionModel::delete_all(array('conditions' => 'access < "'.$old.'"'));
}

}
