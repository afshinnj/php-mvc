<?php

if (!function_exists('html')) {

    function html($input) {

        return htmlentities($input, ENT_QUOTES, "UTF-8");
    }

}

if (!function_exists('clean')) {

    function clean($string) {
       // $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
        return preg_replace('/[^A-Za-z0-9حخهعغفقثصضگکمنتالبیسشوپدذرزطظ\-]/', '', $string); // Removes special chars.
    }

}

if (!function_exists('sql')) {

      function sql($string) {
        $con = mysqli_connect(Configs::get('dbHost'),Configs::get('dbName'),Configs::get('dbUsername'),Configs::get('dbPassword')) or die("Connection was not established");
        return mysqli_real_escape_string($con,$string); // Removes special chars.
    }

}
