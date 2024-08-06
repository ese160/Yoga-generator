<?php
require 'db.php';

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = getDbConnection();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Debugging line to check received data
file_put_contents('php://stderr', print_r($data, TRUE));

if (isset($data['video_path'])) {
    $videoPath = $data['video_path'];

    // Prevent duplicates by checking if the video already exists
    $stmt = $db->prepare("SELECT COUNT(*) FROM videos WHERE video_path = ?");
    $stmt->execute([$videoPath]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Video already saved']);
        exit;
    }

    $sql = "INSERT INTO videos (video_path) VALUES (?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$videoPath]);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid video data']);
}
?>
