window.addEventListener('scroll', function() {
  const navHeader = document.querySelector('.nav-header');
  const loginRegisterBar = document.querySelector('.login-register-bar');
  const videoTitle = document.querySelector('.video-title');
  
  if (window.scrollY > 200) {
    navHeader.classList.add('scrolled');
    loginRegisterBar.classList.add('scrolled');
    videoTitle.classList.add('hidden');
  } else {
    navHeader.classList.remove('scrolled');
    loginRegisterBar.classList.remove('scrolled');
    videoTitle.classList.remove('hidden');
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

window.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('introVideo');
  const muteBtn = document.getElementById('muteBtn');
  const muteBtnWrapper = document.getElementById('muteBtnWrapper');
  if (video && muteBtn && muteBtnWrapper) {
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

window.addEventListener('scroll', function() {
  const productIntroContent = document.querySelector('.product-intro-content');
  const tripSpotlight = document.querySelector('.trip-spotlight');
  const tripSpotlightHeight = tripSpotlight.offsetHeight;
  const scrollPosition = window.scrollY;

  if (!productIntroContent.classList.contains('fade-in')) {
    productIntroContent.classList.add('fade-in');
  }

  if (scrollPosition > tripSpotlightHeight * 0.3) {
    productIntroContent.classList.add('visible');
  } else {
    productIntroContent.classList.remove('visible');
  }

  if (scrollPosition > tripSpotlightHeight * 0.3) {
    productIntroContent.classList.add('scrolled');
  } else {
    productIntroContent.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    
    if (nextBtn && prevBtn) {
        nextBtn.onclick = function() {
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').appendChild(lists[0]);
        }
        
        prevBtn.onclick = function() {
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').prepend(lists[lists.length - 1]);
        }
    }
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
        item.addEventListener('click', function() {
            const slide = document.getElementById('slide');
            slide.insertBefore(this, slide.children[1]);
        });
    });
});

window.addEventListener('scroll', function() {
  const productIntroText = document.querySelector('.product-intro-text');
  const contentElements = document.querySelectorAll('.item .content');
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  if (productIntroText) {
    const productIntroRect = productIntroText.getBoundingClientRect();
    const productIntroTrigger = windowHeight * 0.7;

    if (productIntroRect.top < productIntroTrigger) {
      productIntroText.classList.add('animate');
      productIntroText.classList.remove('animate-out');
    } else {
      productIntroText.classList.remove('animate');
      productIntroText.classList.add('animate-out');
    }
  }

  contentElements.forEach(content => {
    const contentRect = content.getBoundingClientRect();
    const contentTrigger = windowHeight * 0.7;

    if (contentRect.top < contentTrigger) {
      content.classList.add('animate');
      content.classList.remove('animate-out');
    } else {
      content.classList.remove('animate');
      content.classList.add('animate-out');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const articles = document.querySelectorAll('.new-card__article');
  const containers = document.querySelectorAll('.new-container');

  articles.forEach(article => {
    article.addEventListener('mouseenter', function() {
      const img = this.querySelector('.new-card__img');
      const imgSrc = img.src;
      const container = this.closest('.new-container');
      container.style.backgroundImage = `url(${imgSrc})`;
    });

    article.addEventListener('mouseleave', function() {
      const container = this.closest('.new-container');
      container.style.backgroundImage = 'linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)';
    });
  });
});

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const culturalContent = document.querySelector('.cultural-content');
    const culturalHeader = document.querySelector('.cultural-header');
    const culturalCards = document.querySelectorAll('.cultural-card');
    
    if (culturalContent) {
        const sectionTop = culturalContent.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = currentScrollTop > lastScrollTop;

        if (sectionTop < windowHeight * 0.85) {
            culturalContent.classList.add('visible');
            culturalContent.classList.remove('hide');
            culturalCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                    card.classList.remove('hide');
                }, index * 150);
            });
        } else {
            culturalContent.classList.remove('visible');
            culturalContent.classList.add('hide');
            culturalCards.forEach(card => {
                card.classList.remove('visible');
                card.classList.add('hide');
            });
        }

        if (sectionTop < windowHeight * 0.75) {
            culturalHeader.classList.add('visible');
            culturalHeader.classList.remove('hide');
        } else {
            culturalHeader.classList.remove('visible');
            culturalHeader.classList.add('hide');
        }
        
        lastScrollTop = currentScrollTop;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.cultural-grid');
    const cards = document.querySelectorAll('.cultural-card');
    let currentIndex = 0;
    const cardsPerView = 3;
    const totalCards = cards.length;
    let isAnimating = false;

    let touchStartX = 0;
    let touchEndX = 0;

    grid.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    grid.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            if (!isAnimating) {
                updateCards('next');
            }
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            if (!isAnimating) {
                updateCards('prev');
            }
        }
    }

    function updateCards(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const cards = Array.from(grid.querySelectorAll('.cultural-card'));
        cards.forEach((card, index) => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            if (direction === 'next') {
                if (index === 0) {
                    card.style.transform = 'translateX(-100%) rotateY(-15deg)';
                    card.style.opacity = '0';
                } else {
                    card.style.transform = 'translateX(-100%)';
                }
            } else {
                if (index === cards.length - 1) {
                    card.style.transform = 'translateX(100%) rotateY(15deg)';
                    card.style.opacity = '0';
                } else {
                    card.style.transform = 'translateX(100%)';
                }
            }
        });

        setTimeout(() => {
            if (direction === 'next') {
                const firstCard = cards[0];
                grid.appendChild(firstCard);
                firstCard.style.transform = 'translateX(100%) rotateY(15deg)';
                firstCard.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    firstCard.style.transform = 'translateX(0) rotateY(0)';
                    firstCard.style.opacity = '1';
                });
            } else {
                const lastCard = cards[cards.length - 1];
                grid.insertBefore(lastCard, cards[0]);
                lastCard.style.transform = 'translateX(-100%) rotateY(-15deg)';
                lastCard.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    lastCard.style.transform = 'translateX(0) rotateY(0)';
                    lastCard.style.opacity = '1';
                });
            }

            cards.forEach(card => {
                card.style.transform = 'translateX(0) rotateY(0)';
                card.style.opacity = '1';
            });

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }, 600);
    }
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Central Landmarks Timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineHeader = document.querySelector('.timeline-header');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineTrack = document.querySelector('.timeline-track');
    const controlPrev = document.querySelector('.control-prev');
    const controlNext = document.querySelector('.control-next');
    const progressBar = document.querySelector('.progress-bar');
    let currentIndex = 0;
    let isAnimating = false;

    // Intersection Observer for header
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    if (timelineHeader) observer.observe(timelineHeader);

    // Initialize timeline
    function initTimeline() {
        timelineItems.forEach((item, index) => {
            item.classList.remove('active', 'to-left', 'to-right');
            if (index === 0) {
                item.classList.add('active');
                item.style.transform = 'translateX(0)';
            } else {
                item.style.transform = 'translateX(100%)';
            }
        });
        updateProgress();
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentIndex + 1) / timelineItems.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Navigate timeline
    function navigateTimeline(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentItem = timelineItems[currentIndex];
        let nextIndex;

        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % timelineItems.length;
        } else {
            nextIndex = (currentIndex - 1 + timelineItems.length) % timelineItems.length;
        }

        const nextItem = timelineItems[nextIndex];

        // Remove all classes
        timelineItems.forEach(item => item.classList.remove('to-left', 'to-right', 'active'));

        // Animate current item out
        if (direction === 'next') {
            currentItem.classList.add('to-left');
            nextItem.style.transform = 'translateX(100%)';
        } else {
            currentItem.classList.add('to-right');
            nextItem.style.transform = 'translateX(-100%)';
        }
        currentItem.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentItem.style.opacity = '0';

        // Animate next item in
        nextItem.classList.add('active');
        nextItem.style.opacity = '1';
        setTimeout(() => {
            nextItem.style.transform = 'translateX(0)';
        }, 10);

        // Update classes
        setTimeout(() => {
            currentItem.classList.remove('to-left', 'to-right', 'active');
            currentIndex = nextIndex;
            updateProgress();
            isAnimating = false;
        }, 600);
    }

    // Event listeners for navigation
    if (controlPrev && controlNext) {
        controlPrev.addEventListener('click', () => navigateTimeline('prev'));
        controlNext.addEventListener('click', () => navigateTimeline('next'));
    }

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (timelineTrack) {
        timelineTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        timelineTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            navigateTimeline('next');
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            navigateTimeline('prev');
        }
    }

    // Initialize timeline
    initTimeline();
});
// Vietnam Map Interaction
document.addEventListener('DOMContentLoaded', function() {
    const mapObject = document.getElementById('central-vietnam-map');
    const visitedCountElement = document.getElementById('visited-count');
    
    // Wait for SVG to load
    mapObject.addEventListener('load', function() {
        const svgDoc = mapObject.contentDocument;
        const provinces = svgDoc.querySelectorAll('path');
        
        // Load visited provinces from localStorage
        const visitedProvinces = JSON.parse(localStorage.getItem('visitedProvinces')) || [];
        
        // Update visited count
        function updateVisitedCount() {
            const count = svgDoc.querySelectorAll('path.visited').length;
            visitedCountElement.textContent = count;
        }
        
        // Apply visited state to provinces
        visitedProvinces.forEach(provinceId => {
            const province = svgDoc.getElementById(provinceId);
            if (province) {
                province.classList.add('visited');
            }
        });
        
        // Initial count update
        updateVisitedCount();
        
        // Handle province clicks
        provinces.forEach(province => {
            province.addEventListener('click', function() {
                const provinceId = this.id;
                const isVisited = this.classList.contains('visited');
                
                if (isVisited) {
                    this.classList.remove('visited');
                    const index = visitedProvinces.indexOf(provinceId);
                    if (index > -1) {
                        visitedProvinces.splice(index, 1);
                    }
                } else {
                    this.classList.add('visited');
                    visitedProvinces.push(provinceId);
                }
                
                // Save to localStorage
                localStorage.setItem('visitedProvinces', JSON.stringify(visitedProvinces));
                
                // Update visited count
                updateVisitedCount();
                
                // Show tooltip with province name
                const provinceName = this.getAttribute('data-name');
                const message = `Bạn đã ${isVisited ? 'bỏ đánh dấu' : 'đánh dấu'} ${provinceName}`;
                
                // Create and show custom tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'map-tooltip';
                tooltip.textContent = message;
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) + 'px';
                tooltip.style.top = (rect.top - 40) + 'px';
                
                // Remove tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
            
            // Add hover effect
            province.addEventListener('mouseenter', function() {
                const provinceName = this.getAttribute('data-name');
                this.setAttribute('title', provinceName);
            });
        });
    });
});