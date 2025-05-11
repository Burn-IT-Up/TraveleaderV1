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

// Function to handle province click
function handleProvinceClick(provinceId) {
    // Show confirmation dialog
    if (confirm('Bạn đã đến thăm tỉnh/thành phố này chưa?')) {
        // Toggle visited state
        visitedProvinces[provinceId] = !visitedProvinces[provinceId];
        
        // Update province color
        updateProvinceColor(provinceId);
        
        // Save to localStorage
        localStorage.setItem('visitedProvinces', JSON.stringify(visitedProvinces));

        // Check and show congratulation message
        const visitedCount = countVisitedProvinces();
        showCongratulationMessage(visitedCount);
    }
}

// Function to update province color
function updateProvinceColor(provinceId) {
    const province = simplemaps_countrymap_mapdata.state_specific[provinceId];
    if (province) {
        if (visitedProvinces[provinceId]) {
            // Color for visited provinces
            province.color = "#4CAF50"; // Green color
            province.hover_color = "#45a049"; // Darker green for hover
        } else {
            // Reset to default colors
            province.color = "default";
            province.hover_color = "default";
        }
        // Refresh the map to show changes
        simplemaps_countrymap.refresh();
    }
}

// Initialize map colors on load
function initializeMapColors() {
    // Apply saved colors to all provinces
    for (let provinceId in visitedProvinces) {
        updateProvinceColor(provinceId);
    }
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