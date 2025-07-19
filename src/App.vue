<template>
  <div class="app">
    <!-- Шапка -->
    <header class="header bg-success text-white shadow mb-0">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center py-2 py-md-3">
          <div class="d-flex align-items-center">
            <img
              src="./assets/quaran-img.png"
              class="rounded-circle me-2"
              alt="Исламские источники"
              style="height: 50px; object-fit: contain"
            />
            <span class="d-none d-sm-inline fs-5 fw-bold">Quran & Hadith</span>
          </div>

          <!-- Кнопка меню для мобильных -->
          <button
            class="btn btn-light d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i class="bi bi-list"></i>
          </button>

          <!-- Основная навигация (скрыта на мобильных) -->
          <div class="d-none d-md-flex align-items-center gap-3">
            <nav class="d-flex gap-3 gap-md-4 align-items-center">
              <router-link
                to="/"
                v-tooltip="'Главная'"
                class="text-white text-decoration-none"
                >{{ $t("home") }}</router-link
              >
              <router-link
                to="/quran"
                v-tooltip="'Коран'"
                class="text-white text-decoration-none"
                >{{ $t("quran") }}</router-link
              >
              <router-link
                to="/hadith"
                v-tooltip="'Хадисы'"
                class="text-white text-decoration-none"
                >{{ $t("hadith") }}</router-link
              >
              <router-link
                to="/duo"
                v-tooltip="'Дуа'"
                class="text-white text-decoration-none"
                >{{ $t("duo") }}</router-link
              >
              <router-link
                to="/quranpage"
                v-tooltip="'Quran Page'"
                class="text-white text-decoration-none"
                >{{ $t("QuranPage") }}</router-link
              >
            </nav>

            <!-- Языковой переключатель -->
            <div class="language-switcher dropdown">
              <button
                class="btn btn-outline-light border-0 dropdown-toggle d-flex align-items-center"
                type="button"
                id="langDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="flag-icon me-1">{{ currentFlag }}</span>
                <span class="d-none d-sm-inline">{{ currentLanguage }}</span>
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="langDropdown"
              >
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="#"
                    @click="setLang('ru')"
                  >
                    <span class="flag-icon me-2">🇷🇺</span>
                    <span>Русский</span>
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="#"
                    @click="setLang('en')"
                  >
                    <span class="flag-icon me-2">🇬🇧</span>
                    <span>English</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Offcanvas меню -->
    <div
      class="offcanvas offcanvas-end bg-light"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">
          Меню
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <div class="list-group list-group-flush">
          <router-link
            to="/"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-house-door me-3"></i>
            {{ $t("home") }}
          </router-link>
          <router-link
            to="/quran"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-book me-3"></i>
            {{ $t("quran") }}
          </router-link>
          <router-link
            to="/hadith"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-journal-text me-3"></i>
            {{ $t("hadith") }}
          </router-link>
          <router-link
            to="/duo"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-chat-heart me-3"></i>
            {{ $t("duo") }}
          </router-link>
          <router-link
            to="/quranpage"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-file-earmark-text me-3"></i>
            {{ $t("QuranPage") }}
          </router-link>
        </div>

        <div class="p-3 mt-auto">
          <h6 class="mb-3">Язык / Language</h6>
          <div class="d-grid gap-2">
            <button
              class="btn btn-outline-success d-flex align-items-center justify-content-center"
              @click="setLang('ru')"
              data-bs-dismiss="offcanvas"
            >
              <span class="flag-icon me-2">🇷🇺</span>
              <span>Русский</span>
            </button>
            <button
              class="btn btn-outline-success d-flex align-items-center justify-content-center"
              @click="setLang('en')"
              data-bs-dismiss="offcanvas"
            >
              <span class="flag-icon me-2">🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <main class="main bg-light min-vh-100 m-0 p-0">
      <div class="container-fluid m-0 p-0">
        <router-view></router-view>
      </div>
    </main>

     <!-- Чат-контейнер -->
     <div class="chat-container-app" :class="{ active: openChat }">
      <transition name="slide-up">
        <div v-if="openChat" class="chat-wrapper-app show">
          <ChatGPT @keydown.esc="openChat = false" @close="openChat = false" />
        </div>
      </transition>

      <!-- Кнопка (Vue template ичида) -->
      <button
        ref="draggable"
        class="chat-toggle-btn btn btn-success rounded-circle shadow-lg"
        :class="{ 'd-none': openChat }"
        @click="handleClick"
        @mousedown="startDrag"
      >
        <i class="bi bi-chat-dots"></i>
      </button>
    </div>

    <!-- Подвал -->
    <footer class="footer bg-dark text-white py-4">
      <div class="container text-center">
        <p class="m-0">{{ $t("copyright") }}</p>
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
import ChatGPT from "./components/ChatGPT.vue";

