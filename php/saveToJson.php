<?php

if (!validatePost($message)) {
    echo $message;
    exit;
}

if (isset($_POST["id"])) {
    $id = $_POST["id"];
    unset($_POST["id"]);
} else {
    $id = uniqid();
}

$data = $_POST;
$data["submitted"] = date("Y-m-d H:i:s");

$fileLocation = "../storage/orders.json";


if (!file_exists($fileLocation)) {
    $fp = fopen($fileLocation, "w");
    fwrite($fp, json_encode([uniqid() => $data]));
    fclose($fp);
} elseif (isset($id)) {
    $fileData = file_get_contents($fileLocation);
    $fileData = json_decode($fileData, true);
    $fileData[$id] = $data;

    file_put_contents($fileLocation, json_encode($fileData));
} else {
    $fp = fopen($fileLocation, "r+");
    fseek($fp, -1, SEEK_END);
    fwrite($fp, ",\"" . uniqid() . "\":" . json_encode($data) . "}");
    fclose($fp);
}



echo json_encode(["message" => "success"]);


function validatePost(&$message)
{
    if (isset($_POST["id"]) && strlen($_POST["id"]) != 13) {
        $message = json_encode(["error" => "id"]);
        return false;
    }

    if ((key_exists("id", $_POST) && sizeof($_POST) != 4) ||
        (!key_exists("id", $_POST) && sizeof($_POST) != 3)
    ) {
        print_r($_POST);
        $message = json_encode(["error" => "post_fields"]);
        return false;
    }

    if (!isset($_POST['name']) || !isset($_POST['quantity']) || !isset($_POST['unit_price'])) {
        $message = json_encode(["error" => "missing_key"]);
        return false;
    }

    if (strlen($_POST['name']) < 3 || strlen($_POST['name']) > 255) {
        $message = json_encode(["error" => "name"]);
        return false;
    }

    if ($_POST['quantity'] < 1 || $_POST['quantity'] > 100000) {
        $message = json_encode(["error" => "quantity"]);
        return false;
    }

    if ($_POST['unit_price'] < 0.01 || $_POST['unit_price'] > 100000) {
        $message = json_encode(["error" => "unit_price"]);
        return false;
    }

    return true;
}
