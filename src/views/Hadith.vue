<template>
  <div class="hadith-app">
    <!-- Поиск и фильтры -->
    <div class="search-container">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Хадис излаш..."
          @input="filterHadiths"
        >
        <span class="search-icon"><i class="bi bi-search"></i></span>
      </div>
      <div class="filter-buttons">
        <button 
          v-for="num in [10, 20, 30, 40, 42 ]" 
          :key="num" 
          @click="loadHadiths(num)"
          :class="{ active: limit === num }"
        >
          {{ num }} та
        </button>
      </div>
    </div>

    <!-- Список хадисов -->
    <div class="hadith-list">
      <div 
        v-for="(h, index) in filteredHadith" 
        :key="h.arabicnumber"
        class="hadith-card"
        :class="{ expanded: expandedCards.includes(index) }"
      >
        <div class="card-header" @click="toggleCard(index)">
          <div class="hadith-number">№{{ h.arabicnumber }}</div>
          <div class="hadith-preview">
            {{ h.text.substring(0, 50) }}...
          </div>
          <div class="expand-icon">
            {{ expandedCards.includes(index) ? '▲' : '▼' }}
          </div>
        </div>
        
        <div class="card-content">
          <div class="arabic-text">
            <h3>Арабча:</h3>
            <p>{{ h.text }}</p>
          </div>
          <div class="translation">
            <h3>English:</h3>
            <p>{{ engHadith[index]?.text }}</p>
          </div>
          <div class="actions">
            <button v-copy="h.text">
              <span><i class="bi bi-copy"></i></span> Arab
            </button>
            <button v-copy="engHadith[index]?.text">
              <span><i class="bi bi-copy"></i></span> English
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопка "Вверх" -->
    <button 
      v-show="showScrollButton" 
      @click="scrollToTop" 
      class="scroll-top"
    >
      ↑
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hadith: [],
      engHadith: [],
      searchQuery: '',
      filteredHadith: [],
      expandedCards: [],
      limit: 50,
      showScrollButton: false
    };
  },
  async created() {
    await this.loadHadiths(this.limit);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async loadHadiths(limit) {
      try {
        this.limit = limit;
        const [araRes, engRes] = await Promise.all([
          axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-nawawi.json`),
          axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi.json`)
        ]);
        
        this.hadith = araRes.data.hadiths.slice(0, limit);
        this.engHadith = engRes.data.hadiths.slice(0, limit);
        this.filteredHadith = [...this.hadith];
        this.expandedCards = [];
        
      } catch (error) {
        console.error("Хатолик:", error);
      }
    },
    filterHadiths() {
      if (!this.searchQuery) {
        this.filteredHadith = [...this.hadith];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredHadith = this.hadith.filter((h, index) => {
        return h.text.toLowerCase().includes(query) || 
               this.engHadith[index]?.text.toLowerCase().includes(query) ||
               h.arabicnumber.toString().includes(query);
      });
    },
    toggleCard(index) {
      const position = this.expandedCards.indexOf(index);
      if (position === -1) {
        this.expandedCards.push(index);
      } else {
        this.expandedCards.splice(position, 1);
      }
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
.hadith-app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Поиск и фильтры */
.search-container {
  margin-bottom: 25px;
}

.search-box {
  position: relative;
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-box input:focus {
  border-color: #45A049;
  outline: none;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 1.1rem;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 8px 15px;
  background: #f1f1f1;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-buttons button:hover {
  background: #e0e0e0;
}

.filter-buttons button.active {
  background: #45A049;
  color: white;
}

/* Карточки хадисов */
.hadith-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hadith-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
}

.hadith-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #f8f9fa;
  transition: background 0.3s;
}

.card-header:hover {
  background: #e9ecef;
}

.hadith-number {
  background: #45A049;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.hadith-preview {
  flex-grow: 1;
  color: #555;
  text-align: right;
}

.expand-icon {
  margin-left: 15px;
  font-size: 1.1rem;
  color: #7f8c8d;
}

.card-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  padding: 0 15px;
}

.hadith-card.expanded .card-content {
  max-height: 2000px;
  padding: 15px;
}

.arabic-text {
  text-align: right;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #1a5276;
  margin-bottom: 20px;
}

.translation {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.arabic-text h3, .translation h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.actions button {
  padding: 8px 15px;
  background: #f1f1f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.actions button:hover {
  background: #e0e0e0;
}

/* Кнопка "Вверх" */
.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 130px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #45A049;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-top:hover {
  background: #45A049;
  transform: translateY(-5px);
}

/* Адаптация для телефонов */
@media (max-width: 768px) {
  .hadith-app {
    padding: 15px;
  }
  
  .card-header {
    flex-wrap: wrap;
  }
  
  .hadith-number {
    margin-bottom: 10px;
  }
  
  .hadith-preview {
    width: 100%;
    text-align: right;
    margin: 10px 0;
  }
  
  .arabic-text {
    font-size: 1.1rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .actions button {
    width: 100%;
    justify-content: center;
  }
  
  .scroll-top {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    bottom: 20px;
    right: 20px;
  }
}
</style>