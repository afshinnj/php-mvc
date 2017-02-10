<?php
class PostModel extends ActiveRecord\Model {


    public static $table_name = 'post';
    public static $primary_key = 'id';

    static $before_save = array('setDate'); # new OR updated records

    public function __construct ($attributes=array(), $guard_attributes=TRUE, $instantiating_via_find=FALSE, $new_record=TRUE) {

         // Call the default Model constructor
         parent::__construct ($attributes, $guard_attributes, $instantiating_via_find, $new_record);


   }
    public function setDate() {
         $this->date = jDateTime::date('Y-m-d', false, false);
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
                $dropdown[$model->id] = $model->title;
            }
        }

        return $dropdown;
    }

}
