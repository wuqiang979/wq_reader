<template>
  <div style="height: 100%;" class='ami-wrap'>
    <mulu></mulu>
    <epub-reader></epub-reader>
  </div>
</template>

<script>
import EpubReader from "../components/EpubReader.vue";
import Mulu from "./Mulu";
export default {
  data() {
    return {};
  },
  components: {
    EpubReader,
    Mulu
  }
};
</script>

<style lang="less">
.ami-wrap {
  position: relative;
}
</style>
