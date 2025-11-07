/* === LOGIC CHUNG CHO MỌI TRANG === */
document.addEventListener('DOMContentLoaded', () => {

    // --- HIỆU ỨNG 1: HIỆN/ẨN NAVBAR KHI CUỘN ---
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        const navHeight = navbar.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > navHeight) {
                navbar.classList.add('nav-hidden'); // Cuộn xuống
            } else {
                navbar.classList.remove('nav-hidden'); // Cuộn lên
            }
            lastScrollY = window.scrollY;
        });
    }

    // --- HIỆU ỨNG 2: FADE-IN/SLIDE-IN KHI CUỘN ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Hiện khi 10% element lọt vào màn hình
    });
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- HIỆU ỨNG 3: TAB (Nếu có) ---
    const tabContainer = document.querySelector('.tab-container');
    
    if (tabContainer) { 
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = tabContainer.querySelectorAll('.tab-content');
        const tabSlider = tabContainer.querySelector('.tab-slider'); 

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Cập nhật nút
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Cập nhật nội dung
                tabContents.forEach(content => content.classList.remove('active'));
                const activeContent = tabContainer.querySelector(`#${targetTab}`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }

                // Cập nhật thanh trượt
                if (tabSlider) {
                    tabSlider.style.width = `${button.offsetWidth}px`;
                    tabSlider.style.transform = `translateX(${button.offsetLeft}px)`;
                }
            });
        });
        
        // Kích hoạt thanh trượt cho tab active đầu tiên khi tải trang
        const firstActiveButton = tabContainer.querySelector('.tab-btn.active');
        if (firstActiveButton && tabSlider) {
            tabSlider.style.width = `${firstActiveButton.offsetWidth}px`;
            tabSlider.style.transform = `translateX(${firstActiveButton.offsetLeft}px)`;
        }
    }
});


/* === HIỆU ỨNG HẠT CHO TRANG CHỦ (index.html) === */
const canvas = document.getElementById('particle-canvas');

// Chỉ chạy nếu canvas tồn tại (tức là chỉ ở trang index.html)
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 100) * (canvas.width / 100)
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(56, 125, 255, 0.2)'; // Màu hạt
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Tương tác với chuột
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 5;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 5;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 5;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 5;
                }
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(56, 125, 255, 0.2)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                             ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(0, 245, 195, ${opacityValue * 0.1})`; // Màu đường nối
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = (canvas.height / 100) * (canvas.width / 100);
        init();
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    init();
    animate();
}