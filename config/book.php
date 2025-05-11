<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tour_name = $_POST['tour_name'] ?? '';
    $fullname = $_POST['fullname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $departure_date = $_POST['departure_date'] ?? '';
    $people = $_POST['people'] ?? '';
    $note = $_POST['note'] ?? '';
    $payment_method = $_POST['payment_method'] ?? '';

    $stmt = $conn->prepare("INSERT INTO bookings (tour_name, fullname, email, phone, departure_date, people, note, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $tour_name, $fullname, $email, $phone, $departure_date, $people, $note, $payment_method);

    if ($stmt->execute()) {
        echo "<div class='booking-success'>✔️ Đặt tour thành công! Chúng tôi sẽ liên hệ sớm.</div>";
    } else {
        echo "<div class='booking-success'>❌ Đã xảy ra lỗi: " . htmlspecialchars($stmt->error) . "</div>";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "<div class='booking-success'>❌ Phương thức gửi không hợp lệ.</div>";
}
?>
