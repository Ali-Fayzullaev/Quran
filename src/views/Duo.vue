<template>
  <div class="duo-page">
    <div class="text-center mb-5">
      <h2 class="fw-bold text-success">Исламские Мольбы (Дуа)</h2>
      <p class="text-muted">Ежедневные дуа</p>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4" v-for="duo in duos" :key="duo.id">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="arabic-text mb-3">{{ duo.arabic }}</div>
            <h5 class="card-title text-success">{{ duo.title }}</h5>
            <p class="card-text">{{ duo.translation }}</p>
            <div class="text-muted">
              <small>{{ duo.context }}</small>
            </div>
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
      duos: [
        {
          id: 1,
          title: "Мольба перед сном",
          arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
          translation: "О Аллах, во имя Твоё я умираю и оживаю.",
          context: "Бухари, Муслим"
        },
        {
          id: 2,
          title: "Мольба при пробуждении",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
          translation: "Хвала Аллаху, Который оживил нас после того, как умертвил, и к Нему возвращение.",
          context: "Бухари"
        },
        // Дополнительные дуа...
      ]
    }
  }
}
</script>
