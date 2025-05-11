<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travel_app_separated";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
$role = $_POST['role'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$age = $_POST['age'];
$address = $_POST['address'];
$phone = $_POST['phone'];
if ($role === 'user') {
    $stmt = $conn->prepare("INSERT INTO users (username, password, age, address, phone) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $username, $password, $age, $address, $phone);
    $stmt->execute();
    $stmt->close();
} elseif ($role === 'guide') {
    $cccd = $_POST['cccd'];
    $uploadDir = "uploads/";
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $img_front = $uploadDir . basename($_FILES['img_front']['name']);
    $img_back = $uploadDir . basename($_FILES['img_back']['name']);
    $portrait = $uploadDir . basename($_FILES['portrait']['name']);
    move_uploaded_file($_FILES['img_front']['tmp_name'], $img_front);
    move_uploaded_file($_FILES['img_back']['tmp_name'], $img_back);
    move_uploaded_file($_FILES['portrait']['tmp_name'], $portrait);
    $stmt = $conn->prepare("INSERT INTO guides (username, password, age, address, phone, cccd, img_front_path, img_back_path, portrait_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssss", $username, $password, $age, $address, $phone, $cccd, $img_front, $img_back, $portrait);
    $stmt->execute();
    $stmt->close();
}
$conn->close();
echo "Đăng ký thành công!";
?>
