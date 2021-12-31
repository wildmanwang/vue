// 注册子组件
// 将当前消息派发出去
Vue.component('child', {
	template: `<input v-model="msg">
    <button v-on:click="notify">Dispatch Event</button>`,
	data: function () {
		return { msg: 'hello' }
	},
	methods: {
		notify: function () {
			if (this.msg.trim()) {
				this.$dispatch('child-msg', this.msg)
				this.msg = ''
			}
		}
	}
})
