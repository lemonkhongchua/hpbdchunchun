const petalsContainer = document.getElementById('petals-container');
const petalEmojis = ['🌸', '💮', '🍃', '✨', '💖'];
setInterval(() => {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = `${Math.random() * 100}vw`;
  const duration = 6 + Math.random() * 5;
  petal.style.animationDuration = `${duration}s`;
  petal.style.setProperty('--end-x', `${(Math.random() - 0.5) * 250}px`);
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}, 350);

const wishes = [
  "Chúc Chun tuổi mới vui vẻ nhé! 🎂",
  "Các môn học đêu full A nèe 💻", "Có gì thì ới Chanh giúp đỡ nheee ❤️",
  "Kì nào cũng được học bổng, lương thì ngàn đô 💵", "Chúc Chun một đời bình an, vạn sự như ý 🍀",
  "Thức khuya nhiều không có tốt cho sức khỏe đâuuuu 🌙", "Mọi ước mơ của Chun đều thành hiện thực ⭐",
  "Best Friend mãi đỉnh 🎉", "Tuổi mới rực rỡ và đẹp trai hơn nữa 💖",
  "Ê nào rảnh đi chơi đee 😋", "Lúc nào cũng ngầu ngầu, bá khíii kkk ☀️",
  "Có chuyện gì thì đâyy, bạn thân của Chun ở đây nèee 🍓", "Cảm ơn vì lúc nào cũng nghe Chanh kể chuyện, than phiền nhee 🎁",
  "Một ngày sinh nhật thật ấm áp và hạnh phúc 🍰",
  "Cố gắng lên, Chanh lúc nào cũng tin Chun 🌟", "Làm gì cũng siêu mượt màaaa🎓",
  "Sớm theo đuổi được đam mê của mình nhaa 🌠", "Happy Birthday Chun! 🎊",
  "Có buồn phiền gì cứ gọi Chanh nhé 📞", "Tuổi mới nhiều may mắn, deadline pass nhẹ nhàng 🗓️",
  "Chúc tình bạn chúng mình mãi keo sơn 🥂", "Nào làm quả dự án ma nè kkk ✈️"
];

// Điền tên file ảnh vào đây nha:
let userPhotos = [
  "anh1.jpg", 
  "anh2.jpg",
  "anh3.jpg"
];

let soundOn = true;
const customAudio = document.getElementById('custom-audio');

function startMusic() {
  customAudio.play().catch(e => console.log("Cần click vào web để phát nhạc"));
}
function stopMusic() {
  customAudio.pause();
}

document.getElementById('btn-toggle-sound').addEventListener('click', (e) => {
  soundOn = !soundOn; 
  soundOn ? startMusic() : stopMusic();
  e.target.innerHTML = soundOn ? '🎵' : '🔇';
});

function create3DCake(isSpinning = false) {
  const cake = document.createElement('div');
  cake.className = isSpinning ? 'cake-3d-center' : '';
  if (!isSpinning) cake.style.transformStyle = 'preserve-3d';

  const plate = document.createElement('div'); plate.className = 'plate-3d'; cake.appendChild(plate);
  
  const bTop = document.createElement('div'); bTop.className = 'tier-bottom-top'; cake.appendChild(bTop);
  const bBase = document.createElement('div'); bBase.className = 'tier-bottom-base'; cake.appendChild(bBase);
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div'); p.className = 'side-panel-b';
    p.style.transform = `translate(-50%, -50%) translateY(57.5px) rotateY(${(i/12)*360}deg) translateZ(95px)`;
    cake.appendChild(p);
  }

  const tTop = document.createElement('div'); tTop.className = 'tier-top-top'; cake.appendChild(tTop);
  const tBase = document.createElement('div'); tBase.className = 'tier-top-base'; cake.appendChild(tBase);
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div'); p.className = 'side-panel-t';
    p.style.transform = `translate(-50%, -50%) translateY(-7.5px) rotateY(${(i/12)*360}deg) translateZ(65px)`;
    cake.appendChild(p);
  }

  const candle = document.createElement('div'); candle.className = 'candle-3d'; cake.appendChild(candle);
  const candleLight = document.createElement('div'); candleLight.className = 'candle-light'; cake.appendChild(candleLight);
  const flame = document.createElement('div'); flame.className = 'flame-3d'; cake.appendChild(flame);
  const smoke = document.createElement('div'); smoke.className = 'smoke'; cake.appendChild(smoke);

  return cake;
}

