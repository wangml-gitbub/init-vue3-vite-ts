<template>
  <div class="left-sider-box">
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"  :inline-collapsed="collapse">
      <sub-menu :menu-list="menuList" />
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import SubMenu from './sub-menu.vue'
import useSystemStore from '@/store/modules/system'
import { useRouter } from 'vue-router'

const openKeys = ref<string[]>(['/flexmatch-simulate'])
const selectedKeys = ref<string[]>([])
const collapse = ref<boolean>(false)
const menuList: menuListItemType[] = useSystemStore().menuList
type menuListItemType = {
  name: string
  path: string
  icon: string
  children?: menuListItemType[]
}

const router = useRouter()
watch(
	() => router.currentRoute.value.path,
	newValue => {
		selectedKeys.value = []
		selectedKeys.value.push(newValue)
	}
)

onMounted(() => {
	selectedKeys.value = [router.currentRoute.value.path]
})

</script>

<style lang="less" scoped>
.left-sider-box::v-deep {
  height: 100%;
  background-color: rgb(229, 233, 232);
  margin-top: 3px;

  .ant-menu {
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
	.ant-menu-sub {
		padding: 0;
	}
	.ant-menu-item {
		padding: 0 20px 0 30px !important;
		border-radius: @borderRadius !important;
		margin: 5px 0 !important;
	}
	.ant-menu-item::after {
		border: 0 !important;
	}
	.ant-menu-item-selected {
		background: @activeBgColor !important;
		color: @activeColor !important;
		font-weight: 700 !important;
		border: 0 !important;
	}

	.ant-menu-item:hover {
		background: #f8f8f8 !important;
	}

	.ant-menu-submenu-title {
		padding-left: 30px !important;
		padding-right: 20px !important;

		.ant-menu-item {
			padding-left: 30px !important;
			padding-right: 20px !important;
		}
	}

	.ant-menu-sub.ant-menu-inline {
		background: #fff;
	}
	.ant-menu-sub {
		padding-left: 25px;
	}
		.anticon {
			font-size: 16px;
		}
  }
}
</style>
