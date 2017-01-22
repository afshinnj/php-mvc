<?php

class PostModel extends ActiveRecord {

    public $table = 'post';
    public $pk = 'id';

    public function __construct() {
        parent::__construct();

        Valid::addRole('title', ['type' => 'string', 'required' => true,  'trim' => true]);
        Valid::addRole('text', ['type' => 'string', 'required' => true,  'trim' => true]);
        Valid::addRole('section', ['type' => 'string', 'required' => true, 'trim' => true]);

        Html::selLable([
            'title' => Language::get('Title'),
            'text' => Language::get('Text'),
            'section' => Language::get('Section'),
            'tag' => Language::get('Tag'),
        ]);
    }

    /**
     *
     * @staticvar type $dropdown
     * @return type
     *
     */
    public static function Dropdown($item) {

        static $dropdown;
        if ($dropdown === null) {
            // get all records from database and generate

            $dropdown[] = 'Select';//Yii::t('fa-IR','Select');
            foreach ($item as $model) {
                $dropdown[$model['id']] = $model['title'];
            }
        }

        return $dropdown;
    }

}
