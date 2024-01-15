<template>
  <div id="header">
    <div
      :class="['top flex a-c']"
      @mouseleave="leaveTopInfo"
      @mouseenter="handleHeaderShow"
    >
      <div v-show="isShow">
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
        <div class="photo-title"></div>
      </div>
      <div v-show="!isShow">
        <div class="in-all flex-col a-c j-c" :style="setAllStyle()">
          <div class="in-all-title flex a-c j-c">
            <img src="@/assets/images/all-icon.png" alt="" />
            全部
          </div>
          <img src="@/assets/images/current.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Album } from "@/delcare/index";
/* 接受参数 */
defineProps(["catalogueList"]);
/* 注册事件 */
const emit = defineEmits(["catalogueClick"]);

const DEFAULT_COUNT = 7;

const current = ref(0);
/* 相册的标题 */
const title = ref("全部");
/* 是否展示详情 */
const isShow = ref(true);

const handleHeaderShow = () => {
  // isShow.value = false;
};

const leaveTopInfo = () => {
  // isShow.value = true;
};

/* 切换目录 */
const switchCatalogue = (item: Album, index: number) => {
  title.value = item.name;
  current.value = index;
  emit("catalogueClick", index);
};

const setAllStyle = () => {
  return setBackImage("../../assets/images/bg.png");
};

const setBackStyle = (item: Album) => {
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
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 130px;
  min-height: 70px;
  border-radius: 40px 40px 0px 0px;
  transition: all 0.3s;
  background: linear-gradient(
    90deg,
    rgba(252, 252, 252, 0.1) 0%,
    rgba(241, 237, 232, 0.95) 10%,
    rgba(241, 237, 232, 0.95) 90%,
    rgba(252, 252, 252, 0.1) 100%
  );
  &:hover {
    height: 230px;
    // transform: scale(2);
  }
}
.in-all {
  width: 192px;
  height: 108px;
  color: #fff;
  font-size: 12px;
  border-radius: 8px;
  .in-all-title {
    margin-bottom: 5px;
    margin-top: 50px;
  }
  img {
    margin: 0 5px;
  }
}
.top {
  height: 100%;
  min-height: 70px;
  padding: 0 8%;
  position: relative;
  border-radius: 40px 40px 0px 0px;
  backdrop-filter: blur(100px);
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
