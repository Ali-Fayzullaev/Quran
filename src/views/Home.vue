<template>
    <div class="home-page">
      <div class="hero-section bg-success text-white py-5 mb-5">
        <div class="container text-center">
          <h1 class="display-1 fw-light  mb-3 arabic-text text-center">بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
          <p class="lead">Коран, хадисы и дуа в одном месте</p>
        </div>
      </div>
  
      <div class="container">
        <div class="row g-4 mb-5">
          <div class="col-md-4">
            <div class="card shadow-sm h-100 border-success">
              <div class="card-body text-center">
                <i class="bi bi-book fs-1 text-success mb-3"></i>
                <h3 class="card-title">Священный Коран</h3>
                <p class="card-text">Читайте и понимайте слова Аллаха</p>
                <router-link to="/quran" class="btn btn-outline-success">Перейти к Корану</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-sm h-100 border-success">
              <div class="card-body text-center">
                <i class="bi bi-chat-quote fs-1 text-success mb-3"></i>
                <h3 class="card-title">Хадисы</h3>
                <p class="card-text">Познакомьтесь с хадисами Пророка (мир ему)</p>
                <router-link to="/hadith" class="btn btn-outline-success">Перейти к хадисам</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-sm h-100 border-success">
              <div class="card-body text-center">
                <i class="bi bi-hand-index-thumb fs-1 text-success mb-3"></i>
                <h3 class="card-title">Мольбы (Дуа)</h3>
                <p class="card-text">Изучайте ежедневные молитвы и дуа</p>
                <router-link to="/duo" class="btn btn-outline-success">Перейти к дуа</router-link>
              </div>
            </div>
          </div>
        </div>
  
        <div class="card shadow-sm mb-5">
          <div class="card-body">
            <h3 class="text-success mb-4">Хадис дня</h3>
            <div class="arabic-text mb-3">{{ dailyHadith.arabic }}</div>
            <p class="mb-2">{{ dailyHadith.text }}</p>
            <div class="text-muted">
              <small>{{ dailyHadith.reference }}</small>
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
        dailyHadith: {
          arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
          text: "Тот, кто отправляется на путь в поисках знания, Аллах облегчит ему путь в Рай.",
          reference: "Сахих Муслим"
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .hero-section {
    background: linear-gradient(#198754, rgba(0, 0, 0, 0.7)), 
                url('https://images.unsplash.com/photo-1561768033-7e924a619476?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 0 0 20px 20px;
  }
  </style>
  