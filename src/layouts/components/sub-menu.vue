<template>
	<template v-for="subItem in menuList" :key="subItem.name">
		<a-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.path">
			<template #icon>
				<component :is="subItem.icon"></component>
			</template>
			<template #title>
				<span>{{ subItem.name }}</span>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</a-sub-menu>
		<a-menu-item v-else :key="subItem.path + ''" @click="handleClickMenu(subItem)">
			<template #icon>
				<component :is="subItem.icon"></component>
			</template>
			<span>{{ subItem.name }}</span>
		</a-menu-item>
	</template>
</template>

<script lang="ts" setup name="SubMenu">
import { useRouter } from 'vue-router'
interface MenuOptions {
	name: string
	path: string
	icon: string
	children?: MenuOptions[]
}

defineProps<{
	menuList: MenuOptions[]
}>()

const router = useRouter()
const handleClickMenu = (subItem: MenuOptions) => {
	router.push(subItem.path)
}
</script>