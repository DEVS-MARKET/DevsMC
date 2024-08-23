<template>
  <!-- Author Title -->
  <div class="fix bg-zinc-900 rounded-lg p-3 w-[15rem] translate-x-[-40px] translate-y-[-20px]">
    <h1 class="text-[32px] ml-5 font-medium text-white">Authors</h1>
    <p class="text-[15px] ml-5 font-medium text-gray-300 mb-3">DevsMC Launcher Authors</p>
  </div>

  <!-- Author box -->
  <div class="flex items-center justify-center h-[calc(100vh-320px)]">
    <div class="text-center text-white bg-zinc-900 p-6 shadow-lg rounded-lg w-full max-w-4xl">

      <div class="flex items-center justify-center mb-6">
        <div class="flex items-center">
          <!-- Logo -->
          <img :src="`devsmc://devsmarket.png`" class="w-12 h-12 rounded-full flex items-center justify-center mr-4">
          <!-- DevsMarket Title -->
          <div class="text-left">
            <p class="text-sm text-gray-400">Created by</p>
            <h1 class="text-2xl text-white font-bold">DevsMarket</h1>
          </div>
        </div>
        <!-- Buttons -->
        <div class="ml-auto flex space-x-4">
          <a @click="openLink('https://github.com/DEVS-MARKET')" class="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 cursor-pointer">GitHub</a>
          <a @click="openLink('https://discord.gg/KhExwvqZb5')" class="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 cursor-pointer">Discord</a>
          <a @click="openLink('https://devsmarket.eu')" class="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 cursor-pointer">Website</a>
        </div>
      </div>

      <!-- Authors -->
      <div class="grid grid-cols-2 gap-4">
        <!-- 0WhiteDev -->
        <div class="bg-zinc-800 p-4 shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-[1.05]">
          <img src="https://avatars.githubusercontent.com/u/122921276?v=4" class="w-32 h-32 object-cover mb-4 rounded-md">
          <h2 class="text-xl font-semibold text-white text-center">0WhiteDev</h2>
          <p class="text-gray-400 mb-4 text-center">Frontend Developer</p>
          <div class="flex space-x-2">
            <!-- GitHub -->
            <svg @click="openLink('https://github.com/0WhiteDev')" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="cursor-pointer hover:text-gray-400 hover:fill-current">
              <rect width="24" height="24" fill="none" />
              <mask id="lineMdGithubLoop0" width="24" height="24" x="0" y="0">
                <g fill="#fff">
                  <ellipse cx="9.5" cy="9" rx="1.5" ry="1" />
                  <ellipse cx="14.5" cy="9" rx="1.5" ry="1" />
                </g>
              </mask>
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="30" stroke-dashoffset="30" d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="30;0" />
                </path>
                <path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="10;0" />
                  <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5" />
                </path>
              </g>
              <rect width="8" height="4" x="8" y="11" fill="currentColor" mask="url(#lineMdGithubLoop0)">
                <animate attributeName="y" dur="10s" keyTimes="0;0.45;0.46;0.54;0.55;1" repeatCount="indefinite" values="11;11;7;7;11;11" />
              </rect>
            </svg>

            <!-- YouTube -->
            <svg @click="openLink('https://www.youtube.com/@0whitedev')" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="cursor-pointer hover:text-gray-400 hover:fill-current">
              <rect width="24" height="24" fill="none" />
              <path fill="none" stroke="currentColor" stroke-dasharray="60" stroke-dashoffset="60" stroke-linecap="round" stroke-width="2" d="M12 5C21 5 21 5 21 12C21 19 21 19 12 19C3 19 3 19 3 12C3 5 3 5 12 5z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="60;0" />
              </path>
              <path fill="currentColor" fill-opacity="0" d="M10 8.5L16 12L10 15.5z">
                <set attributeName="fill-opacity" begin="0.7s" to="1" />
                <animate fill="freeze" attributeName="d" begin="0.7s" dur="0.2s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z" />
              </path>
            </svg>
          </div>
        </div>
        <!-- khaller -->
        <div class="bg-zinc-800 p-4 shadow-md rounded-lg flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-[1.05]">
          <img src="https://avatars.githubusercontent.com/u/60399586?v=4" class="w-32 h-32 object-cover mb-4 rounded-md">
          <h2 class="text-xl font-semibold text-white text-center">Krzysztof Haller</h2>
          <p class="text-gray-400 mb-4 text-center">Backend Developer</p>
          <div class="flex space-x-2">

            <!-- GitHub -->
            <svg @click="openLink('https://github.com/Hyd3r1')" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="cursor-pointer hover:text-gray-400 hover:fill-current">
              <rect width="24" height="24" fill="none" />
              <mask id="lineMdGithubLoop0" width="24" height="24" x="0" y="0">
                <g fill="#fff">
                  <ellipse cx="9.5" cy="9" rx="1.5" ry="1" />
                  <ellipse cx="14.5" cy="9" rx="1.5" ry="1" />
                </g>
              </mask>
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="30" stroke-dashoffset="30" d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="30;0" />
                </path>
                <path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="10;0" />
                  <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5" />
                </path>
              </g>
              <rect width="8" height="4" x="8" y="11" fill="currentColor" mask="url(#lineMdGithubLoop0)">
                <animate attributeName="y" dur="10s" keyTimes="0;0.45;0.46;0.54;0.55;1" repeatCount="indefinite" values="11;11;7;7;11;11" />
              </rect>
            </svg>

            <!-- Web -->
            <svg @click="openLink('https://www.khaller.com/')" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="cursor-pointer hover:text-gray-400 hover:fill-current">
              <rect width="24" height="24" fill="none" />
              <mask id="lineMdCloudBracesLoop0">
                <g fill="#fff">
                  <circle cx="12" cy="10" r="6">
                    <animate attributeName="cx" dur="30s" repeatCount="indefinite" values="12;13;12" />
                  </circle>
                  <rect width="9" height="7" x="8" y="13" />
                  <rect width="15" height="12" x="1" y="8" rx="6">
                    <animate attributeName="x" dur="15s" repeatCount="indefinite" values="1;0;1;2;1" />
                  </rect>
                  <rect width="13" height="10" x="10" y="10" rx="5">
                    <animate attributeName="x" dur="15s" repeatCount="indefinite" values="10;11;10;9;10" />
                  </rect>
                </g>
                <path d="M18.5 12H18a1 1 0 0 1-1-1v-1a2 2 0 0 0-2-2h-1.5v2H15v1a2 2 0 0 0 2 2 2 2 0 0 0-2 2v1h-1.5v2H15a2 2 0 0 0 2-2v-1a1 1 0 0 1 1-1h.5v-2Z">
                  <animateMotion calcMode="linear" dur="6s" keyPoints="0;0.25;0.5;0.75;1" keyTimes="0;0.1;0.5;0.8;1" path="M0 0h-1h2z" repeatCount="indefinite" />
                </path>
                <path d="M5.5 12v2H6a1 1 0 0 1 1 1v1a2 2 0 0 0 2 2h1.5v-2H9v-1a2 2 0 0 0-2-2 2 2 0 0 0 2-2v-1h1.5V8H9a2 2 0 0 0-2 2v1a1 1 0 0 1-1 1h-.5Z">
                  <animateMotion calcMode="linear" dur="6s" keyPoints="0;0.25;0.5;0.75;1" keyTimes="0;0.1;0.5;0.8;1" path="M0 0h1h-2z" repeatCount="indefinite" />
                </path>
              </mask>
              <rect width="24" height="24" fill="currentColor" mask="url(#lineMdCloudBracesLoop0)" />
            </svg>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    openLink(link){
      window.open(link, '_blank', `width=${screen.width},height=${screen.height}`);
    }
  }
}
</script>