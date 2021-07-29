<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'kljad', value: 'asf' },
        { text: 'asf', value: 'as3f' },
        { text: 'asf', value: 'fa' }
      ],
      users: []
    }
  }
}
</script>

<style scoped>

</style>
