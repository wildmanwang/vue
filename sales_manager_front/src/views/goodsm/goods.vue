<template>
    <div class="app-container">
    </div>
</template>

<script>
import { fetchBasicDataList } from '@/api/goodsm'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
    name: 'Goods',
    components: { Pagination },
    data() {
        return {
            queryStr: '',
            list: null,
            total: 0,
            listQuery: {
                page: 1,
                limit: 10
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            fetchBasicDataList({"dataType": "goods", "query": {}, "page": this.listQuery}).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        }
    }
}
</script>

<style>
</style>
