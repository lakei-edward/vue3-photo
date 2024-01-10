<template>
  <div id="header">
    <div class="top flex a-c" @mouseenter="handleHeaderShow">
      <div v-if="isShow">
        <h1>我的相册</h1>
        <div class="top-item flex j-c a-c">
          <div :class="['flex a-c j-c show-active', 'outer']">
            <div class="flex a-c j-c catalogue" :style="setAllStyle()">
              全部
            </div>
          </div>
          <div
            v-for="(item, index) in catalogueList.slice(0, DEFAULT_COUNT)"
            :key="item"
            :class="['flex a-c j-c', 'outer']"
          >
            <div
              :class="['flex a-c j-c catalogue']"
              :style="setBackStyle(item)"
              @click="switchCatalogue(item, index)"
            ></div>
          </div>
          <div class="more flex j-c a-c">···</div>
        </div>
        <div class="photo-title">全部</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";

const DEFAULT_COUNT = 7;

interface album {
  name: string;
  id: string;
  poster: string;
  imageList: Array<any>;
  videoList: Array<any>;
}

/* 接受参数 */
defineProps(["catalogueList"]);

const current = ref(0);
/* 相册的标题 */
const title = ref("全部");
/* 是否展示详情 */
const isShow = ref(true);

const handleHeaderShow = () => {
  console.log(123);
  isShow.value = false;
};

/* 切换目录 */
const switchCatalogue = (item: album, index: number) => {
  title.value = item.name;
  current.value = index;
};

const setAllStyle = () => {
  return setBackImage("../assets/images/all.png");
};

const setBackStyle = (item: album) => {
  return setBackImage(item.poster);
};

/* 设置背景 */
const setBackImage = (url: string) => {
  return {
    background: `url(${new URL(url, import.meta.url).href})`,
    backgroundSize: "cover",
  };
};
</script>
<style lang="scss" scoped>
#header {
  width: 100%;
  height: 100%;
}
.top {
  height: 16%;
  min-height: 70px;
  padding: 0 8%;
  position: relative;
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
}
.photo-title {
  position: absolute;
  left: 50%;
  top: 82%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
.top-item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .outer {
    height: 40px;
    border-radius: 8px;
    border: 3px solid transparent;
    transition: all 0.5s;
  }
  .catalogue {
    cursor: pointer;
    width: 64px;
    color: #fff;
    height: 36px;
    font-size: 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.059);
    border: 1px solid rgba(0, 0, 0, 0.1608);
    padding: 5px;
    box-sizing: border-box;
    margin: 0 3px;
  }
  .more {
    color: #fff;
    height: 36px;
    width: 36px;
    margin: 0 3px;
    background: rgba(0, 0, 0, 0.1608);
    border: 1px solid rgba(0, 0, 0, 0.1608);
    border-radius: 8px;
  }
}
.show-active {
  border: 3px solid #f4810f !important;
}
</style>
