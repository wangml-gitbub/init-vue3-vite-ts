<template>
	<svg :style="iconStyle" aria-hidden="true">
		<use :xlink:href="symbolId" />
	</svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { CSSProperties, computed } from 'vue'

interface ISvgProps {
	name: string // 图标名称
	prefix?: string // 图标前缀
	iconStyle?: CSSProperties // 图标样式
}

const props = withDefaults(defineProps<ISvgProps>(), {
	prefix: 'icon',
	iconStyle: () => ({ width: '16px', height: '16px' })
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
