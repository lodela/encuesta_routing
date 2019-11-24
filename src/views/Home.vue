<template>
  <div class="home content">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
.home{
  margin: 90px 0 0 0;

  &.content{
    flex: 1;
  }
}
</style>
