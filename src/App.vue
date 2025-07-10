<template>
  <div class="app">
    <!-- Шапка -->
    <header class="header bg-success text-white shadow mb-0">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center py-3">
         
          <img
            src="./assets/quaran-img.png"
            class=" rounded-circle"
            alt="Исламские источники"
            style="height: 60px; object-fit: contain"
          />
          <nav class="d-flex gap-4">
            <router-link to="/" class="text-white text-decoration-none"
              >Главная</router-link
            >
            <router-link to="/quran" class="text-white text-decoration-none"
              >Коран</router-link
            >
            <router-link to="/hadith" class="text-white text-decoration-none"
              >Хадисы</router-link
            >
            <router-link to="/duo" class="text-white text-decoration-none"
              >Дуа</router-link
            >
            <router-link to="/chatgpt" class="text-white text-decoration-none"
              >GPT</router-link
            >
          </nav>
        </div>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main bg-light min-vh-100 m-0 p-0">
      <div class="container-fluid m-0 p-0">
        <router-view></router-view>
      </div>
    </main>

    <!-- Подвал -->
    <footer class="footer bg-dark text-white py-4">
      <div class="container text-center">
        <p class="m-0">© 2025 Исламские Источники. Все права защищены.</p>
        <div class="mt-3">
          <a href="#" class="text-white mx-2"><i class="bi bi-telegram"></i></a>
          <a href="#" class="text-white mx-2"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-white mx-2"
            ><i class="bi bi-instagram"></i
          ></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Шрифт для арабского текста */
@import url("https://fonts.googleapis.com/css2?family=Amiri&display=swap");

.arabic-text {
  font-family: "Amiri", serif;
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: right;
  direction: rtl;
}
/* Скроллбар умумий стили */
::-webkit-scrollbar {
  width: 10px; /* Скроллбарнинг кенглиги */
  height: 10px; /* Горизонтал скроллбар баландлиги */
}

/* Скроллбар йўли (фон) */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* Орқа фон ранги */
  border-radius: 5px;
}

/* Скроллбарнинг ўзи (ҳаракатланувчи қисм) */
::-webkit-scrollbar-thumb {
  background: #198754; /* Скроллбар ранги */
  border-radius: 5px;
}

/* Скроллбарни ҳовер қилганда */
::-webkit-scrollbar-thumb:hover {
  background: #198754;
}

/* Анимация переходов между страницами */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
