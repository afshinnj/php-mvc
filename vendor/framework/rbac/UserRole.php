<?php

class UserRole {
    public static $pdo;
    public function __construct() {
        self::$pdo = new Pdo_Driver();
        UserModel::Query("
                  CREATE TABLE IF NOT EXISTS `role` (
                    `id` int(11) NOT NULL AUTO_INCREMENT,
                    `role` varchar(255) NOT NULL,
                    PRIMARY KEY (`id`)
                   ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
                   INSERT INTO `role` (`id`, `role`) VALUES (1, 'superadmin'),(2, 'admin'),(3, 'user'),(4, 'member');
        ");

    }

    public static function _set($name) {

    }

    public static function _get($id) {
        self::$pdo->bind("id", $id);
       return self::$pdo->single("SELECT `role` FROM role WHERE id = :id");
    }

}
