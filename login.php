<?php
header('Content-Type: application/json; charset=utf-8');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// DEBUG
if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid input', 'raw_input' => $input]);
    exit;
}

if (!isset($data['mail']) || !isset($data['pwd'])) {
    echo json_encode(['success' => false, 'error' => 'Missing mail or pwd']);
    exit;
}

$mail = $data['mail'];
$pwd = $data['pwd'];

$host = "sql7.freesqldatabase.com";
$user = "sql7783255";
$pass = "nA5i2wuRi8";
$db   = "sql7783255";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

$stmt = $conn->prepare("SELECT pwd FROM users WHERE mail = ?");
$stmt->bind_param("s", $mail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
    exit;
}

$user = $result->fetch_assoc();

if ($pwd === $user['pwd']) {
    echo json_encode(['success' => true, 'message' => 'Welcome']);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
?>