const introScreen = document.getElementById('intro-screen');
const wishScreen = document.getElementById('wish-screen');
const carouselScene = document.getElementById('carousel-scene');
const carouselWorld = document.getElementById('carousel-world');
const wishCakeContainer = document.getElementById('wish-cake-3d');

document.getElementById('cake-btn').addEventListener('click', () => {
  wishCakeContainer.innerHTML = '';
  wishCakeContainer.appendChild(create3DCake(false)); 

  introScreen.style.opacity = '0'; 
  introScreen.style.transform = 'scale(0.9)';
  setTimeout(() => {
    introScreen.style.display = 'none'; 
    wishScreen.style.display = 'flex';
    setTimeout(() => wishScreen.style.opacity = '1', 50);
  }, 800);
});

document.getElementById('blow-btn').addEventListener('click', () => {
  wishCakeContainer.classList.add('blow-active');
  
  setTimeout(() => {
    confetti({ particleCount: 200, spread: 180, origin: { y: 0.6 }, colors: ['#ff4d6d', '#ff9ebb', '#ffd166', '#ffffff'] });
    startMusic(); 
    
    wishScreen.style.opacity = '0';
    setTimeout(() => {
      wishScreen.style.display = 'none'; 
      carouselScene.style.display = 'block';
      build3DCarousel();
      setTimeout(() => carouselScene.style.opacity = '1', 50);
    }, 800);
  }, 1200);
});

let rotY = 0, autoRotate = true, isDragging = false, prevX = 0;
// CAMERA KÉO LẠI GẦN CHO TO RÕ HƠN
let currentZoom = -600; 
const minZoom = -2400, maxZoom = 250;    

function build3DCarousel() {
  carouselWorld.innerHTML = '';
  carouselWorld.appendChild(create3DCake(true)); 

  const pool = [];
  wishes.forEach(w => pool.push({ type: 'text', content: w }));
  userPhotos.forEach(p => pool.push({ type: 'photo', content: p }));
  
  const third = Math.ceil(pool.length / 3);
  const topTier = pool.slice(0, third);
  const midTier = pool.slice(third, third * 2);
  const bottomTier = pool.slice(third * 2);

  const radius = Math.max(850, (third * 400) / (2 * Math.PI)); 

  function createTier(items, yOffset) {
    const total = items.length;
    items.forEach((data, i) => {
      const el = document.createElement('div'); el.className = 'carousel-item';
      if (data.type === 'text') {
        el.innerHTML = `<div class="wish-card">${data.content}</div>`;
      } else {
        el.innerHTML = `<div class="photo-card"><img src="${data.content}" alt="pic" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&q=60'"></div>`;
      }

      const angle = (i / total) * 360;
      el.style.transform = `translate(-50%, -50%) translateY(\({yOffset}px) rotateY(\){angle}deg) translateZ(${radius}px)`;
      
      el.addEventListener('click', (e) => confetti({ particleCount: 20, origin: { x: e.clientX/innerWidth, y: e.clientY/innerHeight }, colors: ['#ff4d6d', '#ff9ebb'] }));
      carouselWorld.appendChild(el);
    });
  }

  createTier(topTier, -250);
  createTier(midTier, 0);
  createTier(bottomTier, 250);
}

function animateCarousel() {
  if (autoRotate && !isDragging) rotY -= 0.12;
  carouselWorld.style.transform = `translateZ(\({currentZoom}px) rotateX(-7deg) rotateY(\){rotY}deg)`;
  requestAnimationFrame(animateCarousel);
}
requestAnimationFrame(animateCarousel);

window.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; });
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  rotY += (e.clientX - prevX) * 0.35; prevX = e.clientX;
});
window.addEventListener('mouseup', () => isDragging = false);

let initialTouchDist = 0;
window.addEventListener('touchstart', e => { 
  if (e.touches.length === 1) { isDragging = true; prevX = e.touches[0].clientX; } 
  else if (e.touches.length === 2) initialTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
});
window.addEventListener('touchmove', e => {
  if (e.touches.length === 1 && isDragging) {
    rotY += (e.touches[0].clientX - prevX) * 0.45; prevX = e.touches[0].clientX;
  } else if (e.touches.length === 2) {
    const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    currentZoom += (currentDist - initialTouchDist) * 1.5;
    currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom));
    initialTouchDist = currentDist;
  }
});
window.addEventListener('touchend', () => isDragging = false);

window.addEventListener('wheel', e => {
  if(carouselScene.style.display === 'block') {
    currentZoom -= e.deltaY * 0.65;
    currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom));
  }
});