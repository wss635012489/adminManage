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
      <el-table-column prop="title" label="标题" />
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
        @current-change="pageChange"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="详情" width="30%">
    <p>
      {{ detail.body }}
    </p>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getPosts } from '@a/index'
import { State } from '@t/articleTypes'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    let state: State = reactive({
      list: [],
      listBase: [],
      loading: false,
      dialogVisible: false,
      detail: '',
      pageNo: 1,
    })
    onMounted(() => {
      state.loading = true
      getPosts().then((res) => {
        // console.log(res)
        state.loading = false
        state.listBase = res
        sliceList()
      })
    })
    const handleSee = (data: any) => {
      //console.log(data.body)
      state.dialogVisible = false
      state.detail = data
      state.dialogVisible = true
    }
    const sliceList = () => {
      state.list = state.listBase.slice(
        (state.pageNo - 1) * 10,
        state.pageNo * 10
      )
    }
    const pageChange = (page: number) => {
      state.pageNo = page
      sliceList()
    }
    const goSearch = () => {
      ElMessage.success('搜索成功')
    }
    return {
      ...toRefs(state),
      handleSee,
      pageChange,
      goSearch,
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
p {
  line-height: 2.2;
}
</style>