export default {
  components: { ChatGPT },
  data() {
    return {
      openChat: false,
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
    };
  },
  name: "App",
  computed: {
    currentFlag() {
      return this.$i18n.locale === "ru" ? "🇷🇺" : "🇬🇧";
    },
    currentLanguage() {
      return this.$i18n.locale === "ru" ? "Русский" : "English";
    },
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.global.locale = lang;
      localStorage.setItem("locale", lang);
      console.log(lang)
    },
    setLang(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("locale", lang)
    },
    startDrag(e) {
      const btn = this.$refs.draggable;
      this.isDragging = false; // default false

      this.offsetX = e.clientX - btn.getBoundingClientRect().left;
      this.offsetY = e.clientY - btn.getBoundingClientRect().top;

      // event қўшамиз
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },

    onDrag(e) {
      const btn = this.$refs.draggable;
      this.isDragging = true; // суриш бошланди деб белгилаймиз

      const x = e.clientX - this.offsetX;
      const y = e.clientY - this.offsetY;

      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    },

    stopDrag() {
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);

      // Кечиктирилган равишда isDragging'ни false қиламиз
      setTimeout(() => {
        this.isDragging = false;
      }, 50);
    },

    handleClick() {
      if (!this.isDragging) {
        this.openChat = true;
      }
    },
  },
};
</script>

<style scoped>
/* Стили для чат-контейнера */
.chat-container-app {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}

.chat-wrapper-app {
  width: 450px;
  max-width: 90vw;
  height: 500px;
  max-height: 80vh;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  background: white;
  display: flex;
  flex-direction: column;
}
.chat-toggle-btn {
  cursor: grab;
  user-select: none;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001;
  animation: pop-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition: transform 0.3s ease, box-shadow 0.3s, background-color 0.3s;
  box-shadow: 0 5px 15px rgba(0, 100, 0, 0.3);
}

.chat-toggle-btn:hover {
  transform: scale(1.15) rotate(5deg);
  background-color: #45a049;
  box-shadow: 0 10px 25px rgba(0, 150, 0, 0.5);
}

.chat-toggle-btn:active {
  cursor: grabbing;
}
/* Пайдо бўлиш анимацияси */
@keyframes pop-in {
  0% {
    transform: scale(0.3) rotate(-20deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.1) rotate(5deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0);
  }
}

/* Пульс эффекти (икона учун) */
.chat-toggle-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(76, 175, 80, 0.5);
  border-radius: 50%;
  animation: pulse 3s infinite;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Зўр анимация: енгил силжиш, озгина масштаб ва шаффофлик */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); /* soft ease-out */
  will-change: transform, opacity;
}

.slide-up-enter-from {
  transform: translateY(100%) scale(0.9);
  opacity: 0;
}
.slide-up-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.slide-up-leave-to {
  transform: translateY(100%) scale(0.9);
  opacity: 0;
}

/* Для мобильных устройств */
@media (max-width: 768px) {
  .chat-container-app {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    align-items: stretch;
    justify-content: flex-end;
    padding: 0;
    gap: 0;
    pointer-events: none; /* Разрешаем клики сквозь контейнер */
  }

  .chat-wrapper-app {
    width: 100%;
    height: 80vh;
    max-height: 80vh;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.2);
    pointer-events: auto; /* Разрешаем клики только в самом чате */
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .chat-wrapper-app.show {
    transform: translateY(0);
  }

  .chat-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1001;
    pointer-events: auto; /* Кнопка всегда кликабельна */
  }

  /* Когда чат открыт - затемняем фон сильнее */
  .chat-container-app.active {
    background: rgba(0, 0, 0, 0.5);
  }
}

/* Стили для языкового переключателя */
.arabic-text {
  font-family: "Amiri", serif;
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: right;
  direction: rtl;
}

.btn-lang {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-lang:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
}

.dropdown-menu {
  border: none;
  z-index: 10000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #198754;
}

.dropdown-item.active {
  background: #198754;
  color: white;
}

.flag-icon {
  font-size: 1.2em;
}

/* Адаптивность для мобильных */
@media (max-width: 576px) {
  .btn-lang {
    padding: 0.35rem;
    min-width: 36px;
  }

  .btn-lang .d-none {
    display: none !important;
  }

  .dropdown-menu {
    min-width: 120px;
  }

  .header .container {
    padding: 0 15px;
  }

  .header nav {
    gap: 10px;
    font-size: 0.9rem;
  }
}
.offcanvas-end {
  width: 300px;
  border-left: none;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
}

.offcanvas-header {
  padding: 1.2rem 1.5rem;
  background-color: #f8f9fa;
}

.list-group-item {
  border-left: 0;
  border-right: 0;
  font-size: 1.1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.list-group-item-action:hover {
  background-color: #e9f5e9;
  padding-left: 20px;
}

.list-group-item i {
  font-size: 1.3rem;
  width: 24px;
  text-align: center;
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .header {
    position: sticky;
    top: 0;
    z-index: 1030;
  }
  
  .chat-toggle-btn {
    bottom: 70px;
  }
  
  .offcanvas-body {
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
  }
  
  .chat-wrapper-app {
    height: 70vh;
  }
}

/* Улучшаем видимость активных ссылок */
.router-link-exact-active {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754 !important;
  font-weight: 500;
  border-left: 3px solid #198754;
}

/* Улучшаем кнопки в Offcanvas */
.btn-outline-success {
  transition: all 0.3s;
}

.btn-outline-success:hover {
  background-color: #198754;
  color: white !important;
}

/* Анимация открытия Offcanvas */
.offcanvas {
  transition: transform 0.4s ease-in-out;
}

</style>
