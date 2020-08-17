<?php

$type = $_GET["type"];


$fileLocation = "../storage/orders.json";

if (!file_exists($fileLocation)) {
    echo json_encode(["message" => "no data"]);
    exit;
}

if ($type == "all") {
    loadAllFile($fileLocation);
}

if ($type == "modified") {
    checkLastModifiedTime($fileLocation);
    loadAllFile($fileLocation);
}

function loadAllFile($fileLocation)
{
    $data = "";
    $counter = 0;
    $last_modified = filemtime($fileLocation);
    $fp = fopen($fileLocation, "r");

    while ($row = fgets($fp)) {
        $counter++;
        $data .= $row;
    }

    $data = json_decode($data, true);
    echo json_encode([
        "data" => $data,
        "last_modified" => $last_modified,
        "length" => $counter
    ]);
}

function checkLastModifiedTime($fileLocation)
{
    $last_known = $_GET["last_modified"];
    $last_modified = filemtime($fileLocation);
    if ($last_modified == $last_known) {
        echo json_encode([
            "message" => "no changes",
            "last_modified" => $last_modified
        ]);
        exit;
    }
}
