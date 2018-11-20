<template>
  <div>
    <h3>检查卡</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardtype: {}
    }
  },
  mounted() {
    let tid = this.$route.params.tid
    // TODO: axios.get('/api/checkitems/:type')
  },

  methods: {}
}

</script>
