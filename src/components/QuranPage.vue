<template>
  <div class="mushaf-container">
    <div class="mushaf-viewer">
      <div
        class="page-container"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <transition :name="transitionDirection" mode="out-in">
          <div :key="pageNum" class="page-wrapper">
            <img
              :src="`/quran-img-pages/${String(pageNum).padStart(3, '0')}.svg`"
              alt="Qur'an Page"
              class="mushaf-page"
            />
          </div>
        </transition>
      </div>

      <!-- Прогресс-бар в виде точек -->
      <div class="progress-bar">
        <div class="dots-scroll-container">
          <div class="dots-container">
            <div
              v-for="page in visiblePages"
              :key="page"
              class="dot"
              :class="{
                active: page === pageNum,
                'current-range': Math.abs(page - pageNum) < 4,
              }"
              @click="goToPageDirect(page)"
            >
              <span
                :class="
                  page === pageNum ? 'page-indicator' : 'page-indicator-small'
                "
                >{{ page }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
const savePageNum = localStorage.getItem("pageNum") || 1;
const pageNum = ref(savePageNum);
const transitionDirection = ref("slide-left");
const visiblePages = ref([]);
const totalPages = ref(604);
const dotsCount = ref(604);
const touchStartX = ref(0);

let lastVibrate = 0;

watch(pageNum, (newVal) => {
  updateVisiblePages(newVal);

  // Авто-скролл
  setTimeout(() => {
    const el = document.querySelector(".dot.active");
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, 100); // setTimeout зарур, DOM янгиланиши учун
});

function handleScrollVibration() {
  const now = Date.now();
  if (navigator.vibrate && now - lastVibrate > 300) {
    navigator.vibrate(20); // 20ms вибрация
    lastVibrate = now;
  }
}

function updateVisiblePages(currentPage) {
  const start = Math.max(1, currentPage - Math.floor(dotsCount.value / 2));
  const end = Math.min(totalPages.value, start + dotsCount.value - 1);

  visiblePages.value = [];
  for (let i = start; i <= end; i++) {
    visiblePages.value.push(i);
  }
}

function goToPageDirect(page) {
  transitionDirection.value =
    page > pageNum.value ? "slide-left" : "slide-right";
  pageNum.value = page;
  localStorage.setItem("pageNum", page);
}
function handleTouchStart(e) {
  touchStartX.value = e.touches[0].clientX;
}
function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX.value;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      goPrev();
    } else {
      goNext();
    }
  }
}

onMounted(() => {
  updateVisiblePages(1);

const scrollEl = document.querySelector(".dots-scroll-container");
if (scrollEl) {
  scrollEl.addEventListener("scroll", handleScrollVibration);
}
});

onBeforeUnmount(() => {
  const scrollEl = document.querySelector(".dots-scroll-container");
  if (scrollEl) {
    scrollEl.removeEventListener("scroll", handleScrollVibration);
  }
});
</script>

<style scoped>
.mushaf-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f2e9;
  padding: 1rem;
}

.mushaf-viewer {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.page-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.mushaf-page {
  width: 100%;
  height: auto;
  display: block;
}

.progress-bar {
  width: 100%;
  padding: 0px 0;
  position: relative;
  overflow: hidden;
}

.dots-scroll-container {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  padding-bottom: 30px; /* Для градиентного эффекта */
  padding-top: 20px; /* Для градиентного эффекта */
  mask-image: linear-gradient(
    to right, 
    transparent 0%, 
    #000 10%, 
    #000 90%, 
    transparent 100%
    
  );
}

.dots-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
  
}

.dots-container {
  display: flex;
  gap: 6px;
  padding: 10px calc(50% - 15px); /* Центрирование активной точки */
  transition: transform 0.3s ease;
}

.dot {
  width: 16px;
  height: 26px;
  border-radius: 10%;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.dot.active {
  background-color: #4caf50;
  border: 2px dotted rgb(255, 238, 0);
  transform: scale(1.4);
  box-shadow: 
    0 0 0 2px rgba(76, 175, 80, 0.3),
    0 3px 6px rgba(0,0,0,0.16);
  z-index: 2;
}

.dot.current-range {
  background-color: #BFE8C1;
  transform: scale(1.1);
}

.page-indicator {
  position: absolute;
  top: -24px;
  background-color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: #4caf50;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 3;
}

.page-indicator-small {
  position: absolute;
  bottom: -18px;
  font-size: 0.55rem;
  font-weight: bold;
  color: #757575;
  white-space: nowrap;
  z-index: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
  .dot {
    width: 14px;
    height: 14px;
  }
  
  .page-indicator {
    font-size: 0.65rem;
    top: -20px;
    padding: 1px 6px;
  }
  
  .page-indicator-small {
    font-size: 0.5rem;
    bottom: -16px;
  }
}

@media (max-width: 480px) {
  .dots-container {
    gap: 4px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
  }
  
  .page-indicator {
    font-size: 0.6rem;
    top: -18px;
  }
}

/* Анимации перехода */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .dots-container {
    gap: 6px;
  }

  .dot {
    width: 18px;
    height: 18px;
  }

  .dot.active {
    transform: scale(1.3);
  }

  .page-indicator {
    font-size: 0.7rem;
    top: -20px;
  }
  .page-indicator-small {
    position: absolute;
    top: 3px;
    font-size: 0.4rem;
  }
}

@media (max-width: 480px) {
  .dots-container {
    gap: 4px;
  }

  .dot {
    width: 16px;
    height: 16px;
  }

  .page-indicator {
    font-size: 0.6rem;
    top: -18px;
  }
  .page-indicator-small {
    position: absolute;
    top: 3px;
    font-size: 0.4rem;
  }
}
</style>
