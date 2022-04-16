<template>
  <el-container>
    <el-header>
      <el-row :gutter="30">
        <el-col :span="4">logo</el-col>
        <el-col :span="16" class="center">后台管理系统</el-col>
        <el-col :span="4" class="right">
          <el-dropdown @command="loginOut">
            <span class="el-dropdown-link">
              {{ userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :default-active="route.path"
        >
          <el-menu-item
            :index="item.path"
            v-for="item in routerData"
            :key="item.path"
          >
            <el-icon><setting /></el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    let store = useStore()
    let router = useRouter()
    let route = useRoute()
    let userName = computed(() => store.state.userInfo.userName)
    let state = {
      routerData: computed(() => store.state.routerData),
    }
    console.log(state.routerData)
    const loginOut = () => {
      store.commit('SET_TOKEN', '')
      router.replace('/login')
    }
    return {
      ...toRefs(state),
      userName,
      router,
      loginOut,
      route,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: var(--el-color-primary-light-7);
  line-height: 60px;
  .center {
    text-align: center;
    font-size: 16px;
  }
  .right {
    line-height: 60px;
    display: flex;
    justify-content: right;
    align-content: center;
    .el-dropdown {
      line-height: 60px;
    }
  }
}
.el-aside {
  background-color: var(--el-color-primary-light-8);
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
.el-main {
  background-color: var(--el-color-primary-light-9);
}
</style>