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
          <div class="card shadow mb-5 border-0">
            <div
              class="card-header bg-gradient text-white text-center"
              style="background: linear-gradient(90deg, #0d6efd, #6610f2)"
            >
              <div
                v-if="louding"
                class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
                style="z-index: 10"
              >
                <div class="loader"></div>
              </div>
              <div class="input-group">
                <button
                  @click="() => { getLocationByIP(); getTimePray(); }"
                  class="input-group-text bg-white border-end-0"
                  id="basic-addon1"
                >
                  <i class="bi bi-geo-alt-fill"></i>
                </button>
                <input
                  v-model="city"
                  @keyup.enter="getCity, getTimePray"
                  type="text"
                  class="form-control"
                  placeholder="Местополажения..."
                />
                <button
                  @click="getCity(), getTimePray()"
                  class="btn btn-success"
                >
                  найти
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="row g-0">
                <div
                  class="col-6 col-md-4 text-center p-3 border-end border-bottom"
                >
                  <i class="bi bi-cloud-sun-fill fs-3 text-primary"></i>
                  <div class="fw-bold mt-2">Фаджр</div>
                  <div class="text-muted">{{ fajr }}</div>
                </div>
                <div
                  class="col-6 col-md-4 text-center p-3 border-end border-bottom"
                >
                  <i class="bi bi-sunrise-fill fs-3 text-warning"></i>
                  <div class="fw-bold mt-2">Восход</div>
                  <div class="text-muted">{{ sunrise }}</div>
                </div>
                <div class="col-6 col-md-4 text-center p-3 border-bottom">
                  <i class="bi bi-sun-fill fs-3 text-danger"></i>
                  <div class="fw-bold mt-2">Зухр</div>
                  <div class="text-muted">{{ dhuhr }}</div>
                </div>
                <div class="col-6 col-md-4 text-center p-3 border-end">
                  <i class="bi bi-sunset-fill fs-3 text-info"></i>
                  <div class="fw-bold mt-2">Аср</div>
                  <div class="text-muted">{{ asr }}</div>
                </div>
                <div class="col-6 col-md-4 text-center p-3 border-end">
                  <i class="bi bi-moon-stars-fill fs-3 text-primary"></i>
                  <div class="fw-bold mt-2">Магриб</div>
                  <div class="text-muted">{{ maghrib }}</div>
                </div>
                <div class="col-6 col-md-4 text-center p-3">
                  <i class="bi bi-moon-fill fs-3 text-dark"></i>
                  <div class="fw-bold mt-2">Иша</div>
                  <div class="text-muted">{{ isha }}</div>
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
        this.city = this.cityLo
        this.country = this.countryLo
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
</style>
