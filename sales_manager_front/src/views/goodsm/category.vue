<template>
    <div class="app-container">
        <el-col :span="3">
            <el-radio-group v-model="qStatus" size="small" @input="fetchData">
                <el-radio-button :label="-1">全部</el-radio-button>
                <el-radio-button :label="1">正常</el-radio-button>
                <el-radio-button :label="0">无效</el-radio-button>
            </el-radio-group>
        </el-col>
        <el-col :span="8">
            <el-input v-model="qName" placeholder="请输入商品类别名称" size="small" @change="fetchData"></el-input>
        </el-col>
        <el-button type="primary" size="small" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="danger" size="small" icon="el-icon-circle-plus" @click="newData">新增</el-button>
        <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%; margin-top: 5px;">
            <el-table-column label="ID" width="60" align="center">
                <template slot-scope="{row}">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column label="名称" width="240" align="left">
                <template slot-scope="{row}">
                    {{ row.name }}
                </template>
            </el-table-column>
            <el-table-column label="排序号" width="80" align="left">
                <template slot-scope="{row}">
                    {{ row.order_num }}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="120" align="left">
                <template slot-scope="{row}">
                    {{ row.status }}
                </template>
            </el-table-column>
            <el-table-column label="备注" align="left">
                <template slot-scope="{row}">
                    {{ row.remark }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230" align="center">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="modifyData(row,$index)">
                        修改
                    </el-button>
                    <el-button type="success" size="mini" @click="viewData(row,$index)">
                        查看
                    </el-button>
                    <el-popover placement="left" width="320" trigger="click" :ref="`node-${row.id}`">
                        <p>确定要删除 [ {{ row.name }} ] 吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="closeMsgDialog(`node-${row.id}`)">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteDataSave(`node-${row.id}`)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini" style="margin-left: 10px" @click="deleteData(row,$index)">
                            删除
                        </el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dataDialogTitle" :visible.sync="dataDialogVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="temp.name" :disabled="dataDialogStatus==='查看'?true:false" />
                </el-form-item>
                <el-form-item label="排序号" prop="order_num">
                    <el-input v-model="temp.order_num" :disabled="dataDialogStatus==='查看'?true:false" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio v-model="temp.status" :label="0" :disabled="dataDialogStatus==='查看'?true:false">无效</el-radio>
                    <el-radio v-model="temp.status" :label="1" :disabled="dataDialogStatus==='查看'?true:false">正常</el-radio>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="temp.remark" :disabled="dataDialogStatus==='查看'?true:false" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dataDialogVisible = false">
                    取消
                </el-button>
                <el-button type="primary" v-show="dataDialogStatus==='查看'?false:true" @click="dataDialogStatus==='新增'?newDataSave():modifyDataSave()">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchBasicDataList, deleteBasicData, newBasicData, modifyBasicData } from '@/api/goodsm'

export default {
    name: 'Category',
    data() {
        return {
            qName: '',
            qStatus: 1,
            list: null,
            temp: {
                id: undefined,
                name: '',
                order_num: 80,
                status: 1
            },
            row: null,
            index: -1,
            dataDialogTitle: "商品类别 - 新增",
            dataDialogVisible: false,
            dataDialogStatus: '新增',
            rules: {
                name: [{ required: true, message: '名称必填', trigger: 'change' }],
                order_num: [{ required: true, message: '排序号必填', trigger: 'change' }]
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            fetchBasicDataList({"dataType": "category", "query": {"name": this.qName, "status": this.qStatus}}).then(response => {
                this.list = response.data.items
                this.listLoading = false
            })
        },
        newData() {
            this.temp = {
                id: undefined,
                name: '',
                order_num: 80,
                status: 1,
                remark: ''
            }
            this.dataDialogTitle = "商品类别 - 新增"
            this.dataDialogStatus = '新增'
            this.dataDialogVisible = true
        },
        newDataSave() {
            this.$refs['dataForm'].validate((valid) => {
                if(valid) {
                    this.listLoading = true
                    newBasicData({"dataType": "category", "data": this.temp}).then(response => {
                        if(response.data.result){
                            this.temp['id'] = response.data.dataNumber
                            this.list.unshift(this.temp)
                            this.dataDialogVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'New data Successfully',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$notify({
                                title: 'Fail',
                                message: response.data.info,
                                type: 'fail',
                                duration: 2000
                            })
                        }
                    })
                    this.listLoading = false
                }
            })
        },
        modifyData(row, index) {
            this.temp = {
                id: row.id,
                name: row.name,
                order_num: row.order_num,
                status: row.status,
                remark: row.remark
            }
            this.index = index
            this.dataDialogTitle = "商品类别 - 修改"
            this.dataDialogStatus = '修改'
            this.dataDialogVisible = true
        },
        modifyDataSave() {
            this.$refs['dataForm'].validate((valid) => {
                if(valid) {
                    this.listLoading = true
                    modifyBasicData({"dataType": "category", "data": this.temp}).then(response => {
                        if(response.data.result){
                            this.list.splice(this.index, 1, this.temp)
                            this.dataDialogVisible = false
                            this.index = -1
                            this.$notify({
                                title: 'Success',
                                message: 'Modify data Successfully',
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$notify({
                                title: 'Fail',
                                message: response.data.info,
                                type: 'fail',
                                duration: 2000
                            })
                        }
                    })
                    this.listLoading = false
                }
            })
        },
        viewData(row, index) {
            this.temp = {
                id: row.id,
                name: row.name,
                order_num: row.order_num,
                status: row.status,
                remark: row.remark
            }
            this.dataDialogTitle = "商品类别 - 查看"
            this.dataDialogStatus = '查看'
            this.dataDialogVisible = true
        },
        deleteData(row, index) {
            this.row = row
            this.index = index
        },
        closeMsgDialog(refname) {
            this.$refs[refname].doClose()
        },
        deleteDataSave(refname) {
            this.listLoading = true
            deleteBasicData({"dataType": "category", "id": this.row.id}).then(response => {
                this.$refs[refname].doClose()
                if(response.data.result){
                    this.$notify({
                        title: 'Success',
                        message: 'Delete Successfully',
                        type: 'success',
                        duration: 2000
                    })
                    this.list.splice(this.index, 1)
                } else {
                    this.$notify({
                        title: 'Fail',
                        message: 'Delete Fail',
                        type: 'fail',
                        duration: 2000
                    })
                }
                this.row = null
                this.index = -1
            })
            this.listLoading = false
        }
    }
}
</script>

<style>
</style>
