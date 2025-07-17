<template>
  <div class="quran-page">
    <!-- Поисковая строка -->
    <div class="row my-4 d-flex justify-content-center">
      <div class="col-10"  >
        <input
          v-model.trim="keyword"
          @input="handleSearchInput"
          :placeholder="$t('searchPlaceholder')"
          class="form-control my-3"
        />

        <div v-if="searchInProgress" class="text-center my-3">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">{{ $t("loading") }}</span>
          </div>
        </div>

        <div v-else-if="filteredAyahs.length === 0 && keyword">
          <p class="text-muted">{{ $t("notFound") }}</p>
        </div>

        <div v-else-if="filteredAyahs.length > 0">
          <div class="alert alert-success">
            {{ $t('ayahFound') }} {{ filteredAyahs.length }}
          </div>
          <div
            v-for="(ayah, index) in filteredAyahs"
            :key="index"
            class="mb-3 p-3 border-bottom"
          >
            <strong>{{ ayah.chapter }} : {{ ayah.verse }}</strong>
            <router-link
              class="link-underline link-underline-opacity-0"
              :to="`/qurandet/${ayah.chapter}#${ayah.chapter}-${ayah.verse}`"
            >
              <p class="fs-5 arabic-text">{{ ayah.text }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Список сур -->
    <div class="card shadow-sm container">
      <div class="card-body">
        <h5 class="card-title text-success">{{ $t("surahList") }}</h5>
        <div class="row">
          <div
            class="col-md-4 mb-3"
            v-for="surah in surahs"
            :key="surah.number"
          >
            <router-link
              :to="`/qurandet/${surah.number}`"
              class="surah-card text-decoration-none"
            >
              <div
                class="p-3 border border-success rounded hover-shadow transition-all"
              >
                <div class="d-flex align-items-center">
                  <div class="surah-number me-3">
                    <span
                      class="badge bg-success text-white rounded-circle fs-6"
                      >{{ surah.number }}</span
                    >
                  </div>
                  <div class="surah-info flex-grow-1">
                    <h6 class="fw-bold mb-1 text-dark">{{ surah.name }}</h6>
                    <small class="text-muted d-block">{{
                      surah.englishName
                    }}</small>
                    <small class="text-muted d-block">
                      {{ surah.englishNameTranslation }} •
                      {{ surah.numberOfAyahs }} {{ $t("ayah") }}
                    </small>
                  </div>
                  <div class="surah-arabic ms-2">
                    <span class="arabic-text fs-4">{{
                      surah.name.split(" ")[0]
                    }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuranDet from "@/components/QuranDet.vue";

export default {
  data() {
    return {
      surahs: [],
      ayahsSearch: [], // Инициализируем как массив
      keyword: "",
      searchInProgress: false,
      searchCache: new Map(),
      debounceTimer: null,
      _filteredAyahs: [], // Добавляем для computed свойства
      searchIndex: [], // Добавляем для поискового индекса
    };
  },
  created() {
    this.fetchQuran();
  },
  mounted() {
    this.fetchSurahs();
  },
  methods: {
    scrollToAyah(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    async fetchSurahs() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await response.json();
        this.surahs = data.data;
      } catch (error) {
        console.error("Не удалось загрузить суры:", error);
      }
    },

    async fetchQuran() {
      try {
        const res = await fetch("/quran.json");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        this.ayahsSearch = Array.isArray(data.quran)
          ? data.quran
          : Array.isArray(data)
          ? data
          : []; // Защита от не-массивов

        if (this.ayahsSearch.length > 0) {
          this.prepareSearchData();
        }
      } catch (error) {
        console.error("Failed to load Quran:", error);
        this.ayahsSearch = [];
      }
    },

    prepareSearchData() {
      this.searchIndex = this.ayahsSearch.map((ayah) => ({
        ...ayah,
        normalizedText: this.normalizeArabic(ayah.text || ""),
      }));
    },

    normalizeArabic(text) {
      if (!text) return "";
      return text
        .normalize("NFD")
        .replace(/[\u064B-\u0652\u0670]/g, "")
        .replace(/[أإآ]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .replace(/[^\u0600-\u06FF\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    },

    handleSearchInput() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.searchAyahs();
      }, 300);
    },

    searchAyahs() {
      if (!this.keyword) {
        this._filteredAyahs = [];
        return;
      }

      if (this.searchCache.has(this.keyword)) {
        this._filteredAyahs = this.searchCache.get(this.keyword);
        return;
      }

      this.searchInProgress = true;

      try {
        const normKeyword = this.normalizeArabic(this.keyword);
        const results = this.searchIndex.filter((ayah) =>
          ayah.normalizedText.includes(normKeyword)
        );

        this.searchCache.set(this.keyword, results);
        this._filteredAyahs = results;
      } catch (error) {
        console.error("Search error:", error);
        this._filteredAyahs = [];
      } finally {
        this.searchInProgress = false;
      }
    },
  },

  computed: {
    filteredAyahs() {
      return this._filteredAyahs || [];
    },
  },
};
</script>
<style scoped>
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.surah-card {
  display: block;
  margin-bottom: 1rem;
}

.surah-card:hover .hover-shadow {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(25, 135, 84, 0.1);
}

.transition-all {
  transition: all 0.3s ease;
}

.surah-number .badge {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arabic-text {
  font-family: "Amiri", serif;
  color: #2e7d32;
  direction: rtl;
  text-align: right;
  line-height: 2;
}

.hover-shadow {
  transition: all 0.3s ease;
  border: 1px solid rgba(46, 125, 50, 0.3);
}

.hover-shadow:hover {
  border-color: rgba(46, 125, 50, 0.7);
  background-color: rgba(46, 125, 50, 0.05);
}

.search-result-item {
  transition: all 0.2s ease;
}

.search-result-item:hover {
  background-color: rgba(46, 125, 50, 0.05);
}
</style>
