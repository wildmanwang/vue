<template>
    <div class="app-container">
    </div>
</template>

<script>
import { fetchBasicDataList } from '@/api/goodsm'

export default {
    name: 'Goods',
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
            fetchBasicDataList({"dataType": "goods"}).then(response => {
                this.list = response.data.items
                this.listLoading = false
            })
        }
    }
}
</script>

<style>
</style>
