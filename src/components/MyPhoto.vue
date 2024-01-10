<template>
  <div id="main">
    <div class="con">
      <div class="top flex a-c">
        <h1>我的相册</h1>
        <div class="top-item flex">
          <div
            v-for="(item, index) in catalogueShow"
            :key="item"
            :class="[
              'flex a-c j-c catalogue',
              current === index ? 'show-active' : '',
            ]"
            @click="switchCatalogue(index)"
          >
            <template v-if="index === 0">全部</template>
          </div>
          <div class="more flex j-c a-c">···</div>
        </div>
      </div>
      <div class="show"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const DEFAULT_COUNT = 7;
const current = ref(0);
let catalogueList = ref([]);
let catalogueShow = ref([]);

onMounted(() => {
  console.log(123);
  getBanner();

  return {
    catalogueShow,
  };
});

const getBanner = async () => {
  // 3. 使用es7中的async await异步方法调用接口
  const response = await fetch(
    `https://general.feicut.com/resource/project.json`
  );
  catalogueList = await response.json();
  catalogueShow = catalogueList.slice(0, DEFAULT_COUNT);
  console.log(catalogueShow.value);
};

/* 切换目录 */
const switchCatalogue = (index: number) => {
  current.value = index;
};

/* 设置背景 */
const setBackStyle = () => {
  return {
    color: "red",
  };
  // if (index === 0) {
  //   return {
  //     background: `url(${
  //       new URL(`../assets/images/all.png`, import.meta.url).href
  //     })`,
  //     backgroundSize: "cover",
  //   };
  // } else {
  //   return {
  //     background: `url(${new URL(item.poster, import.meta.url).href})`,
  //     backgroundSize: "cover",
  //   };
  // }
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
  .top {
    height: 16%;
    min-height: 70px;
    border-radius: 40px 40px 0px 0px;
    backdrop-filter: blur(100px);
    background: linear-gradient(
      90deg,
      rgba(252, 252, 252, 0.01) 0%,
      rgba(252, 252, 252, 0.8) 24%,
      rgba(252, 252, 252, 0.8) 50%,
      rgba(252, 252, 252, 0.8) 75%,
      rgba(252, 252, 252, 0.01) 100%
    );
    padding: 0 8%;
    position: relative;
  }
  .top-item {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .catalogue {
      cursor: pointer;
      width: 64px;
      color: #fff;
      height: 36px;
      font-size: 12px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.0588);
      border: 1px solid rgba(0, 0, 0, 0.1608);
      margin: 0 3px;
      box-sizing: border-box;
      background-size: "cover";
    }
    .more {
      color: #fff;
      height: 36px;
      width: 36px;
      margin: 0 3px;
      background: rgba(0, 0, 0, 0.1608);
      border: 1px solid rgba(0, 0, 0, 0.1608);
      border-radius: 8px;
      box-sizing: border-box;
    }
  }
}
.show-active {
  border: 3px solid #f4810f !important;
}
</style>
