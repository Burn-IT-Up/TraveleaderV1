# Traveling-Web-Project
This is Project for BWD by Nhat Minh, Ngoc Thai, Tuan Anh, Van Khanh

# Cấu trúc tổ chức Project 
├── assets/ # Chứa các file CSS, JS, hình ảnh
├── config/ # Cấu hình hệ thống (database, constants, v.v.)
├── controllers/ # Logic xử lý yêu cầu (dùng mô hình MVC)
├── html/ # File HTML thuần, giao diện tĩnh
├── includes/ # Các phần dùng chung như header.php, footer.php (nếu dùng trong tương lai, hiện chưa cần quan tâm)
├── pages/ # Các trang PHP cụ thể (giới thiệu, liên hệ, v.v.) 
├── index.php # Trang chính của website 

# Ghi chú cho anh em (take notes by Nhat Minh)

- Không commit file cấu hình nhạy cảm (Database, API Keys)
- Thêm `.gitkeep` nếu cần đẩy thư mục rỗng
- Tách biệt html và PHP theo sơ đồ cấu trúc bên trên
- Luôn Pull code trước khi Push để tránh xảy ra Conflict