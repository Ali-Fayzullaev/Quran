<template>
  <div class="home-page">
    <div class="hero-section bg-success text-white py-5 mb-5">
      <div class="container text-center">
        <h1 class="display-1 fw-light mb-3 arabic-text text-center">
          بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>
        <p class="lead">{{ $t("allInOne") }}</p>
      </div>
    </div>

    <div class="container">
      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="card shadow-sm h-100 border-success">
            <div class="card-body text-center">
              <i class="bi bi-book fs-1 text-success mb-3"></i>
              <h3 class="card-title">{{ $t("quranTitle") }}</h3>
              <p class="card-text">{{ $t("quranText") }}</p>
              <router-link to="/quran" class="btn btn-outline-success">{{
                $t("quranBtn")
              }}</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm h-100 border-success">
            <div class="card-body text-center">
              <i class="bi bi-chat-quote fs-1 text-success mb-3"></i>
              <h3 class="card-title">{{ $t("hadithTitle") }}</h3>
              <p class="card-text">{{ $t("hadithText") }}</p>
              <router-link to="/hadith" class="btn btn-outline-success">{{
                $t("hadithBtn")
              }}</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm h-100 border-success">
            <div class="card-body text-center">
              <i class="bi bi-hand-index-thumb fs-1 text-success mb-3"></i>
              <h3 class="card-title">{{ $t("duaTitle") }}</h3>
              <p class="card-text">{{ $t("duaText") }}</p>
              <router-link to="/duo" class="btn btn-outline-success">{{
                $t("duaBtn")
              }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card shadow-sm mb-5">
            <div class="card-body">
              <h3 class="text-success mb-4">{{ $t("hadithOfTheDay") }}</h3>
              <div class="arabic-text mb-3">{{ dailyHadith.arabic }}</div>
              <div class="text-muted">
                <small>{{ dailyHadith.reference }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div
            class="card shadow-sm mb-4 border-0"
            style="border-radius: 15px; border: 1px solid rgba(0, 160, 83, 0.2)"
          >
            <div
              class="card-header text-white text-center p-3"
              style="
                background: linear-gradient(135deg, #00b09b, #96c93d);
                border-radius: 15px 15px 0 0 !important;
              "
            >
              <div
                v-if="louding"
                class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style="
                  background: rgba(255, 255, 255, 0.3);
                  z-index: 10;
                  border-radius: 14px 14px 0 0;
                "
              >
                <div
                  class="loader"
                  role="status"
                  style="width: 1.5rem; height: 1.5rem"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="input-group input-group-sm">
                <button
                  @click="getLocationByIP()"
                  class="input-group-text bg-white border-0"
                >
                <i class="bi bi-pin-map-fill text-success"></i>
                </button>
                <input
                  v-model="city"
                  @keyup.enter="getCity(), getTimePray()"
                  type="text"
                  class="form-control border-0 py-2"
                  :placeholder="$t('locationPlaceholder')"
                  style="font-size: 0.9rem"
                />
                <button
                  @click="getCity(), getTimePray()"
                  class="btn btn-success border-0 px-3"
                  style="background: #008a5e; font-size: 0.9rem"
                >
                  <i class="bi bi-search me-1"></i>{{ $t("find") }}
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="row g-0">
                <div
                  class="col-4 text-center p-2 border-end border-bottom prayer-time-card-sm"
                >
                  <div
                    class="prayer-icon-sm bg-success bg-opacity-10 text-success"
                  >
                    <i class="bi bi-cloud-moon-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">
                    {{ $t("fajr") }}
                  </div>
                  <div class="text-muted fs-7">{{ fajr }}</div>
                </div>
                <div
                  class="col-4 text-center p-2 border-end border-bottom prayer-time-card-sm"
                >
                  <div
                    class="prayer-icon-sm bg-warning bg-opacity-10 text-warning"
                  >
                    <i class="bi bi-sunrise-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">
                    {{ $t("sunrise") }}
                  </div>
                  <div class="text-muted fs-7">{{ sunrise }}</div>
                </div>
                <div
                  class="col-4 text-center p-2 border-bottom prayer-time-card-sm"
                >
                  <div
                    class="prayer-icon-sm bg-danger bg-opacity-10 text-danger"
                  >
                    <i class="bi bi-sun-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">
                    {{ $t("dhuhr") }}
                  </div>
                  <div class="text-muted fs-7">{{ dhuhr }}</div>
                </div>
                <div
                  class="col-4 text-center p-2 border-end prayer-time-card-sm"
                >
                  <div class="prayer-icon-sm bg-info bg-opacity-10 text-info">
                    <i class="bi bi-cloud-sun-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">{{ $t("asr") }}</div>
                  <div class="text-muted fs-7">{{ asr }}</div>
                </div>
                <div
                  class="col-4 text-center p-2 border-end prayer-time-card-sm"
                >
                  <div
                    class="prayer-icon-sm bg-orange bg-opacity-10 text-orange"
                  >
                    <i class="bi bi-sunset-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">
                    {{ $t("maghrib") }}
                  </div>
                  <div class="text-muted fs-7">{{ maghrib }}</div>
                </div>
                <div class="col-4 text-center p-2 prayer-time-card-sm">
                  <div class="prayer-icon-sm bg-dark bg-opacity-10 text-dark">
                    <i class="bi bi-moon-stars-fill fs-6"></i>
                  </div>
                  <div class="fw-bold mt-1 fs-6 text-dark">
                    {{ $t("isha") }}
                  </div>
                  <div class="text-muted fs-7">{{ isha }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dailyHadith: {
        arabic:
          "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        text: "Тот, кто отправляется на путь в поисках знания, Аллах облегчит ему путь в Рай.",
        reference: "Сахих Муслим",
      },
      louding: false,
      city: "",
      cityLo: "",
      country: "",
      countryLo: "",
      fajr: "",
      sunrise: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
    };
  },
  methods: {
    async getLocationByIP() {
      this.louding = true;
      try {
        const response = await fetch(
          "http://ip-api.com/json/?fields=city,country,lat,lon"
        );
        const data = await response.json();
        this.cityLo = data.city;
        this.countryLo = data.country;
        this.city = this.cityLo;
        this.country = this.countryLo;
        await this.getTimePray();
      } catch (error) {
        console.error("Ошибка получения локации:", error);
        return null;
      }
    },
    async getCity() {
      try {
        this.louding = true;
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?city=${this.city}&format=json&limit=1&addressdetails=1`
        );
        if (response.data.length > 2) {
          const data = response.data[0];
          const country = data.address?.country || "Давлат топилмади";
          this.country = country;
          this.louding = false;
        } else {
          this.country = "Шаҳар топилмади.";
        }
      } catch (error) {
        this.country = "Сўровда хатолик.";
        console.error(error);
      }
    },
    async getTimePray() {
      try {
        this.louding = true;
        const res = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity/16-07-2025?city=${this?.city}&country=${this?.country}&method=2&language=kz`
        );
        const data = res.data.data.timings;
        this.fajr = data.Fajr;
        this.sunrise = data.Sunrise;
        this.dhuhr = data.Dhuhr;
        this.asr = data.Asr;
        this.maghrib = data.Maghrib;
        this.isha = data.Isha;
        this.louding = false;
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
  },
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(#198754, rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1561768033-7e924a619476?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: center;
  border-radius: 0 0 20px 20px;
}

.loader {
  --d: 22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #45a049;
  box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
  animation: l27 1s infinite steps(8);
}
@keyframes l27 {
  100% {
    transform: rotate(1turn);
  }
}
.prayer-time-card-sm {
  transition: all 0.2s ease;
  padding-top: 0.8rem !important;
  padding-bottom: 0.8rem !important;
}

.prayer-time-card-sm:hover {
  background-color: rgba(0, 160, 83, 0.05);
}

.prayer-icon-sm {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.bg-orange {
  color: #fd7e14;
}

.fs-7 {
  font-size: 0.8rem !important;
}

.card-header {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.input-group-sm .form-control,
.input-group-sm .btn,
.input-group-sm .input-group-text {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  height: 32px;
}
</style>
