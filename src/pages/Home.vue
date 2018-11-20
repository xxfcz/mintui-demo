<template>
  <div>
    <mt-cell v-for="(type, index) in cardtypes" :key="index" :title="type.name" :to="`/checkcard/${type.id}`" is-link :value="type.id">
    </mt-cell>
    <mt-cell title="演示" is-link to="/demo"></mt-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardtypes: []
    }
  },

  mounted() {
    this.loadCardtypes()
  },

  methods: {
    loadCardtypes() {
      axios.get('/api/cardtypes').then(resp => {
        this.cardtypes = resp.data
      })
    }
  }
}
</script>
