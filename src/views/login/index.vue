<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="60px"
      class="ruleForm"
    >
      <h1>后台管理系统</h1>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model.trim="ruleForm.userName"
          placeholder="请输入账号"
          clearable
          @keydown.enter="submitForm(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input
          v-model.trim="ruleForm.passWord"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          clearable
          @keydown.enter="submitForm(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="button"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import type { FormInstance } from 'element-plus'
import { State, ResUserInfo, RuleForm } from '@t/loginTypes'
import { login } from '@a/index'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    let store = useStore()
    let router = useRouter()
    const state: State = reactive({
      ruleForm: {
        userName: '',
        passWord: '',
      },
      ruleFormRef: ref<FormInstance>(),
    })
    const rules = {
      userName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 5, max: 10, message: '账号长度为6到10位', trigger: 'blur' },
      ],
      passWord: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 10, message: '密码长度为6到10位', trigger: 'blur' },
      ],
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid) => {
        if (valid) {
          login<RuleForm, ResUserInfo>(state.ruleForm).then((res) => {
            //console.log(res)
            store.commit('SET_TOKEN', res.token)
            store.commit('SET_USERINFO', res)
            router.replace('/')
          })
        }
      })
    }
    return {
      ...toRefs(state),
      rules,
      submitForm,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url('~@img/login_bg.jpg') no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  .ruleForm {
    margin: auto;
    width: 500px;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
    h1 {
      font-size: 16px;
      text-align: center;
      margin-bottom: 15px;
    }
    .button {
      width: 100%;
    }
  }
}
</style>