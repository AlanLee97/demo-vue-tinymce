<!-- # src/App.vue -->
<template>
  <div id="app">
    <RichtextTable />
    <!-- 
    <div class="btn-area">
      <el-button class="btn-style" :type="isTable ? 'primary' : ''" @click="chooseSolution('table')">表格方案</el-button>
      <el-button :type="isExcel ? 'primary' : ''" @click="chooseSolution('excel')">Excel方案</el-button>
    </div> 

    <div class="content-area">
      <ExcelLuckysheets v-if="isExcel" />
      <RichtextTable v-if="isTable"/>
    </div>
    -->
  </div>
</template>

<script>
// import ExcelLuckysheets from './components/ExcelLuckysheet.vue';
import RichtextTable from './components/RichtextTable.vue';

export default {
  name: 'app',
  components: {
    // ExcelLuckysheets,
    RichtextTable,
  },
  data() {
    return {
      selectedSolution: 'table',
    }
  },
  computed: {
    isTable() {
      return this.selectedSolution === 'table';
    },
    isExcel() {
      return this.selectedSolution === 'excel';
    },
    activeSolution() {
      return (this.isTable || this.isExcel) ? 'primary' : ''
    }
  },
  mounted() {

  },

  methods: {
    chooseSolution(val) {
      this.selectedSolution = val;
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-area {
  display: flex;
  justify-content: center;
  padding: 20px;
  .btn-style {
    margin-right: 30px;
  }
}

.content-area {
  // position: relative;
}

</style>