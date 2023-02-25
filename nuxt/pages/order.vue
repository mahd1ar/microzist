<template>
  <div>
    <div>
      <!--
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]
-->

      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          v-if="$route.query.success === '1'"
          class="mx-auto max-w-lg text-center"
        >
          <h1
            class="text-2xl font-bold  rounded items-center text-green-700 bg-green-50 gap-4 flex-row-reverse px-6 py-2 inline-flex"
          >
            پرداخت با موفقیت انجام شد
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-10 h-10"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-dasharray="24"
                  stroke-dashoffset="24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 11L11 17L21 7"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="24;0"
                  />
                </path>
              </svg>
            </span>
          </h1>
        </div>
        <div v-else class="mx-auto max-w-lg text-center">
          <h1
            class="text-2xl font-bold  rounded items-center text-red-700 bg-red-50 gap-4 flex-row-reverse px-6 py-2 inline-flex"
          >
            پرداخت موفقیت آمیز نبود
            <span>
              <svg class="w-10 h-10" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="60"
                    stroke-dashoffset="60"
                    d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.5s"
                      values="60;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="8"
                    stroke-dashoffset="8"
                    d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.6s"
                      dur="0.2s"
                      values="8;0"
                    />
                  </path>
                </g>
              </svg>
            </span>
          </h1>
        </div>

        <form action="" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <div>
            <div class="relative flex  items-center">
              <span class=" px-4 text-gray-900 font-bold text-lg w-3/12">
                order id
              </span>
              <input
                :value="$route.query.orderId"
                type="text"
                disabled
                class="w-9/12  border-gray-200 p-4 pr-12 text-xl font-mono  shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <div class="relative flex  items-center">
              <span class=" px-4 text-gray-900 font-bold text-lg w-3/12">
                track id
              </span>
              <input
                :value="$route.query.trackId"
                type="text"
                disabled
                class="w-9/12  border-gray-200 p-4 pr-12 text-xl font-mono  shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <nuxt-link
              to="/"
              class="inline-block  bg-black px-5 py-3 text-sm font-medium text-white"
            >
              بازگشت به خانه
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
