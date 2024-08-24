<template>
  <!-- Main Accounts Screen -->
  <div id="login-comp" class="bg-zinc-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full opacity-1 transform scale-[0.1] transition-transform duration-300">
    <!-- Title -->
    <h2 class="text-xl font-semibold">Add New Account</h2>
    <p class="text-s text-gray-400 mb-4">Login to your new account</p>

    <div class="mb-6">
      <label for="bg-label" class="block text-sm font-medium">Nickname</label>
      <input v-model="nickname" type="text" maxlength="16" placeholder="nickname" class="block w-full p-2 bg-zinc-700 border border-gray-600 rounded text-white mt-1 placeholder-gray-500 mb-2">
    </div>

    <!-- Buttons -->
    <div class="flex justify-between">
      <button @click="addNonPremium()" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">Add new Account</button>
      <button @click="loginMicrosoft()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">Login by Microsoft</button>
      <button @click="closeWindow()" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
    };
  },
  methods: {
    async loginMicrosoft() {
      const response = await window.devsApi.login();
      if (response) {
        this.$emit('created-account', response);
        this.closeWindow();
      }
    },
    async addNonPremium() {
      const response = await window.devsApi.nopremium(this.nickname);
      if (response) {
        this.$emit('created-account', response);
        this.closeWindow();
      }
      this.nickname = '';
    },
    closeWindow(){
      if (JSON.parse(localStorage.getItem('selectedAccount'))) {
        const loginComp = document.getElementById('login-comp');
        if(loginComp){
          loginComp.classList.add('scale-[0.1]');
          setTimeout(() => {
            loginComp.classList.remove('scale-[0.1]')
            this.$emit('closed');
          }, 300);
        }
      }

      return;
    }
  }
}
</script>