<?php

UserModel::Query("
            CREATE TABLE IF NOT EXISTS `user` (
              `id` int(11) NOT NULL AUTO_INCREMENT,
              `token` char(32) NOT NULL,
              `username` varchar(255) NOT NULL,
              `password` varchar(255) NOT NULL,
              `profile_id` int(11) NOT NULL,
              `ip` char(32) NOT NULL,
              `login` int(11) NOT NULL,
              `hash` char(32) NOT NULL,
              `role_id` int(11) DEFAULT 0,
              `expire` int(11) DEFAULT NULL,
              `data` LONGTEXT DEFAULT NULL,
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
");

SessionModel::Query("
    CREATE TABLE IF NOT EXISTS `{$this->sessionTable}` (
        `id` char(32) COLLATE utf8_bin NOT NULL,
        `expire` int(11) DEFAULT NULL,
        `data` longblob,
        `token` char(32) COLLATE utf8_bin NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8
");

UserModel::Query("
          CREATE TABLE IF NOT EXISTS `role` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `role` varchar(255) NOT NULL,
            PRIMARY KEY (`id`)
           ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
           INSERT INTO `role` (`id`, `role`) VALUES (1, 'superadmin'),(2, 'admin'),(3, 'user'),(4, 'member');
");
