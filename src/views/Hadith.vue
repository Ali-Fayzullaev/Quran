<template>
  <div class="hadith-page">
    <div class="text-center mb-5">
      <h2 class="fw-bold text-success">Хадисы Пророка (с.а.в)</h2>
      <p class="text-muted">Хадисы Мухаммада (мир ему)</p>
    </div>

    <div class="mb-4">
      <select v-model="selectedBook" class="form-select" @change="fetchHadiths">
        <option value="" disabled>Выберите сборник</option>
        <option v-for="book in books" :key="book.id" :value="book.id">
          {{ book.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else>
      <div v-for="hadith in hadiths" :key="hadith.id" class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="arabic-text mb-3">{{ hadith.arabic }}</div>
          <p class="mb-2">{{ hadith.text }}</p>
          <div class="d-flex justify-content-between text-muted">
            <small>Сборник: {{ hadith.book }}</small>
            <small>Передатчик: {{ hadith.narrator }}</small>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center mt-4">
        <button 
          @click="loadMore" 
          class="btn btn-success"
          :disabled="loadingMore"
        >
          <span v-if="loadingMore" class="spinner-border spinner-border-sm me-2"></span>
          Загрузить ещё
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { id: 'bukhari', name: 'Сахих аль-Бухари' },
        { id: 'muslim', name: 'Сахих Муслим' },
        { id: 'tirmidhi', name: 'Сунан ат-Тирмизи' },
        { id: 'abudawud', name: 'Сунан Абу Дауд' }
      ],
      selectedBook: '',
      hadiths: [],
      loading: false,
      loadingMore: false,
      currentPage: 1
    }
  },
  methods: {
    async fetchHadiths() {
      if (!this.selectedBook) return
      
      this.loading = true
      this.hadiths = []
      this.currentPage = 1
      
      try {
        const response = await fetch(
          `https://ahadith-api.herokuapp.com/api/${this.selectedBook}/${this.currentPage}/20`
        )
        const data = await response.json()
        this.hadiths = data.Hadiths || []
      } catch (error) {
        console.error('Не удалось загрузить хадисы:', error)
      } finally {
        this.loading = false
      }
    },
    async loadMore() {
      this.loadingMore = true
      this.currentPage++
      
      try {
        const response = await fetch(
          `https://ahadith-api.herokuapp.com/api/${this.selectedBook}/${this.currentPage}/20`
        )
        const data = await response.json()
        this.hadiths = [...this.hadiths, ...(data.Hadiths || [])]
      } catch (error) {
        console.error('Не удалось загрузить дополнительные хадисы:', error)
      } finally {
        this.loadingMore = false
      }
    }
  }
}
</script>
