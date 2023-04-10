<template>
	<div class="login-page flex-col-center-center">
		<a-empty description="暂未开发 - login-page" />
		<backward-outlined />
		<div>{{ $t('download') }}</div>
		<CountUp :end="1000" />
		<SvgIcon name="s3" :icon-style="{ width: '36px', height: '36px' }" />
		<a-button type="primary" @click="onLogin">点击此处，进入主界面</a-button>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const onLogin = () => {
	localStorage.clear()
	router.push('/dashboard')
}
</script>

<style lang="less" scoped>
.login-page {
	width: 100%;
	height: 100%;
	font-size: 20px;
}
</style>
