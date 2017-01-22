<?php

class SectionModel extends ActiveRecord {

    public $table = 'section';
    public $pk = 'id';

    public function __construct() {
        parent::__construct();

        Valid::addRole('title', ['type' => 'string', 'required' => true,  'trim' => true]);

        Html::selLable([
            'title' => Language::get('Title'),
        ]);
    }



}
