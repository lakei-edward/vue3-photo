<template>
  <div id="main">
    <div class="con">
      <Header :catalogueList="catalogueList"></Header>
      <div class="show">123123</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import { ref, onMounted } from "vue";

let catalogueList = ref([]);

/* 页面加载生命周期 */
onMounted(() => {
  getCatlogs();
});

/* 获取目录 */
const getCatlogs = async () => {
  const response = await fetch(
    `https://general.feicut.com/resource/project.json`
  );
  catalogueList.value = await response.json();
  // catalogueShow.value = catalogueList.value.slice(0, DEFAULT_COUNT);
};
</script>

<style scoped lang="scss">
#main {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  background: url("../assets/images/back.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .con {
    width: 85%;
    height: 90%;
    border-radius: 40px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(100px);
  }
  .show {
    padding: 20px 8%;
  }
}
</style>
