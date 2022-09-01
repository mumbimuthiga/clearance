<?php

$argc = $_SERVER['argc'];
$argv = $_SERVER['argv'];

if ($argc > 1 && isset($argv[1])) {
    $_SERVER['PATH_INFO']   = $argv[1];
    $_SERVER['REQUEST_URI'] = $argv[1];
} else {
    $_SERVER['PATH_INFO']   = '/member/agent_reg';
    $_SERVER['REQUEST_URI'] = '/member/agent_reg';
}

set_time_limit(0);

require_once('index.php');