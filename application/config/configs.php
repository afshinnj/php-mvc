<?php
/*
 * database config
 *
 **/
$configs['dbHost'] = 'localhost';
$configs['dbUsername'] = 'root';
$configs['dbPassword'] = '';
$configs['dbName'] = 'blog';

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
