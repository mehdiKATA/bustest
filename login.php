<?php

// Autoriser toutes les origines (CORS) – pour dev seulement
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connexion à la base de données
$host = "sql212.infinityfree.com";
$user = "if0_39153686";
$pass = "KATTARINA2015";
$db   = "if0_39153686_user";

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

if (!$mail || !$pwd) {
    http_response_code(400);
    echo json_encode(["error" => "Champs manquants"]);
    exit();
}

// Insertion dans la base de données
$stmt = $conn->prepare("INSERT INTO user (mail, pwd) VALUES (?, ?)");
$stmt->bind_param("ss", $mail, $pwd);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Erreur lors de l'insertion"]);
}

$stmt->close();
$conn->close();
