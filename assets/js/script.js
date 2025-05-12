// Handle scroll animations for nav-header and login-register-bar
window.addEventListener('scroll', function() {
  const navHeader = document.querySelector('.nav-header');
  const loginRegisterBar = document.querySelector('.login-register-bar');
  
  if (window.scrollY > 50) {
    navHeader.classList.add('scrolled');
    loginRegisterBar.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
    loginRegisterBar.classList.remove('scrolled');
  }
});

function scrollCarousel(button, direction) {
  const container = button.parentElement.querySelector('.destination-wrapper');
  const scrollAmount = 450;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
function goToTransport() {
  window.location.href = 'transport.html';
}
document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  function initSlider() {
      slides.forEach((slide, index) => {
          if (index === 0) slide.classList.add('active');
          else slide.classList.remove('active');
      });
  }

  function updateSlider() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      slides.forEach((slide, index) => {
          slide.classList.toggle('active', index === currentIndex);
      });
  }

  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
  });

  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
  });

  setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
  }, 8000);


  initSlider();
});

// Xử lý nút bật/tắt âm thanh cho video intro
window.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('introVideo');
  const muteBtn = document.getElementById('muteBtn');
  const muteBtnWrapper = document.getElementById('muteBtnWrapper');
  if (video && muteBtn && muteBtnWrapper) {
    // Hiệu ứng sóng nếu đang bật tiếng
    if (!video.muted) {
      muteBtnWrapper.classList.add('sound-on');
    }
    muteBtn.addEventListener('click', function() {
      if (video.muted || video.volume === 0) {
        video.muted = false;
        video.volume = 1;
        muteBtn.src = '/assets/images/mute.png';
        muteBtnWrapper.classList.add('sound-on');
      } else {
        video.muted = true;
        muteBtn.src = '/assets/images/muted.png';
        muteBtnWrapper.classList.remove('sound-on');
      }
    });
  }
});

// // Vietnam Map Interaction
// document.addEventListener('DOMContentLoaded', function() {
//     const mapObject = document.getElementById('central-vietnam-map');
//     const visitedCountElement = document.getElementById('visited-count');
    
//     // Wait for SVG to load
//     mapObject.addEventListener('load', function() {
//         const svgDoc = mapObject.contentDocument;
//         const provinces = svgDoc.querySelectorAll('path');
        
//         // Load visited provinces from localStorage
//         const visitedProvinces = JSON.parse(localStorage.getItem('visitedProvinces')) || [];
        
//         // Update visited count
//         function updateVisitedCount() {
//             const count = svgDoc.querySelectorAll('path.visited').length;
//             visitedCountElement.textContent = count;
//         }
        
//         // Apply visited state to provinces
//         visitedProvinces.forEach(provinceId => {
//             const province = svgDoc.getElementById(provinceId);
//             if (province) {
//                 province.classList.add('visited');
//             }
//         });
        
//         // Initial count update
//         updateVisitedCount();
        
//         // Handle province clicks
//         provinces.forEach(province => {
//             province.addEventListener('click', function() {
//                 const provinceId = this.id;
//                 const isVisited = this.classList.contains('visited');
                
//                 if (isVisited) {
//                     this.classList.remove('visited');
//                     const index = visitedProvinces.indexOf(provinceId);
//                     if (index > -1) {
//                         visitedProvinces.splice(index, 1);
//                     }
//                 } else {
//                     this.classList.add('visited');
//                     visitedProvinces.push(provinceId);
//                 }
                
//                 // Save to localStorage
//                 localStorage.setItem('visitedProvinces', JSON.stringify(visitedProvinces));
                
//                 // Update visited count
//                 updateVisitedCount();
                
//                 // Show tooltip with province name
//                 const provinceName = this.getAttribute('data-name');
//                 const message = `Bạn đã ${isVisited ? 'bỏ đánh dấu' : 'đánh dấu'} ${provinceName}`;
                
//                 // Create and show custom tooltip
//                 const tooltip = document.createElement('div');
//                 tooltip.className = 'map-tooltip';
//                 tooltip.textContent = message;
//                 document.body.appendChild(tooltip);
                
//                 // Position tooltip
//                 const rect = this.getBoundingClientRect();
//                 tooltip.style.left = rect.left + (rect.width / 2) + 'px';
//                 tooltip.style.top = (rect.top - 40) + 'px';
                
//                 // Remove tooltip after 2 seconds
//                 setTimeout(() => {
//                     tooltip.remove();
//                 }, 2000);
//             });
            
//             // Add hover effect
//             province.addEventListener('mouseenter', function() {
//                 const provinceName = this.getAttribute('data-name');
//                 this.setAttribute('title', provinceName);
//             });
//         });
//     });
// });