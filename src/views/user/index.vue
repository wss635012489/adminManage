<template>
  <div>
    <div class="search-box">
      <el-input
        v-model="search"
        placeholder="请输入姓名"
        clearable
        style="width: 260px"
      />
      <el-button type="primary" @click="goSearch">查询</el-button>
    </div>
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column type="index" width="180" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="email" />
      <el-table-column>
        <template #default="scope">
          <div class="btn-box">
            <el-button type="primary" @click="handleSee(scope.row)"
              >查看详情</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="list.length">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="listBase.length"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="详情" width="30%">
    <ul class="detail-info">
      <li><label>姓名</label>：{{ detail.name }}</li>
      <li><label>电话</label>：{{ detail.phone }}</li>
      <li><label>email</label>：{{ detail.email }}</li>
      <li><label>website</label>：{{ detail.website }}</li>
      <li><label>地址</label>：{{ detail.address.street }}</li>
    </ul>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUer, getUerDetail } from '@a/index'
import { State } from '@t/userTypes'
export default defineComponent({
  setup() {
    let state: State = reactive({
      list: [],
      listBase: [],
      search: '',
      loading: false,
      dialogVisible: false,
      detail: '',
    })
    onMounted(() => {
      state.loading = true
      getUer().then((res) => {
        //console.log(res)
        state.loading = false
        state.list = res
        state.listBase = res
      })
    })
    watch(
      () => state.search,
      (newVal) => {
        console.log(newVal)
        if (!newVal) {
          state.list = state.listBase
        }
      }
    )
    const goSearch = () => {
      if (state.search) {
        state.list = state.listBase.filter(
          (item: any) => item.name.indexOf(state.search) != -1
        )
      } else {
        state.list = state.listBase
      }
    }
    const handleSee = (data: any) => {
      //console.log(data)
      state.dialogVisible = false
      getUerDetail(data.id).then((res) => {
        //console.log(res)
        state.detail = res
        state.dialogVisible = true
      })
    }
    return {
      ...toRefs(state),
      goSearch,
      handleSee,
    }
  },
})
</script>

<style lang="scss" scoped>
.btn-box {
  text-align: right;
}
.pagination {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}
.search-box {
  margin-bottom: 15px;
  .el-button {
    margin-left: 10px;
  }
}
.detail-info {
  display: flex;
  flex-wrap: wrap;
  margin-top: -20px;
  li {
    width: 50%;
    margin-top: 15px;
    label {
      color: #999;
    }
  }
}
</style>