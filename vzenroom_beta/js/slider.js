const track = document.getElementById('sliderTrack');
let slides = Array.from(track.children);

const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');

// Клонируем первый и последний слайды
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

let currentIndex = 1;
const slideWidth = slides[0].offsetWidth;

function updateSlide(animate = true) {
  if (!animate) track.style.transition = 'none';
  else track.style.transition = 'transform 0.3s ease';

  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

window.addEventListener('load', () => {
  updateSlide(false);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  updateSlide();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlide();
});

track.addEventListener('transitionend', () => {
  if (slides[currentIndex].id === 'first-clone') {
    track.style.transition = 'none';
    currentIndex = 1;
    updateSlide(false);
  }
  if (slides[currentIndex].id === 'last-clone') {
    track.style.transition = 'none';
    currentIndex = slides.length - 2;
    updateSlide(false);
  }
});

window.addEventListener('resize', () => {
  updateSlide(false);
});