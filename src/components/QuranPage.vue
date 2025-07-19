<template>
  <div class="mushaf-viewer">
    <img
    :src="`/quran-img-pages/${String(pageNum).padStart(3, '0')}.svg`"

      alt="Qur'an Page"
      class="mushaf-page"
    />
    <div class="controls">
      <button @click="prev" :disabled="pageNum === 1">←</button>
      <span>{{ pageNum }} / 604</span>
      <button @click="next" :disabled="pageNum === 604">→</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1
    };
  },
  methods: {
    prev() {
      if (this.pageNum > 1) this.pageNum--;
    },
    next() {
      if (this.pageNum < 604) this.pageNum++;
    }
  }
};
</script>


<style scoped>
.mushaf-viewer {
  text-align: center;
  padding: 1rem;
}

.mushaf-page {
  width: 100%;
  max-width: 800px;
  height: auto;
  border: 1px solid #e0dbc4;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #f5f0e1;
  border: 1px solid #d4c8a1;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
