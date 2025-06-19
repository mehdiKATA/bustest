<?php
header('Content-Type: application/json; charset=utf-8');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// DEBUG
if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid input', 'raw_input' => $input]);
    exit;
}

if (!isset($data['mail'])) {
    echo json_encode(['success' => false, 'error' => 'Missing email']);
    exit;
}

$email = trim($data['mail']);

if (empty($email)) {
    echo json_encode(['success' => false, 'error' => 'Email cannot be empty']);
    exit;
}

$host = "sql7.freesqldatabase.com";
$user = "sql7785788";
$pass = "CuYIPHUJwC";
$db   = "sql7785788";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

$stmt = $conn->prepare("SELECT COUNT(*) as count FROM user WHERE mail = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] > 0) {
    echo json_encode(['success' => true, 'exists' => true]);
} else {
    echo json_encode(['success' => true, 'exists' => false]);
}

$stmt->close();
$conn->close();
?>