<?php

// Autoriser toutes les origines (CORS) – pour dev seulement
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Connexion à la base de données
$host = "sql7.freesqldatabase.com";
$user = "sql7783255";
$pass = "nA5i2wuRi8";
$db   = "sql7783255";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connexion échouée"]);
    exit();
}

// Lecture du JSON brut envoyé
$data = json_decode(file_get_contents("php://input"), true);

// Vérification des champs
$mail = trim($data["mail"] ?? "");
$pwd  = trim($data["pwd"] ?? "");
$name  = trim($data["name"] ?? "");
$lastn = trim($data["lastn"] ?? "");

if (!$mail || !$pwd|| !$name|| !$lastn) {
    http_response_code(400);
    echo json_encode(["error" => "Champs manquants"]);
    exit();
}

// Insertion dans la base de données
$stmt = $conn->prepare("INSERT INTO user (mail, pwd,name,lastn) VALUES (?, ?,?,?)");
$stmt->bind_param("ssss", $mail, $pwd , $name, $lastn);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Erreur lors de l'insertion"]);
}

$stmt->close();
$conn->close();
