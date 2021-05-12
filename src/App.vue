<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { requestDemo } from "./api";
export default {
  async mounted() {
    console.log(await requestDemo());
  },
  data: () => ({}),
  components: {},
  methods: {},
};
</script>
