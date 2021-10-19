<template>
  <div class="wrapper">
    <div>
      <notifications />
      <div class="row">
        <div class="col-3">
          <Sidebar />
        </div>
        <div class="col-9">
          <div class="row">
            <UserBar />
          </div>
          <Nuxt />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loader-background">
      <div class="mx-auto">
        <div class="lds-spinner">
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import UserBar from '../components/UserBar'

export default {
  name: 'Default',
  components: {
    UserBar,
    Sidebar
  }
}
</script>

<style scoped lang="scss">
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
