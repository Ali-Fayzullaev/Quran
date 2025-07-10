import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"; // Главная страница
import Quran from "@/views/Quran.vue"; // Страница Корана
import Hadith from "@/views/Hadith.vue"; // Страница хадисов
import Duo from "@/views/Duo.vue"; // Страница дуаов
import QuranDet from "@/components/QuranDet.vue"; // Детальная страница суры
import ChatGPT from "@/components/ChatGPT.vue";

const routes = [
  { path: "/", component: Home }, // Главная страница
  {
    path: "/quran",
    component: Quran,
    meta: { title: "Священный Коран" }, // Заголовок для страницы Корана
  },
  {
    path: "/hadith",
    component: Hadith,
    meta: { title: "Хадисы" }, // Заголовок для страницы хадисов
  },
  {
    path: "/duo",
    component: Duo,
    meta: { title: "Исламские дуа" }, // Заголовок для страницы дуаов
  },
  {
    path: "/qurandet/:selectedSurah",
    component: QuranDet,
    meta: { title: "Сура" }, // Заголовок для детальной страницы суры
  },
  {
    path: "/chatgpt",
    component: ChatGPT,
    meta: { title: "ChatGPT" }, // Заголовок для детальной страницы суры
  },
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

// Изменение заголовка страницы перед переходом
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Исламские Ресурсы"; // Устанавливаем заголовок страницы
  next(); // Продолжаем переход
});

export default router;
