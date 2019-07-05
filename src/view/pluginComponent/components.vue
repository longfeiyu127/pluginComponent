<template>
  <div class="component-box" v-if="targetValue">
    <div class="Popup">
      <van-button type="default" @click="handleData">回调</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
export default {
  components: {
    [Button.name]: Button
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'pureComponent'
    },
    cb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      targetValue: false
    }
  },
  watch: {
    show: {
      handler(val) {
        this.targetValue = val
      },
      immediate: true
    },
    type: {
      handler(val) {
        if (val === 'routeComponent') {
          this.targetValue = true
        }
      },
      immediate: true
    },
    targetValue(val) {
      if (val !== this.show) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    handleData() {
      this.targetValue = false
      this.$emit('handleData', '回传参数')
      this.cb && this.cb('plugin回传参数')
      if (this.type === 'routeComponent') {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.component-box{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
  background: wheat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

