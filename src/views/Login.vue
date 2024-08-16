<script>
export default {
  name: "Login",
  methods: {
    async testLogin() {
      window.devsApi.login();
    }
  }
}
</script>

<template>
 <!-- A login form with accounts in second div -->
  <div class="flex col gap-2 items-center justify-center h-screen">

    <div class="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dodaj nowe konto</h5>

      <button type="button" @click="testLogin" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Login via Microsoft
      </button>

      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Non-Premium Account
      </button>


    </div>

    <div class="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">

      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>

  </div>
</template>

<style scoped>

</style>