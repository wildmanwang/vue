<template>
    <div class="app-container">
        <el-col :span="12">
            <el-input v-model="queryStr" placeholder="请输入供应商名称" size="small"></el-input>
        </el-col>
        <el-button type="primary" size="small">查询</el-button>
        <el-button type="danger" size="small">新增</el-button>
        <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%">
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
            <el-table-column label="简称" width="160" align="left">
                <template slot-scope="{row}">
                    {{ row.simple_name }}
                </template>
            </el-table-column>
            <el-table-column label="代码" width="100" align="center">
                <template slot-scope="{row}">
                    {{ row.code }}
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
                    <el-button type="primary" size="mini">
                        修改
                    </el-button>
                    <el-button type="success" size="mini">
                        查看
                    </el-button>
                    <el-button type="danger" size="mini">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchBasicDataList } from '@/api/goodsm'

export default {
    name: 'Supplier',
    data() {
        return {
            queryStr: '',
            list: null
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            fetchBasicDataList({"dataType": "supplier", "query": {}}).then(response => {
                this.list = response.data.items
                this.listLoading = false
            })
        }
    }
}
</script>

<style>
</style>
