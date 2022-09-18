import type { UnwrapRef } from "vue";

import { computed, getCurrentInstance, ref, watch } from "vue";

import { jsonClone } from "../utils";

export interface UseVModelOptions<T> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref.
   * Instead of relying on the `v-model` or `.sync` to work.
   *
   * @default false
   */
  passive?: boolean;
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string;
  /**
   * Attempting to check for changes of properties in a deeply nested object or array.
   * Apply only when `passive` option is set to `true`
   *
   * @default false
   */
  deep?: boolean;
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T;
  /**
   * Clone the props.
   * Accepts a custom clone function.
   * When setting to `true`, it will use `JSON.parse(JSON.stringify(value))` to clone.
   *
   * @default false
   */
  clone?: boolean | typeof jsonClone;
}

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param key (default 'value' in Vue 2 and 'modelValue' in Vue 3)
 * @param emit
 */
export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options: UseVModelOptions<P[K]> = {}
) {
  const { clone = false, passive = false, eventName, deep = false, defaultValue } = options;

  const vm = getCurrentInstance();
  const _emit = emit || vm?.emit || vm?.proxy?.$emit?.bind(vm?.proxy);

  if (!key) {
    key = "modelValue" as K;
  }

  const event = eventName || `update:${key!.toString()}`;

  const cloneFn = (val: P[K]) => (!clone ? val : typeof clone === "function" ? clone(val) : jsonClone(val));

  const getValue = () => (props[key!] !== undefined ? cloneFn(props[key!]) : defaultValue);

  if (passive) {
    const initialValue = getValue();
    const proxy = ref<P[K]>(initialValue!);

    watch(
      () => props[key!],
      v => (proxy.value = cloneFn(v) as UnwrapRef<P[K]>)
    );

    watch(
      proxy,
      v => {
        if (v !== props[key!] || deep) _emit!(event as Name, v);
      },
      { deep }
    );

    return proxy;
  } else {
    return computed<P[K]>({
      get() {
        return getValue()!;
      },
      set(value) {
        _emit!(event as Name, value);
      }
    });
  }
}
