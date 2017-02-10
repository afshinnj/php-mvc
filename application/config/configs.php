<?php
/*
 * database config
 *

$configs['dbHost'] = 'localhost';
$configs['dbUsername'] = 'root';
$configs['dbPassword'] = '';
$configs['dbName'] = 'blog';
 **/

ActiveRecord\Config::initialize(function($cfg)
{
   //$cfg->set_model_directory('models');
   //production
   $cfg->set_connections(array('development' =>
     'mysql://root:@localhost/blog'));
 });

/*
 * set project config
 **/
$configs['title'] = 'afshin';
$configs['baseUrl'] = 'http://localhost/mvc/';

/**
 * session config
 */

$configs['sessTable'] = 'session';
$configs['sessExpire'] = 1200; // 20 minutes
/**
 *
 * csrf
 */
$configs['csrf_protection'] = TRUE;
$configs['csrf_token_name'] = 'Mycsrf';


$configs['lang'] = 'fa-IR';

$modules =[
        'admin'=>['Post','Admin','Login','User','Section'],
        'front'=>['Post1','Admin1','Login1','User1','Section1'],

];
