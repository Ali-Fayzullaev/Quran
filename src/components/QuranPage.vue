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
        <div class="dots-container mt-5">
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
              v-if="page"
              :class="
                page == pageNum ? 'page-indicator' : 'page-indicator-small'
              "
              >{{ page }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
const savePageNum = localStorage.getItem("pageNum") || 1;
const pageNum = ref(savePageNum);
const transitionDirection = ref("slide-left");
const visiblePages = ref([]);
const totalPages = ref(604);
const dotsCount = ref(604);
const touchStartX = ref(0);

watch(pageNum, (newVal) => {
  updateVisiblePages(savePageNum);
});

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

/* Стили для прогресс-бара */
.progress-bar {
  width: 100%;
  padding: 10px 0;
}

.dots-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  justify-content: center;
}

.dot.active {
  background-color: #4caf50;
  transform: scale(1.5);
  z-index: 2;
}

.dot.current-range {
  background-color: #a5d6a7;
}

.page-indicator {
  position: absolute;
  top: -25px;
  border: 2px solid rgb(16, 168, 2);
  background-color: white;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #4caf50;
  white-space: nowrap;
}
.page-indicator-small {
  position: absolute;
  top: 6px;
  font-size: 0.4rem;
  font-weight: bold;
  color: #797979;
  white-space: nowrap;
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
