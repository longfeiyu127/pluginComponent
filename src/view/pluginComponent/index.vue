<template>
  <div class="layout">
    <van-cell-group>
      <van-button type="default" @click="showPureComponent">纯组件示例</van-button>
      <br />
      <van-button type="default" @click="showChildrenRoute">子路由组件示例</van-button>
      <br />
      <van-button type="default" @click="showPluginComponent">插件式组件示例</van-button>
      <br />
    </van-cell-group>
    <br />
    <myComponent :show.sync="show" @handleData="getResult"></myComponent>
    <router-view type="routeComponent" @handleData="getResult"></router-view>
  </div>
</template>

<script>
import { Button, CellGroup} from 'vant';
import myComponent from './components'
import $plugin from './plugin/index'

export default {
  components: {
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    myComponent
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showPureComponent () {
      this.show = true
    },
    showChildrenRoute() {
      console.log('showChildrenRoute')
      this.$router.push('/pluginComponent/component')
    },
    showPluginComponent () {
      $plugin.show({cb: this.getResult})
    },
    getResult (data) {
      console.log(data);
    }
  },
  created() {
    $plugin.install()
  }
};
</script>

<style lang="less">
.layout{
  height: 100vh;
  width: 100vw;
}
</style>
