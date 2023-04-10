<template>
	<a-layout class="layout-box">
		<LayoutHeader/>

		<a-layout>
			<a-layout-sider v-model:collapsed="collapsed" collapsible :width="360" theme="light">
				<LayoutLeftSider/>
			</a-layout-sider>

			<a-layout class="right-main-box">
				<router-view></router-view>
			</a-layout>
		</a-layout>
	</a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LayoutHeader from './components/header.vue'
import LayoutLeftSider from './components/left-sider.vue'

const collapsed = ref<boolean>(false)
</script>

<style lang="less" scoped>
.layout-box::v-deep {
	height: 100%;

	>.ant-layout {
		height: 100%;
		margin: 10px 0 0 0;
	}

	.ant-layout-sider {
			.ant-layout-sider-trigger {
				background-color: #137bdc0d;
			}
		}
	

	.right-main-box {
		background: #fff;
		padding: 20px;
		margin: 0 10px 10px 10px;
		min-height: 280px;
		border-radius: @borderRadius;
	}
}
</style>
