<template>
    <div class="password">
        <LoginHeader>
            <el-form slot="container"
                     :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-position="left"
                     label-width="0px"
            >
                <div class="title">
                    <h3>密码找回</h3>
                </div>

                <!-- username -->
                <el-form-item prop="username">
                    <el-input type="text"
                              v-model="ruleForm.username"
                              auto-complete="off"
                              placeholder="账号"
                    >
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>

                <!-- email -->
                <el-form-item prop="email">
                    <el-input type="text"
                              v-model="ruleForm.email"
                              auto-complete="off"
                              placeholder="邮箱"
                    >
                        <i slot="prefix" class="fa fa-envelope-o"></i>
                    </el-input>
                </el-form-item>

                <!-- 确定button -->
                <el-form-item>
                    <el-button type="primary"
                               :loading="loading"
                               style="width:100%"
                               @click.native.prevent="handleSubmit"
                    >
                        确定
                    </el-button>
                </el-form-item>
            </el-form>
        </LoginHeader>
    </div>
</template>
<script lang="ts">

    import { Component, Vue, Provide } from 'vue-property-decorator'
    import LoginHeader from './LoginHeader.vue'

    /** 一定要用Component修饰 **/
    @Component({
        components: {
            LoginHeader
        }
    })
    export default class Password extends Vue {

        /** 是否发起网络请求 **/
        @Provide()
        loading: boolean = false;

        /** 表单提交 **/
        @Provide()
        ruleForm: {
            username: string;
            email: string;
        } = {
            username : '',
            email : '',
        };

        /** 表单验证 **/
        @Provide()
        rules: {
            username: any;
            email: any;
        } = {
            username: [
                {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur',
                }
            ],
            email: [
                {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur',
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blue',
                }
            ],
        };

        /** 提交表单 **/
        handleSubmit (): void {
            (this.$refs['ruleForm'] as any).validate((valid: boolean) => {
                if (valid) {
                    this.loading = true;// 开动画
                    (this as any).$axios
                        .post('/api/users/findPwd', this.ruleForm)
                        .then((res: any) => {
                            this.loading = false;// 关动画
                            this.$message({// 通知
                                message: res.data.msg,
                                type: 'success',
                            });
                            this.$router.push('/login');// 跳转
                        })
                        .catch(() => {
                            this.loading = false;// 关动画
                        })
                }
            })
        };
    }
</script>

<style scoped>
    .title{
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }

    i {
        font-size: 14px;
        margin-left: 8px;
    }
</style>