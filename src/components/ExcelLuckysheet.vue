<template>
  <div class="luckysheet-wrapper">
    <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExcelLuckysheet',
  props: {
    msg: String
  },
  mounted() {
    // In some cases, you need to use $nextTick
    // this.$nextTick(() => {
    window.luckysheet.create({
      container: "luckysheet",
    });

    // });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.luckysheet-wrapper {
  /* margin-top: 100px; */
  /* position: relative; */
}
</style>
