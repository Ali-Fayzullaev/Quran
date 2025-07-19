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
        <div class="dots-container">
          <div 
            v-for="page in visiblePages" 
            :key="page"
            class="dot"
            :class="{ 
              'active': page === pageNum,
              'current-range': Math.abs(page - pageNum) < 4
            }"
            @click="goToPageDirect(page)"
          >
            <span v-if="page === pageNum" class="page-indicator">{{ page }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      transitionDirection: "slide-left",
      visiblePages: [],
      totalPages: 604,
      dotsCount: 20, // Количество отображаемых точек
    };
  },
  watch: {
    pageNum(newVal) {
      this.updateVisiblePages(newVal);
    }
  },
  mounted() {
    this.updateVisiblePages(1);
  },
  methods: {
    updateVisiblePages(currentPage) {
      // Рассчитываем диапазон страниц для отображения
      const start = Math.max(1, currentPage - Math.floor(this.dotsCount / 2));
      const end = Math.min(this.totalPages, start + this.dotsCount - 1);
      
      this.visiblePages = [];
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    },
    goPrev() {
      if (this.pageNum > 1) {
        this.transitionDirection = "slide-right";
        this.pageNum--;
      }
    },
    goNext() {
      if (this.pageNum < this.totalPages) {
        this.transitionDirection = "slide-left";
        this.pageNum++;
      }
    },
    goToPageDirect(page) {
      this.transitionDirection = page > this.pageNum ? "slide-left" : "slide-right";
      this.pageNum = page;
    },
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - this.touchStartX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goPrev();
        } else {
          this.goNext();
        }
      }
    }
  }
};
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  justify-content: center;
}

.dot.active {
  background-color: #4CAF50;
  transform: scale(1.5);
  z-index: 2;
}

.dot.current-range {
  background-color: #a5d6a7;
}

.page-indicator {
  position: absolute;
  top: -25px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #4CAF50;
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
    width: 8px;
    height: 8px;
  }
  
  .dot.active {
    transform: scale(1.3);
  }
  
  .page-indicator {
    font-size: 0.7rem;
    top: -20px;
  }
}

@media (max-width: 480px) {
  .dots-container {
    gap: 4px;
  }
  
  .dot {
    width: 6px;
    height: 6px;
  }
  
  .page-indicator {
    font-size: 0.6rem;
    top: -18px;
  }
}
</style>