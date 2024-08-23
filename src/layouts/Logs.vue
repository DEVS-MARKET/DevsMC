<template>
  <!-- Logs Title -->
  <div class="fix bg-zinc-900 rounded-lg p-3 w-[15rem] translate-x-[-40px] translate-y-[-20px]">
    <h1 class="text-[32px] ml-5 font-medium text-white">Logs</h1>
    <p class="text-[15px] ml-5 font-medium text-gray-300 mb-3">Game logs will appear here</p>
  </div>

  <!-- Console -->
  <div class="flex items-center justify-center">
    <div class="text-white bg-zinc-900 p-6 shadow-lg rounded-lg w-full max-w-6xl">
      <h2 class="text-xl mb-4 font-semibold">Game Output</h2>
      <div class="text-white bg-zinc-800 p-4 shadow-lg rounded-lg h-[calc(100vh-400px)] custom-scrollbar overflow-y-auto" ref="logs">
        <p v-for="(log, index) in logs" :key="index">[{{ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() }} {{ log.type }}] {{ log.log }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      logs: JSON.parse(localStorage.getItem('logs')) || [],
    };
  },
  mounted() {
    window.devsApi.onLogReceive((logs) => {
      this.logs.push(logs);
      this.$nextTick(() => {
        this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight;
      });
      localStorage.setItem('logs', JSON.stringify(this.logs));
    });
  }
}
</script>
