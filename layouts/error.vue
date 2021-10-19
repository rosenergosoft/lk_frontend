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
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(85992516, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/85992516" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
