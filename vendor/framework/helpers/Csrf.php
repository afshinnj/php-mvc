<?php

function csrf_generate($key) {
    $extra = session_id();
    // token generation (basically base64_encode any random complex string, time() is used for token expiration) 
    $token = base64_encode(time() . $extra . Encryption::randomString('md5'));
    // store the one-time token in session
    $_SESSION['csrf_' . $key] = $token;

    return $token;
}
