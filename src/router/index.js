import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"; // Главная страница
import Quran from "@/views/Quran.vue"; // Страница Корана
import Hadith from "@/views/Hadith.vue"; // Страница хадисов
import Duo from "@/views/Duo.vue"; // Страница дуаов
import QuranDet from "@/components/QuranDet.vue"; // Детальная страница суры
import ChatGPT from "@/components/ChatGPT.vue";
import i18n from "@/i18n";
import NotFound from "@/views/NotFound.vue";
import QuranPage from "@/components/QuranPage.vue";
const routes = [
  { path: "/", component: Home,
    meta: { title: "siteTitle" },
   }, // Главная страница
  {
    path: "/quran",
    component: Quran,
    meta: { title: "quranPageTitle" }, // Заголовок для страницы Корана
  },
  {
    path: "/hadith",
    component: Hadith,
    meta: { title: "hadithPageTitle" }
  },
  {
    path: "/duo",
    component: Duo,
    meta: { title: "duoPageTitle" }
  },
  {
    path: "/qurandet/:selectedSurah",
    component: QuranDet,
    meta: { title: "surahPageTitle" }
  },
  {
    path: "/chatgpt",
    component: ChatGPT,
    meta: { title: "chatPageTitle" }
  },
  {
    path: "/QuranPage",
    component: QuranPage,
    meta: { title: "QuranPage" }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'notFoundPageTitle' }
  }
  
  
  
];

// Создание маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const key = to.meta.title
  if (key) {
    document.title = i18n.global.te(key)
      ? i18n.global.t(key)
      : key
  }
})

// Изменение заголовка страницы перед переходом
router.beforeEach((to, from, next) => {
  document.title = to.meta.title; // Устанавливаем заголовок страницы
  next(); // Продолжаем переход
});

export default router;
