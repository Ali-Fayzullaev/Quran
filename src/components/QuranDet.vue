<template>
  <div class="m-0 p-0 sticky-top container-fluid w-100">
    <div class="row m-0">
      <div class="col-12 bg-dark">
        <!-- Horizontal under breakpoint -->
        <ul
          class="list-group list-group-horizontal-sm d-flex justify-content-center p-0"
        >
          <!-- Home -->
          <li
            class="list-group-item bg-dark text-white rounded-0 d-flex align-items-center border-0"
          >
            <router-link
              class="link-light link-offset-2 link-underline-opacity-0"
              to="/quran"
            >
              <span class="custom-color">
                <i class="bi bi-house-door-fill me-2"></i> Главная
              </span>
            </router-link>
          </li>

          <!-- Переводчик (select) -->
          <li
            v-if="transition.length"
            class="list-group-item bg-dark text-white rounded-0 my-0 border-top-0 border-bottom-0 border-1 border-secondary"
          >
            <div class="form-group px-3">
              <select
                id="translationSelect"
                v-model="selectedTranslation"
                class="form-select bg-dark border-0 text-white border-secondary rounded-0 custom-select-style"
                style="max-height: 300px; max-width: 200px; overflow-y: auto"
                @change="getSurah()"
              >
                <option
                  v-for="(item, index) in transition"
                  :key="index"
                  :value="item.identifier"
                >
                  {{ index + 1 }}. {{ item.name }}
                </option>
              </select>
            </div>
          </li>
          <!-- Переводчик (select) -->
          <li
            v-if="qoris.length"
            class="list-group-item bg-dark text-white rounded-0 my-0 border-top-0 border-bottom-0 border-1 border-secondary"
          >
            <div class="form-group px-3">
              <select
                id="translationSelect"
                v-model="selectedQaris"
                class="form-select bg-dark border-0 text-white border-secondary rounded-0 custom-select-style"
                style="max-height: 300px; max-width: 200px; overflow-y: auto"
                @change="getAudioQari(), getSurah()"
              >
                <option
                  v-for="(item, index) in qoris"
                  :key="index"
                  :value="item.identifier"
                >
                  {{ index + 1 }}. {{ item.englishName }}
                </option>
              </select>
            </div>
          </li>

          <!-- Суры -->
          <li
            v-if="surahs.length"
            class="list-group-item bg-dark text-white rounded-0 my-0 border-top-0 border-bottom-0 border-1 border-secondary"
          >
            <div class="dropdown">
              <button
                class="btn btn-dark dropdown-toggle custom-color"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Суры:
              </button>
              <ul
                class="dropdown-menu bg-dark rounded-0 overflow-auto"
                style="max-height: 300px"
              >
                <li v-for="(surah, index) in surahs" :key="index">
                  <router-link
                    :to="`/qurandet/${surah.number}`"
                    class="dropdown-item custom-color bg-dark rounded-0"
                  >
                    <span class="ms-0 me-1">{{ surah.number }}.</span>
                    {{ surah.englishName }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <!-- Размер шрифта -->
          <li
            class="list-group-item bg-dark text-white rounded-0 border-0 d-flex align-items-center"
          >
            <span class="me-2 custom-color">Размер шрифта</span>
            <button
              @click="minusSize(), minusRu()"
              class="btn btn-light py-0 px-2 rounded-end-0 custom-btn"
            >
              <i class="bi bi-dash"></i>
            </button>
            <button
              @click="plusSize(), plusRu()"
              class="btn btn-light py-0 px-2 rounded-start-0 custom-btn"
            >
              <i class="bi bi-plus"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="surah-container">
    <!-- Юкланмоқда спинер -->
    <div v-if="!surahAr || !surahRu || !surahAudio" class="loading-spinner">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Юкланмоқда...</span>
      </div>
    </div>

    <!-- Асосий контент -->
    <div v-else class="ayah-list">
      <!-- Ҳар бир оят учун карта -->
      <div
        v-for="(item, index) in surahAr.ayahs"
        :key="item.number"
        class="ayah-card"
      >
        <!-- Оят рақами ва аудио -->
        <div class="ayah-header">
          <div class="ayah-number">
            <img :src="AyahIcon" class="ayah-icon" alt="ayah icon" />
            <span class="number">{{ item.numberInSurah }}</span>
          </div>

          <!-- 🎧 Прогресс-бар (Юкланаётганда кўринади) -->
          <div v-if="loading" class="audio-skeleton-horizontal">
            <div class="controls-horizontal">
              <!-- Play/Skip кнопкалар учун жой -->
              <div class="play-pause-skeleton"></div>
              <!-- Прогресс-бар -->
              <div class="progress-skeleton"></div>
              <!-- Вақт кўрсаткичи -->
              <div class="time-skeleton"></div>
            </div>
          </div>

          <!-- Аудио плеер (после загрузки) -->
          <div v-else class="audio-player">
            <audio
              ref="audioRef"
              :src="surahAudio.ayahs[index].audio"
              controls
              class="custom-audio w-100"
              @timeupdate="updateProgress"
              @loadedmetadata="setDuration"
            >
              Ваш браузер не поддерживает аудио элемент
            </audio>
          </div>
        </div>

        <!-- 📖 Арабча матн -->
        <div v-if="loading" class="px-3">
          <span class="placeholder-glow">
            <span
              class="placeholder col-10 bg-success mb-2 rounded"
              style="height: 28px; display: block"
            ></span>
            <span
              class="placeholder col-8 bg-success rounded"
              style="height: 28px; display: block"
            ></span>
          </span>
        </div>
        <div
        v-else
          class="arabic-text lh-lg"
          :style="{ fontSize: fontSize + 'px' }"
          :id="`${route.params.selectedSurah}${item.numberInSurah}`"
        >
          {{ item.text }}
        </div>

        <!-- 🌍 Таржима -->
        <div v-if="loading" class="px-3 mt-2">
          <span class="placeholder-glow">
            <span
              class="placeholder col-12 bg-success mb-2 rounded"
              style="height: 20px; display: block"
            ></span>
            <span
              class="placeholder col-9 bg-success mb-2 rounded"
              style="height: 20px; display: block"
            ></span>
            <span
              class="placeholder col-6 bg-success rounded"
              style="height: 20px; display: block"
            ></span>
          </span>
        </div>

        <div
          v-else
          class="translation-text"
          :style="{ fontSize: fontTrun + 'px' }"
        >
          {{ surahRu.ayahs[index].text }}
        </div>

        <!-- Оятлар ўртасидаги ажратиш чизиғи -->
        <div class="ayah-separator"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import AyahIcon from "../assets/ayah-icon.svg";

const route = useRoute();

const surahAr = ref(null);
const surahRu = ref(null);
const surahAudio = ref(null);
const surahs = ref([]);
const transition = ref([]);
const selectedTranslation = ref("ru.kuliev");
const selectedQaris = ref("ar.husary");
const qoris = ref([]);
const fontSize = ref(30);
const fontTrun = ref(20);
const loading = ref(false);

const plusSize = () => {
  if (fontSize.value <= 50) {
    fontSize.value += 2;
  }
};
const minusSize = () => {
  if (fontSize.value >= 17) {
    fontSize.value -= 2;
  }
};

const plusRu = () => {
  if (fontTrun.value <= 30) {
    fontTrun.value += 2;
  }
};
const minusRu = () => {
  if (fontTrun.value >= 15) {
    fontTrun.value -= 1;
  }
};

const getSurah = async () => {
  try {
    loading.value = true;
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${route.params.selectedSurah}/editions/quran-uthmani,${selectedTranslation.value},${selectedQaris.value}`
    );
    const data = await res.json();

    surahAr.value = data.data[0];
    surahRu.value = data.data[1];
    surahAudio.value = data.data[2];

    // Сура юкланганидан кейин hash'га скролл қилиш
    await nextTick();
    scrollToHash();
  } catch (error) {
    console.error("Хатолик юз берди:", error);
  } finally {
    loading.value = false;
  }
};

const getSurahList = async () => {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah`);
    const data = await res.json();
    surahs.value = data.data;
  } catch (error) {
    console.log("Ошибка", error);
  }
};

