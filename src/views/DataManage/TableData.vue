<template>
    <div class="table-data">
        <div class="search-box">
            <el-input v-model="searchVal"
                      size="small"
                      placeholder="请输入搜索内容"
            >
            </el-input>
            <el-button size="small"
                       type="primary"
                       icon="el-icon-search"
                       :loading="isLoading"
                       @click="handleSearch"
            >
                搜索
            </el-button>
        </div>

        <!-- table -->
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  :height="tHeight"
                  class="table-box"

        >
            <!-- 序号 -->
            <el-table-column type="index"
                             label="序号"
                             width="60"
            >
            </el-table-column>

            <!-- 课程名称 -->
            <el-table-column label="课程名称"
                             prop="title"
            >
            </el-table-column>

            <!-- 课程等级 -->
            <el-table-column label="课程等级"
                             prop="level"
                             width="120"
            >
            </el-table-column>

            <!-- 技术栈 -->
            <el-table-column label="技术栈"
                             prop="type"
                             width="120"
            >
            </el-table-column>

            <!-- 报名人数 -->
            <el-table-column label="报名人数"
                             prop="count"
                             width="120"
            >
            </el-table-column>

            <!-- 上线日期 -->
            <el-table-column label="上线日期"
                             prop="date"
                             width="160"
            >
            </el-table-column>

            <!--  -->
            <el-table-column label="操作"
                             width="160"
            >
                <template slot-scope="scope"><!-- TODO 为什么要写成 template-->
                    <el-button size="mini"
                               type="default"
                               @click="handleEdit(scope.$index, scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pages" ref="page-box">
            <el-pagination :page-sizes="[5,10,20]"
                           :page-size="size"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"
                           @size-change="handleSizeChange"
                           @current-change="hangleCurrentChange"

            >
            </el-pagination>
        </div>

        <!-- dialog -->
        <EditDialog :dialogVisible="dialogVisible"
                    :form="formData"
                    @closeDialog="closeDialog"
        >
        </EditDialog>

    </div><!--table-data-->
</template>

<script lang="ts">

    import { Component, Vue, Provide } from 'vue-property-decorator';
    import EditDialog from './EditDialog.vue';

    /** 一定要用Component修饰 **/
    @Component({
        components: {
            EditDialog,
        }
    })
    export default class TableData extends Vue {
        @Provide()
        isLoading: boolean = false;

        @Provide()
        searchVal: string = '';// 搜索变量

        @Provide()
        tHeight: number = document.body.offsetHeight - 270;// 可视区域

        @Provide()
        tableData: any = [];// 表格数据

        @Provide()
        page: number = 1;// 当前page

        @Provide()
        size: number = 5;// 5条内容

        @Provide()
        total: number = 0;// 总消息条数

        @Provide()
        dialogVisible: boolean = false;

        @Provide()
        formData: object = {
            title: '',
            type: '',
            level: '',
            count: '',
            date: '',
        };

        /** 加载数据 **/
        loadData () {
            (this as any).$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
                .then((res: any) => {
                    // console.log(res.data);
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .catch((err: any) => {
                    console.log(err);
                });
        };

        handleSizeChange (val: number): void {
            this.size = val;
            //console.log(this.size);
            this.page = 1;
            // ❤ 若值不为空，就搜索；若值为空，则搜索所有
            this.searchVal ? this.loadSearchData() : this.loadData();
        };

        hangleCurrentChange (val: number): void {
            this.page = val;
            // ❤ 若值不为空，就搜索；若值为空，则搜索所有
            this.searchVal ? this.loadSearchData() : this.loadData();
        };

        handleSearch (): void {
            this.page = 1;
            // ❤ 若值不为空，就搜索；若值为空，则搜索所有
            this.searchVal ? this.loadSearchData() : this.loadData();
        };

        loadSearchData (): void {
            this.isLoading = true;
            (this as any).$axios(`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`)
                .then((res: any) => {
                    this.isLoading = false;
                    //console.log(res.data);
                    this.tableData = res.data.datas.list;
                    this.total = res.data.datas.total;
                })
                .catch((err: any) => {
                    this.isLoading = false;
                    console.log(err);
                })
            ;

        };

        handleEdit (index: number, row: any): void {
            //console.log(index, row);
            this.formData = row;
            this.dialogVisible = true;

        };

        closeDialog (): void {
            this.dialogVisible = false;
        };

        handleDelete (index: number, row: any): void {
            (this as any).$axios
                .delete(`/api/profiles/delete/${row._id}`)
                .then((res: any) => {
                    // console.log(res);
                    if (res.data.state === 'suc') {
                        this.$message({
                            type: 'success',
                            message: res.data.msg,
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg,
                        })
                    }

                    // 删除当前表单
                    this.tableData.splice(index, 1);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }

        created () {
            this.loadData();
        };
    }
</script>

<style lang="scss" scoped>
    .table-data {
        height: 100%;
        .table-box {
            font-size: 14px;
        }
        .pages {
            background: #fff;
            margin-top: 10px;
            padding: 10px 10px;
            text-align: right;
            height: 55px;
            box-sizing: border-box;
        }
        .search-box {
            background: #fff;
            margin-bottom: 10px;
            padding: 10px 10px;
            border-radius: 4px;
            height: 55px;
            box-sizing: border-box;
            .el-input {
                width: 200px;
                margin-right: 10px;
            }
        }
    }
</style>