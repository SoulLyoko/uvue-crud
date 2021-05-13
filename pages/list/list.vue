<template>
	<view>
		<uvue-list :option="option" :data="data">
			<template #searchTop>
				<view>slot:searchTop</view>
			</template>
			<template #listTop>
				<view>slot:listTop</view>
			</template>
			<template #listBottom>
				<view>slot:listBottom</view>
			</template>
			<template #title="{row}">
				<view>{{ row.title }}</view>
			</template>
			<template #content="{row}">
				<view>{{ row.content }}</view>
			</template>
			<template #right="{row}">
				<view>{{ row.time }}</view>
			</template>
		</uvue-list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			option: {
				formPath: '/pages/form/form'
			},
			data: [
				{
					title: 'title1',
					content: 'content1',
					time: new Date().toLocaleDateString()
				},
				{
					title: 'title2',
					content: 'content2',
					time: new Date().toLocaleDateString()
				},
				{
					title: 'title3',
					content: 'content3',
					time: new Date().toLocaleDateString()
				}
			]
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style></style>
