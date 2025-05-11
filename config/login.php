<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travel_app_separated";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
$role = $_POST['role'] ?? '';
$username = $_POST['username'];
$password = $_POST['password'];
if ($role === 'user') {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
} elseif ($role === 'guide') {
    $stmt = $conn->prepare("SELECT * FROM guides WHERE username = ?");
} else {
    die("Vai trò không hợp lệ.");
}
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $role;

        echo "Đăng nhập thành công! Xin chào " . htmlspecialchars($user['username']) . " (" . $role . ")";
    } else {
        echo "Sai mật khẩu!";
    }
} else {
    echo "Tài khoản không tồn tại!";
}
$stmt->close();
$conn->close();
?>
