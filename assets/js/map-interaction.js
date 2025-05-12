// Store visited provinces in localStorage
let visitedProvinces = JSON.parse(localStorage.getItem('visitedProvinces')) || {};

// Function to count visited provinces
function countVisitedProvinces() {
    return Object.values(visitedProvinces).filter(status => status === true).length;
}

// Function to show congratulation message
function showCongratulationMessage(count) {
    const messages = {
        5: "🎉 Chúc mừng! Bạn đã khám phá được 5 tỉnh/thành phố!",
        10: "🌟 Tuyệt vời! Bạn đã đến thăm 10 tỉnh/thành phố!",
        20: "🏆 Ấn tượng! Bạn đã ghé thăm 20 tỉnh/thành phố!",
        30: "👑 Ngoài sức tưởng tượng! Bạn đã khám phá 30 tỉnh/thành phố!",
        40: "💫 Bạn là một nhà thám hiểm thực sự! Đã đến 40 tỉnh/thành phố!",
        50: "🎊 Chúc mừng! Bạn đã khám phá hơn nửa đất nước!",
        63: "🏅 Xuất sắc! Bạn đã khám phá toàn bộ Việt Nam!"
    };

    if (messages[count]) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 15px 30px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
            font-size: 18px;
            text-align: center;
            animation: slideDown 0.5s ease-out;
        `;
        notification.textContent = messages[count];

        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translate(-50%, -100%); }
                to { transform: translate(-50%, 0); }
            }
        `;
        document.head.appendChild(style);

        // Add notification to page
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
}

function handleProvinceClick(provinceId) {
    // Chỉ cho phép click vào các tỉnh miền Trung
    if (!centralProvinces.includes(provinceId)) {
        return; // Không làm gì nếu không phải tỉnh miền Trung
    }
    visitedProvinces[provinceId] = !visitedProvinces[provinceId];
    
    updateProvinceColor(provinceId);
    
    localStorage.setItem('visitedProvinces', JSON.stringify(visitedProvinces));

    const visitedCount = countVisitedProvinces();
    showCongratulationMessage(visitedCount);
}

// Function to update province color
function updateProvinceColor(provinceId) {
    const province = simplemaps_countrymap_mapdata.state_specific[provinceId];
    if (province) {
        if (visitedProvinces[provinceId]) {
            // Đã thăm: xanh lá
            province.color = "#4CAF50";
            province.hover_color = "#45a049";
        } else {
            // Nếu là tỉnh miền Trung: quay lại màu đỏ
            if (centralProvinces.includes(provinceId)) {
                province.color = "#CB0404";
                province.hover_color = "#CB0404";
            } else {
                // Các tỉnh khác: quay về mặc định
                province.color = "default";
                province.hover_color = "default";
            }
        }
        simplemaps_countrymap.refresh();
    }
}

// Danh sách các tỉnh miền Trung (ID)
const centralProvinces = [
  "VN21", // Thanh Hóa
  "VN22", // Nghệ An
  "VN23", // Hà Tĩnh
  "VN24", // Quảng Bình
  "VN25", // Quảng Trị
  "VN26", // Thừa Thiên - Huế
  "VNDN", // Đà Nẵng
  "VN27", // Quảng Nam
  "VN28", // Kon Tum
  "VN29", // Quảng Ngãi
  "VN30", // Gia Lai
  "VN31", // Bình Định
  "VN32", // Phú Yên
  "VN33", // Đắk Lắk
  "VN34", // Khánh Hòa
  "VN35", // Lâm Đồng
  "VN36", // Ninh Thuận
  "VN40", // Bình Thuận
  "VN72"  // Đắk Nông
];

// Initialize map colors on load
function initializeMapColors() {
    // Đầu tiên, set lại màu cho tất cả các tỉnh miền Trung
    centralProvinces.forEach(provinceId => {
        if (visitedProvinces[provinceId]) {
            // Nếu đã thăm, set màu xanh lá
            simplemaps_countrymap_mapdata.state_specific[provinceId].color = "#4CAF50";
            simplemaps_countrymap_mapdata.state_specific[provinceId].hover_color = "#45a049";
        } else {
            // Nếu chưa thăm, set lại màu đỏ
            simplemaps_countrymap_mapdata.state_specific[provinceId].color = "#CB0404";
            simplemaps_countrymap_mapdata.state_specific[provinceId].hover_color = "#CB0404";
        }
    });
    // Sau đó, áp dụng logic cũ cho các tỉnh khác (nếu có)
    for (let provinceId in visitedProvinces) {
        // Nếu không phải tỉnh miền Trung, vẫn update màu như cũ
        if (!centralProvinces.includes(provinceId)) {
            updateProvinceColor(provinceId);
        }
    }
    // Refresh map để cập nhật màu
    simplemaps_countrymap.refresh();
}

// Add click event listeners to provinces
document.addEventListener('DOMContentLoaded', function() {
    // Wait for map to be fully loaded
    setTimeout(() => {
        // Initialize colors
        initializeMapColors();
        
        // Add click handler using simplemaps hooks
        simplemaps_countrymap.hooks.click_state = function(provinceId) {
            handleProvinceClick(provinceId);
        };
    }, 500); // Wait 0.5 second for map to load
}); 

// function setDefaultProvinceColors(defaultColor, defaultHoverColor) {
//     for (let provinceId in simplemaps_countrymap_mapdata.state_specific) {
//         simplemaps_countrymap_mapdata.state_specific[provinceId].color = defaultColor;
//         simplemaps_countrymap_mapdata.state_specific[provinceId].hover_color = defaultHoverColor;
//     }
//     simplemaps_countrymap.refresh();
// }

// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(() => {
//         setDefaultProvinceColors("#FF6363", "#0288d1"); // Màu mặc định của bản đồ, màu khi hover
//     }, 100);
// });

// const fadedProvinces = [
//   "Hà Giang", "Cao Bằng", "Bắc Kạn", "Lạng Sơn", "Tuyên Quang", "Thái Nguyên",
//   "Phú Thọ", "Bắc Giang", "Quảng Ninh", "Hà Nội", "Hải Phòng", "Hải Dương",
//   "Hưng Yên", "Vĩnh Phúc", "Bắc Ninh", "Thái Bình", "Nam Định", "Hà Nam", "Ninh Bình",
//   "Bình Dương", "Bình Phước", "Tây Ninh", "Bà Rịa – Vũng Tàu", "Đồng Nai", "Long An",
//   "Tiền Giang", "Bến Tre", "Vĩnh Long", "Trà Vinh", "Đồng Tháp", "Hậu Giang",
//   "An Giang", "Kiên Giang", "Bạc Liêu", "Sóc Trăng", "Cà Mau"
// ];

// function setProvincesFaded(opacity = 0.4) {
//     for (let id in simplemaps_countrymap_mapdata.state_specific) {
//         const province = simplemaps_countrymap_mapdata.state_specific[id];
//         if (fadedProvinces.includes(province.name)) {
//             // Tìm SVG element tương ứng và chỉnh fill-opacity
//             const svgElem = document.getElementById('state_' + id);
//             if (svgElem) {
//                 svgElem.setAttribute('fill-opacity', opacity);
//                 // Nếu vẫn chưa mờ, thử thêm:
//                 svgElem.style.opacity = opacity;
//             }
//         }
//     }
// }

// // Gọi hàm này sau khi bản đồ đã render xong
// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(() => {
//         setProvincesFaded(0.4);
//     }, 1200); // Đảm bảo bản đồ đã render xong
// });