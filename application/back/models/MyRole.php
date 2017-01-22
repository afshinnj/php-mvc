<?php

class MyRole extends ActiveRecord {

    public $table = 'role';
    public $pk = 'id';

    public function unique($filde) {

        return parent::unique(['role'], ['role' => $filde]);
    }

}
