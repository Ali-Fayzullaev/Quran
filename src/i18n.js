import { createI18n } from "vue-i18n";

const messages = {
  ru: {
    home: "Главная",
    quran: "Коран",
    hadith: "Хадис",
    duo: "Дуо",
    hadithOfTheDay: "Хадис дня",
    allInOne: "Коран, хадисы и дуа в одном месте",
    quranTitle: "Священный Коран",
    quranText: "Читайте и понимайте слова Аллаха",
    quranBtn: "Перейти к Корану",

    hadithTitle: "Хадисы",
    hadithText: "Познакомьтесь с хадисами Пророка (мир ему)",
    hadithBtn: "Перейти к хадисам",

    duaTitle: "Мольбы (Дуа)",
    duaText: "Изучайте ежедневные молитвы и дуа",
    duaBtn: "Перейти к дуа",
    surahList: "Список сур",
    ayah: "аят",
    searchPlaceholder: "Поиск по аяту (например: الرحمن)",
    loading: "Загрузка...",
    notFound: "Ничего не найдено...",
    ayahFound: "Найдено аятов:",
    
    copyright: "© 2025 Исламские Источники. Все права защищены.",
    quranPageTitle: "Священный Коран",
    hadithPageTitle: "Hadiths",
    duoPageTitle: "Islamic Duas",
    surahPageTitle: "Surah",
    chatPageTitle: "ChatGPT",
    siteTitle: "Исламские Ресурсы",
    home: "Главная",
    allSurahs: "Все суры",
    surahs: "Суры",
    fontSize: "Размер шрифта",
    loading: "Юкланмоқда...",
    noAudioSupport: "Ваш браузер не поддерживает аудио элемент",
    loading: "Загрузка...",
    title: "QuranGPT Помощник",
    online: "онлайн",
    you: "Вы",
    assistant: "QuranGPT",
    chooseTopic: "Выберите тему для обсуждения:",
    placeholder: "Напишите сообщение...",
    searchPlaceholderHadith: "Поиск хадисов...",
    locationPlaceholder: "Введите местоположение...",
    find: "Найти",
    fajr: "Фаджр",
    sunrise: "Восход",
    dhuhr: "Зухр",
    asr: "Аср",
    maghrib: "Магриб",
    isha: "Иша",
    QuranPage: "Коран страница",
    

  },
  
  en: {
    home: "Home",
    quran: "Quran",
    hadith: "Hadith",
    duo: "Dua",
    hadithOfTheDay: "Hadith of the Day",
    allInOne: "Quran, Hadiths and Duas in one place",
    quranTitle: "The Holy Quran",
    quranText: "Read and understand the words of Allah",
    quranBtn: "Go to Quran",

    hadithTitle: "Hadiths",
    hadithText: "Learn the Hadiths of the Prophet (peace be upon him)",
    hadithBtn: "Go to Hadiths",

    duaTitle: "Supplications (Dua)",
    duaText: "Study daily prayers and duas",
    duaBtn: "Go to Duas",
    surahList: "List of Surahs",
    ayah: "ayah",
    searchPlaceholder: "Search by ayah (e.g. الرحمن)",
    loading: "Loading...",
    notFound: "Nothing found...",
    ayahFound: "Ayahs found:",
  
    copyright: "© 2025 Islamic Sources. All rights reserved.",
    quranPageTitle: "The Holy Quran",
    hadithPageTitle: "Hadiths",
    duoPageTitle: "Islamic Duas",
    surahPageTitle: "Surah",
    chatPageTitle: "ChatGPT",
    siteTitle: "Islamic Resources",
    home: "Home",
    allSurahs: "All Surahs",
    surahs: "Surahs",
    fontSize: "Font size",
    loading: "Loading...",
    noAudioSupport: "Your browser does not support the audio element",
    loading: "Loading...",
    title: "QuranGPT Assistant",
    online: "online",
    you: "You",
    assistant: "QuranGPT",
    chooseTopic: "Choose a topic to discuss:",
    placeholder: "Type a message...",
    longestAyah: "What is the longest ayah in the Quran?",
    searchPlaceholderHadith: "Search Hadith...",
    locationPlaceholder: "Enter location...",
    find: "Find",
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",

    
    QuranPage: "Quran Page",

  },
};

const savedLocale = localStorage.getItem("locale") || "ru";

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});




export default i18n;
