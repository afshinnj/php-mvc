<?php

class ActiveRecord{

    private $db;
    public $variables;
    public $query;
    public $bindValues;
    public $result;
    public $table;
    public $pk = 'id';

    public function __construct($validation = array()) {
        $this->Connect();


        $this->variables = $validation;

    }


    protected function Connect() {

        $dsn = 'mysql:dbname=' . Configs::get('dbName') . ';host=' . Configs::get('dbHost') . '';

        $this->db = new PDO($dsn, Configs::get('dbUsername'), Configs::get('dbPassword'), array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        # We can now log any exceptions on Fatal error.
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        # Disable emulation of prepared statements, use REAL prepared statements instead.
        $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    public function __set($name, $value) {
        if (strtolower($name) === $this->pk) {
            $this->variables[$this->pk] = $value;
        } else {
            $this->variables[$name] = $value;
        }
    }

    /**
     *
     * @param type $fields
     * @return \ActiveRecord
     */
    public function find($fields = array()) {
        if (!empty($fields)) {
            $field = implode(',', $fields);
        } else {
            $field = '*';
        }

        $this->query = "SELECT $field FROM $this->table ";

        return $this;
    }

    /**
     *
     * @param type $where
     * @return \ActiveRecord
     */
    public function where($where = array()) {



        foreach ($where as $field => $value) {
            $q[] = $field . ' = :' . $field;
        }

        $this->query .= ' WHERE ' . implode(' AND ', $q);

        foreach ($where as $field => $value) {

            $this->bindValues[":$field"] = $value;
        }


        return $this;
    }

    /**
     *
     * @param type $with
     * @param type $field_table1
     * @param type $field_table2
     * @param type $cond
     * @return \ActiveRecord
     *
     */
    function join($with, $field_table1, $field_table2, $cond = array()) {
        if (empty($cond))
            $this->query .= " LEFT JOIN $with ON $field_table1 = $field_table2 ";
        elseif (is_array($cond) AND ! empty($cond)) {
            foreach ($cond as $k => $v) {
                $condition[] = $k . '=' . $v;
            }
            $cond = implode(' AND ', $condition);
            $this->query .= " LEFT JOIN $with ON $field_table1 = $field_table2  WHERE $cond ";
        } else {
            $this->query .= " LEFT JOIN $with ON $field_table1 = $field_table2 WHERE $cond ";
        }

        return $this;
    }

    function order($order = '', $dir = '') {
        $this->query .= " ORDER BY $order $dir ";
        return $this;
    }

    function limit($start, $results) {
        $this->query .= " LIMIT :start , :results ";
        $this->bindValues[':start'] = $start;
        $this->bindValues[':results'] = $results;

        return $this;
    }

    public function All() {
        $this->result = $this->db->prepare($this->query);

        if (!empty($this->bindValues)) {
            foreach ($this->bindValues as $key => $value) {
                if (is_int($value))
                    $this->result->bindValue($key, $value, PDO::PARAM_INT);
                else
                    $this->result->bindValue($key, $value);
            }
        }
        $this->result->execute();
        $this->result->errorInfo();
        return $this->result->fetchAll(PDO::FETCH_ASSOC);
    }

    /*
     *
     */

    public function One() {
        $this->result = $this->db->prepare($this->query);
        if (!empty($this->bindValues)) {
            foreach ($this->bindValues as $key => $value) {
                if (is_int($value)) {
                    $this->result->bindValue($key, $value, PDO::PARAM_INT);
                } else {
                    $this->result->bindValue($key, $value);
                }
            }
        }
        $this->result->execute();
        return $this->result->fetch(PDO::FETCH_ASSOC);
    }

    /*
     *
     */

    public function insert() {
        $fields = array_keys($this->variables);
        $fieldsvals = array(implode(",", $fields), ":" . implode(",:", $fields));

        $sql = "INSERT INTO $this->table ($fieldsvals[0]) VALUES ($fieldsvals[1])";

        $this->result = $this->db->prepare($sql);

        foreach ($this->variables as $f => $v) {
            $this->result->bindValue(':' . $f, $v);
        }
        $this->result->execute();
    }

    /**
     *
     * @param type $pk_value
     *
     */
    public function update($pk_value = 0) {
        foreach ($this->variables as $field => $v) {
            if ($field !== $this->pk) {
                $up[] = $field . '= :' . $field;
            }
        }

        $up = implode(',', $up);

        $sql = "UPDATE $this->table SET $up WHERE $this->pk = :$this->pk";
        $this->variables[$this->pk] = $pk_value;

        $this->result = $this->db->prepare($sql);

        foreach ($this->variables as $f => $v) {
            $this->result->bindValue(':' . $f, $v);
        }

        return $this->result->execute();
    }

    /*
     *
     */

    public function delete($pkValue = 0) {
        if ($pkValue == 0) {
            return false;
        }
        $sql = "DELETE FROM $this->table WHERE $this->pk = $pkValue";
        $this->result = $this->db->prepare($sql);
        $this->result->execute();
        return true;
    }

    /*
     *
     *
     */

    public function count($field) {
        if ($field) {
            $sql = "SELECT count(" . $field . ")  FROM " . $this->table;

            $this->result = $this->db->prepare($sql);
            $this->result->execute();
            $r = $this->result->fetch(PDO::FETCH_ASSOC);
            foreach ($r as $value) {
                return $value;
            }
        }
    }

    /**
     *  Returns the last inserted id.
     *  @return string
     */
    public function lastInsertId() {
        return $this->db->lastInsertId();
    }

    /**
     *
     * @param type $where
     * @return type

    public function unique($field = array(), $where = array()) {
        return $this->find($field)->where($where)->fetchAll();
    }*/

}
