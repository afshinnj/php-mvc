<?php

class Driver {

    /**
     * @property Resource The connection field
     */
    protected static $con;

    public function __construct() {
        $this->Connect();
        throw new Exception('Cannot create an object from this class.');
    }

    /**
     * Database connector
     * Initializes the object and connects to MySQL
     */
    public static function Connect() {
        $config = Loader::load('Configs');

        self::$con = mysqli_connect(Configs::get('dbHost'), Configs::get('dbUsername'), Configs::get('Password')) or die('Connection error');

        mysqli_select_db(self::$con, Configs::get('dbName')) or die('Database error');
        self::Query('SET NAMES \'utf8\'');
        mysqli_set_charset(self::$con, 'utf8');
    }

    /**
     * Execute a query and return the result as a MySQL resource
     * @param string $query The query to execute
     * @return resource|boolean The result resource if connection exists, false otherwise
     */
    public static function Query($query) {
        if (!self::$con) {
            self::Connect();
        }

        return mysqli_query(self::$con, $query);
    }

    /**
     * How many rows affected?
     * @return The number of affected rows by the last excuted query
     */
    public static function AffectedRows() {
        if (!self::$con) {
            self::Connect();
        }
        return mysqli_affected_rows(self::$con);
    }

    /**
     * Executes a select query and return the result as standard PHP array
     * @param string $query The select query to execute 
     * @return array The result array
     */
    public static function ArrayQuery($query) {
        $result = array();
        if (!self::$con) {
            self::Connect();
        }
        $rows = self::Query($query);
        if ($rows && mysqli_num_rows($rows) > 0) {
            while ($row = mysqli_fetch_assoc($rows)) {
                $result[] = $row;
            }
        }
        return $result;
    }

    /**
     * Escape a value to use safely in queries
     * @param string $value The value to escape
     * @return string|boolean The escaped value if connection exists, false otherwise
     */
    public static function Escape($value) {
        if (!self::$con) {
            self::Connect();
        }
        if ($value !== null) {
            return '\'' . mysqli_real_escape_string(self::$con, $value) . '\'';
        }
        return 'NULL';
    }

    /**
     * Get the last automatic generated id in insert queries
     */
    public static function InsertId() {
        if (!self::$con) {
            self::Connect();
        }
        return mysqli_insert_id(self::$con);
    }

    /**
     * Quote the values
     * @param string @value The value to quote
     * @return string The quoted value
     */
    public static function Quote($value) {
        if ($value !== null) {
            return '\'' . trim($value, '\'') . '\'';
        }
        return $value;
    }

}
