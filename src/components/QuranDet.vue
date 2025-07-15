<template>
 <div class="sticky-top quran-navbar">
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center py-2">
      
      <!-- Home Button -->
      <router-link 
        to="/quran"
        class="nav-icon mx-2"
        v-tooltip="$t('home')"
      >
        <i class="bi bi-house-door"></i>
      </router-link>
      
      <!-- Translation Select -->
      <div v-if="transition.length" class="nav-select mx-2">
        <div class="select-wrapper">
          <i class="bi bi-translate select-icon"></i>
          <select
            v-model="selectedTranslation"
            @change="getSurah()"
            class="form-select"
          >
            <option
              v-for="(item, index) in transition"
              :key="index"
              :value="item.identifier"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Qari Select -->
      <div v-if="qoris.length" class="nav-select mx-2">
        <div class="select-wrapper">
          <i class="bi bi-mic select-icon"></i>
          <select
            v-model="selectedQaris"
            @change="getAudioQari(); getSurah()"
            class="form-select"
          >
            <option
              v-for="(item, index) in qoris"
              :key="index"
              :value="item.identifier"
            >
              {{ item.englishName }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Surahs Dropdown -->
      <div v-if="surahs.length" class="dropdown mx-2">
        <button
          class="nav-dropdown-btn"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-tooltip="$t('surahs')"
        >
          <i class="bi bi-book"></i>
          <span class="ms-1">{{ $t('surahs') }}</span>
        </button>
        <ul class="dropdown-menu surah-dropdown">
          <li v-for="(surah, index) in surahs" :key="index">
            <router-link
              :to="`/qurandet/${surah.number}`"
              class="dropdown-item d-flex align-items-center"
            >
              <span class="surah-number">{{ surah.number }}.</span>
              <span class="surah-name">{{ surah.englishName }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- Font Size Controls -->
      <div class="font-controls mx-2">
        <button
          @click="minusSize(); minusRu()"
          class="font-btn"
          v-tooltip="$t('decreaseFont')"
        >
          <i class="bi bi-dash-lg"></i>
        </button>
        <button
          @click="plusSize(); plusRu()"
          class="font-btn"
          v-tooltip="$t('increaseFont')"
        >
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  </div>
</div>

  <!-- Surah Content -->
  <div class="surah-container">
    <div v-if="!surahAr || !surahRu || !surahAudio" class="loading-spinner">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">{{ $t("loading") }}</span>
      </div>
    </div>

    <div v-else class="ayah-list">
      <div
        v-for="(item, index) in surahAr.ayahs"
        :key="item.number"
        class="ayah-card"
      >
        <!-- Header -->
        <div class="ayah-header">
          <div class="ayah-number">
            <img :src="AyahIcon" class="ayah-icon" alt="ayah icon" />
            <span class="number">{{ item.numberInSurah }}</span>
          </div>

          <!-- Audio -->
          <div v-if="loading" class="audio-skeleton-horizontal">
            <div class="controls-horizontal">
              <div class="play-pause-skeleton"></div>
              <div class="progress-skeleton"></div>
              <div class="time-skeleton"></div>
            </div>
          </div>
          <div v-else class="audio-player">
            <audio
              ref="audioRef"
              :src="surahAudio.ayahs[index].audio"
              controls
              class="custom-audio w-100"
              @timeupdate="updateProgress"
              @loadedmetadata="setDuration"
            >
              {{ $t("noAudioSupport") }}
            </audio>
          </div>
          <button
            class="btn btn-light"
            v-copy="`${surahRu.ayahs[index].text}\n\n${item.text}`"
          >
            <i class="bi bi-copy"></i>
          </button>
        </div>

        <!-- Arabic Ayah -->
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
          :id="`${route.params.selectedSurah}-${item.numberInSurah}`"
        >
          {{ item.text }}
        </div>

        <!-- Translation -->
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

        <!-- Separator -->
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

.quran-navbar {
  background: linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1030;
}

.nav-icon {
  color: #c9d6df;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.nav-icon:hover {
  background: rgba(201, 214, 223, 0.1);
  color: #0dff92;
  transform: translateY(-2px);
}

.nav-select {
  position: relative;
  min-width: 180px;
}

.select-wrapper {
  width: 150px;
  position: relative;
  display: flex;
  align-items: center;
}

.select-icon {
  position: absolute;
  left: 12px;
  color: #c9d6df;
  z-index: 2;
  pointer-events: none;
}

.form-select {
  background-color: rgba(13, 27, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f5f9;
  padding-left: 35px;
  height: 40px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.form-select:hover {
  border-color: rgba(13, 255, 146, 0.3);
}

.form-select:focus {
  border-color: #0dff92;
  box-shadow: 0 0 0 0.2rem rgba(13, 255, 146, 0.1);
  background-color: rgba(13, 27, 42, 0.9);
}

.nav-dropdown-btn {
  background: rgba(13, 27, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f5f9;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  height: 40px;
}

.nav-dropdown-btn:hover {
  background: rgba(13, 27, 42, 0.9);
  border-color: rgba(13, 255, 146, 0.3);
  color: #0dff92;
}

.surah-dropdown {
  background: rgba(13, 27, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 60vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin-top: 5px;
}

.dropdown-item {
  color: #f0f5f9;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(13, 255, 146, 0.1);
  color: #0dff92;
}

.surah-number {
  color: #0dff92;
  font-weight: bold;
  margin-right: 10px;
  min-width: 25px;
}

.surah-name {
  flex-grow: 1;
}

.font-controls {
  display: flex;
  gap: 5px;
}

.font-btn {
  background: rgba(13, 27, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f5f9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.font-btn:hover {
  background: rgba(13, 255, 146, 0.1);
  color: #0dff92;
  border-color: rgba(13, 255, 146, 0.3);
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-select {
    min-width: 150px;
  }
  
  .nav-dropdown-btn span {
    display: none;
  }
  
  .nav-dropdown-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    justify-content: center;
  }
}

</style>
