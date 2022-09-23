<template>
  <component :is="'uvue-' + type" v-bind="$attrs" :dic="dic"></component>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DicItem } from "../../types";

import { useAttrs } from "vue";

import { useConfig, useDict } from "../../composables";

const props = defineProps({
  type: { type: String as PropType<"select" | "cascader" | "checkbox" | "radio" | "switch">, default: "select" },
  dic: { type: Array as PropType<DicItem> }
});

const dic = props.dic ?? useDict(useAttrs(), useConfig().request);
</script>
