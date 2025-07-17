<template>
  <div>
    <h2>Дуо ва зикрлар</h2>
    
    <div v-if="loading">Юкланмоқда...</div>
    
    <div v-else>
      <div class="category-tabs">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="azkar-list">
        <div v-for="item in filteredAzkar" :key="item.id" class="azkar-item">
          <h3>{{ item.title }}</h3>
          <p class="arabic">{{ item.arabic }}</p>
          <p class="translation">{{ item.translation }}</p>
          <p class="reference">{{ item.reference }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default function useAzkar() {
  const azkar = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchAzkar = async () => {
    try {
      const response = await fetch('https://api.aladhan.com/v1/azkar');
      const data = await response.json();
      azkar.value = data.data;
    } catch (err) {
      error.value = 'Маълумотларни юклаб бўлмади';
    } finally {
      loading.value = false;
    }
  };

  return { azkar, loading, error, fetchAzkar };
}
</script>

<style scoped>
.azkar-item {
  background: #f5f5f5;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
}
.arabic {
  font-size: 1.5em;
  text-align: right;
  direction: rtl;
}
.category-tabs button {
  padding: 8px 15px;
  margin-right: 10px;
  background: #eee;
  border: none;
  cursor: pointer;
}
.category-tabs button.active {
  background: #4CAF50;
  color: white;
}
</style>