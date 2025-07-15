<template>
  <div class="duo-page">
    <div class="text-center mb-5">
      <h2 class="fw-bold text-success">Исламские Мольбы (Дуа)</h2>
      <p class="text-muted">Ежедневные дуа</p>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4" v-for="duo in duos" :key="duo.id">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="arabic-text mb-3">{{ duo.arabic }}</div>
            <h5 class="card-title text-success">{{ duo.title }}</h5>
            <p class="card-text">{{ duo.translation }}</p>
            <div class="text-muted">
              <small>{{ duo.context }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
