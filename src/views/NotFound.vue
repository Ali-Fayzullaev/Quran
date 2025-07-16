<!-- src/views/NotFound.vue -->
<template>
    <div class="text-center p-10">
      <h1 class="text-4xl font-bold text-red-600">404 – Страница не найдена</h1>
      <p class="mt-4 text-lg">
        Извините, страница, которую вы ищете, не существует.
      </p>
      <router-link to="/" class="text-blue-500 underline btn btn-outline-success">
        Вернуться на главную
      </router-link>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped></style>
  