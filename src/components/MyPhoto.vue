<template>
  <div id="main">
    <div class="con">
      <Header
        :catalogueList="catalogueList"
        @catalogueClick="catalogueClick"
      ></Header>
      <div class="show" id="scrollShow">
        <div class="video">
          <h3 class="flex a-c">
            <img style="width: 24px" src="@/assets/video.svg" alt="" /> 视频
          </h3>
          <div class="flex flex-w j-sb">
            <div
              :class="[
                'v-item item flex a-c j-c',
                item.id === imageId ? 'to-up' : '',
              ]"
              v-for="item in videoList"
              :key="item.id"
              @mouseenter="handleImageEnter(item.id)"
              @mouseleave="imageId = ''"
            >
              <div v-show="item.id === imageId" class="flex-col a-c j-c">
                <img src="@/assets/images/search.png" alt="" />
                <span>观看</span>
              </div>
              <img v-lazy="item.poster" alt="" />
              <div class="info">
                <div>{{ item.name.slice(0, 10) + "..." }}</div>
                <span>{{ secondsToMinutesAndSeconds(item.duration) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="photo">
          <h3 class="flex a-c">
            <img style="width: 26px" src="@/assets/photo.svg" alt="" /> 照片
          </h3>
          <div class="flex flex-w j-sb">
            <div
              :class="['p-item item', item.id === imageId ? 'to-up' : '']"
              v-for="item in imageList"
              :key="item.id"
              @mouseenter="handleImageEnter(item.id)"
              @mouseleave="imageId = ''"
            >
              <div v-show="item.id === imageId" class="flex-col a-c j-c">
                <img src="@/assets/images/search.png" alt="" />
                <span>查看素材</span>
              </div>
              <img v-lazy="item.url" alt="" />
              <div class="info flex a-c j-sb">
                <div>{{ item.name.slice(0, 6) + "..." }}</div>
                <div class="divider"></div>
                <span>上传：{{ item.uploadTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="go-top">
        <img src="@/assets/top.svg" alt="" @click="goTop" />
      </div>
      <div class="custom-scrollbar" id="customScrollbar">
        <div class="scroll-thumb" id="scrollThumb"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import { ref, onMounted, nextTick } from "vue";

const showRef = ref();

let catalogueList = ref([]);
let videoList = ref([]);
let imageList = ref([]);
let imageId = ref("");

/* 页面加载生命周期 */
onMounted(() => {
  getCatlogs();
});

/* 格式化分秒 */
const secondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

/* 切换目录 */
const catalogueClick = (index: number) => {
  handleImageOrVideo(index);
};

// 回到顶部
const goTop = () => {
  // 记录开始时间
  const beginTime = Date.now();
  // 初始位置
  const show = document.querySelector(".show");
  const beginValue = show.scrollTop;
  const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
  const frameFunc = () => {
    // 进度，500ms 内将页面滚动到顶部
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      // 根据进度修改 scrollTop 的值
      show.scrollTop = beginValue * (1 - progress);
      rAF(frameFunc);
    } else {
      show.scrollTop = 0;
    }
  };
  rAF(frameFunc);
};

/* 查看的动画 */
const handleImageEnter = (id: string) => {
  imageId.value = id;
};

/* 获取目录 */
const getCatlogs = async () => {
  const response = await fetch(
    `https://general.feicut.com/resource/project.json`
  );
  catalogueList.value = await response.json();
  handleImageOrVideo(0);
};

/* 处理视频和照片数据 */
const handleImageOrVideo = async (index: number) => {
  videoList.value = catalogueList.value[index].videoList;
  videoList.value = handleSortDate(videoList.value, "updateTime");
  imageList.value = catalogueList.value[index].imageList;
  imageList.value = handleSortDate(imageList.value, "uploadTime");
  await nextTick();
  // 设置自定义滚动条
  updateScrollbar();
};

/* 处理排序 */
const handleSortDate = (list: object, type: string) => {
  return list.sort((v: object, b: object) => {
    const timeA = new Date(v[type]);
    const timeB = new Date(b[type]);
    return timeB - timeA;
  });
};

/* 设置自定义滚动条 */
const updateScrollbar = () => {
  const scrollShow: HTMLElement = document.getElementById("scrollShow");
  const scrollThumb: HTMLElement = document.getElementById("scrollThumb");
  const customScrollbar: HTMLElement =
    document.getElementById("customScrollbar");
  const customHeight = customScrollbar.clientHeight;
  // 全部内容高度
  const scrollHeight = scrollShow.scrollHeight;
  // 显示内容高度
  const containerHeight = scrollShow.clientHeight;
  // 显示内容高度 / 全部内容高度
  const scrollbarRatio = containerHeight / scrollHeight;
  const scrollbarHeight = customHeight * scrollbarRatio;
  // 设置滚动条高度
  scrollThumb.style.height = scrollbarHeight + "px";
  // 根据滚动获取总高占比
  let distance = scrollShow.scrollTop / scrollHeight;
  // 设置滚动条距离顶部距离
  scrollThumb.style.top = distance * 100 + "%";
  scrollShow.addEventListener("scroll", updateScrollbar);
};
</script>

<style scoped lang="scss">
#main {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  background: url("@/assets/images/back.png") no-repeat;
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
    height: 74%;
    overflow: auto;
    padding: 20px 8%;
    &::-webkit-scrollbar {
      width: 5px; // y轴的宽度
      height: 8px; //x轴的高度 可删除
    }
    &::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      //轨道要设置成透明的
      background-color: transparent;
    }
  }
  .v-item {
    width: 280px;
    height: 160px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 16px;
    color: #fff;
    & > div:first-child {
      border-radius: 16px;
      width: 280px;
      height: 160px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      color: #fff;
      cursor: pointer;
    }
    .info {
      position: absolute;
      left: 10px;
      bottom: 10px;
      & > span {
        color: #ccc;
        font-size: 12px;
      }
    }
  }
  .p-item {
    width: 230px;
    height: 230px;
    margin-right: 20px;
    margin-bottom: 50px;
    border-radius: 16px;
    position: relative;
    color: #fff;
    & > div:first-child {
      border-radius: 16px;
      width: 230px;
      height: 230px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      color: #fff;
      cursor: pointer;
    }
    .info {
      position: absolute;
      bottom: -30px;
      color: #000;
      font-weight: 700;
      .divider {
        width: 1px;
        height: 12px;
        margin: 0 10px;
        background: #555;
      }
      & > span {
        color: #555;
        font-size: 12px;
        position: relative;
      }
    }
  }
  h3 {
    & > img {
      margin-right: 5px;
    }
  }

  .item {
    transition: all 0.3s;
    position: relative;
    & > img {
      z-index: -1;
      position: absolute;
      border-radius: 16px;
      width: 100%;
      height: 100%;
      object-fit: cover; /* 使用 cover 可以保持图片的纵横比并填充整个容器 */
      object-position: center center; /* 设置图片的位置，这里是居中对齐 */
    }
  }
  .to-up {
    transform: translate(0, -10px);
  }
  .go-top {
    cursor: pointer;
    position: absolute;
    right: 3%;
    bottom: 5%;
  }
  .custom-scrollbar {
    width: 5px;
    height: 200px;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 100;
    right: -20px;
    border-radius: 6px;
    top: 50%;
    transform: translate(0, -50%);
    .scroll-thumb {
      position: absolute;
      left: 0%;
      width: 5px;
      border-radius: 6px;
      background: #fff;
    }
  }
}
</style>
