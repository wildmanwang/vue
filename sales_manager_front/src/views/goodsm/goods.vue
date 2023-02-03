<template>
    <div class="app-container">
    </div>
</template>

<script>
import { fetchBasicDataList, deleteBasicData, newBasicData, modifyBasicData } from '@/api/goodsm'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
    name: 'Goods',
    components: { Pagination },
    data() {
        return {
            qName: '',
            qStatus: 1,
            list: null,
            total: 0,
            // 数据分页、排序
            listPage: {
                page: 1,
                limit: 10,
                sortCol: '',
                sortType: 'asc'
            },
            // 单条数据
            temp: {
                id: undefined,
                name: '',
                order_num: 80,
                status: 1
            },
            row: null,
            index: -1,
            dataDialogTitle: "商品 - 新增",
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
            // 查询数据
            this.listLoading = true
            fetchBasicDataList({ "dataType": "goods", "query": this.listQuery, "page": this.listPage }).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        }
    },
    computed: {
        listQuery() {
            // 生成查询条件
            return {para: [
                { colname: "name", oper: "like", value: this.qName + "%" },
                { colname: "status", oper: "==", value: this.qStatus }
            ]}
        }
    }
}
</script>

<style>
</style>
