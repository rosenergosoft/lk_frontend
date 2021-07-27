<template>
  <div class="wrapper">
    <div>
      <div class="row">
        <div class="col-4"><Sidebar /></div>
        <div class="col-8">
          <div class="row"><UserBar /></div>
          <div class=""><Connection /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Login from '../components/Login'
import Sidebar from '@/components/Sidebar'
import UserBar from '@/components/UserBar'
import Connection from '@/components/Connection'
export default {
  components: {
    Sidebar,
    UserBar,
    Connection
  }
}
</script>
