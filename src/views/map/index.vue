<template>
  <div class="map-box" id="bmap"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
declare const BMapGL: any
export default defineComponent({
  setup() {
    onMounted(() => {
      var map = new BMapGL.Map('bmap') // 创建地图实例
      var point = new BMapGL.Point(116.404, 39.915) // 创建点坐标
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
    })
    return {}
  },
})
</script>

<style lang="scss" scoped>
.map-box {
  height: 100%;
  width: 100%;
}
</style>