<template>
  <div class="wrapper d-flex align-items-center justify-content-center">
    <div class="p-5 bg-light text-center">
      <div v-if="error.statusCode === 404">
        <h1 class="text-center">
          404
        </h1>
        <h4>Запрашиваемая страница не найдена</h4>
      </div>
      <div v-else>
        <h1>
          Ошибка
        </h1>
        <h4>Что-то пошло не так. Попробуйте еще раз.</h4>
      </div>
      <div class="separator" />
      <NuxtLink to="/" class="blue-button float-none mx-auto">
        На главную
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  layout: 'auth',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error']
}
</script>

<style scoped>

</style>