const getTransition = async () => {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/edition`);
    const data = await res.json();
    transition.value = data.data;
  } catch (error) {
    console.error("Ошибка", error);
  }
};

const getAudioQari = async () => {
  try {
    const res = await fetch(
      "https://api.alquran.cloud/v1/edition?format=audio"
    );
    const data = await res.json();
    qoris.value = data.data;
  } catch (error) {
    console.error("Ошибка!", error);
  }
};

const scrollToHash = () => {
  const hash = route.hash?.replace("#", "");
  if (!hash) return;

  const tryScroll = (retries = 10) => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (retries > 0) {
      setTimeout(() => tryScroll(retries - 1), 2500); 
    }
  };

  tryScroll(); 
};

onMounted(() => {
  getSurah();
  getSurahList();
  getTransition();
  getAudioQari();
});

watch(
  () => route.params.selectedSurah,
  () => {
    getSurah();
  }
);
</script>

<style scoped>
/* Умумий стиллар */
.surah-container {
  max-width: 850px;
  margin: 0 auto;
  padding: 1rem;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

/* Оят картаси стиллари */
.ayah-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.ayah-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Оят рақами стиллари */
.ayah-number {
  position: relative;
  width: 40px;
  height: 40px;
}

.ayah-icon {
  width: 100%;
  height: 100%;
}

.ayah-number .number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: bold;
  color: #2e7d32;
  background-color: rgba(255, 255, 255, 0.8);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Аудио плеер стиллари */
.audio-player {
  flex-grow: 1;
  margin-left: 1rem;
}

.custom-audio {
  width: 100%;
  height: 40px;
}

.custom-audio::-webkit-media-controls-panel {
  background-color: #f8f9fa;
  border-radius: 20px;
}

/* Матн стиллари */
.arabic-text {
  font-family: "Amiri", "Scheherazade", serif;
  font-size: 1.8rem;
  line-height: 3rem;
  text-align: right;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  direction: rtl;
}

.translation-text {
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 600;
  color: #48a48d;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-right: 4px solid #2e7d32;
}

/* Ажратиш чизиғи */
.ayah-separator {
  height: 1px;
  background: linear-gradient(90deg, transparent, #2e7d32, transparent);
  margin: 1.5rem 0 0;
}

/* Мобил версия учун адаптив стиллар */
@media (max-width: 768px) {
  .surah-container {
    padding: 0.5rem;
  }

  .ayah-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .arabic-text {
    font-size: 1.5rem;
    line-height: 2.5rem;
  }

  .translation-text {
    font-size: 1rem;
  }

  .ayah-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .audio-player {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
}

.custom-color {
  color: white;
}
.custom-color:hover {
  color: #0dff92;
}
.custom-btn {
  background-color: white;
}
.custom-btn:hover {
  background-color: #0db268;
  color: white;
  border: 2px solid #0db268;
}

.bb {
  border: 2px solid red;
}
.custom-select-style:focus {
  border-color: #0db268;
  box-shadow: 0 0 0 0.2rem rgba(13, 178, 104, 0.25);
}

.audio-skeleton-horizontal {
  width: 100%; /* Эни тўлиқ қоплайди */
  height: 40px; /* Паст (кисқа) баландлик */
  padding: 8px;
  margin-left: 20px;
  background: #f5f5f5;
  border-radius: 6px;
}

.controls-horizontal {
  display: flex;
  align-items: center;
  gap: 10px;
}

.play-pause-skeleton {
  width: 24px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.progress-skeleton {
  flex-grow: 1; /* Қолган жойни тўлдиради */
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  animation: pulse 1.5s infinite;
}

.time-skeleton {
  width: 40px;
  height: 14px;
  background: #e0e0e0;
  border-radius: 3px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.7;
  }
}
</style>
