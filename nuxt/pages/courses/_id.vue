<template>
  <div class="flex flex-col gap-2">
    <div class="relative flex flex-col justify-center p-8">
      <div class="absolute inset-0 h-full">
        <img
          class="h-full w-full object-cover"
          src="https://dreamslms.dreamguystech.com/html/assets/img/inner-banner.jpg"
          alt=""
        />
        <div class="absolute inset-0 h-full w-full bg-black opacity-75"></div>
      </div>
      <div
        class="container relative mx-auto flex flex-col justify-center gap-2 text-white"
      >
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <img
              class="h-12 w-12 rounded-full border-2 border-black object-cover"
              src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg"
              alt=""
            />
            <div class="mt-1 flex flex-col">
              <div class="-mb-2 text-lg font-bold">Nicole Brown</div>
              <div class="text-gray-200">ui ux designer</div>
            </div>
          </div>
          <div class="">
            <div
              class="inline-flex items-center gap-2 rounded bg-indigo-50/10 py-1 px-2 text-lg text-indigo-200 backdrop-blur"
            >
              <span class="opacity-0"> web development </span>
              <span class="absolute"> web development </span>
            </div>
          </div>
        </div>
        <div class="text-3xl font-bold">
          The Complete Web Developer Course 2.0
        </div>
        <div class="text-lg text-gray-300">
          Learn Web Development by building 25 websites and mobile apps using
          HTML, CSS, Javascript, PHP, Python, MySQL & more!
        </div>
        <div class="mt-2 flex flex-row-reverse justify-end gap-2">
          <div
            class="inline-flex items-center gap-2 rounded bg-indigo-300 bg-opacity-20 py-1 px-1 pl-2 text-indigo-100 backdrop-blur"
          >
            <div>
              <svg class="aspect-square w-7" viewBox="0 0 256 256">
                <circle
                  cx="128"
                  cy="128"
                  r="88"
                  fill="currentColor"
                  opacity=".2"
                />
                <path
                  fill="currentColor"
                  d="M128 32a96 96 0 1 0 96 96a96.2 96.2 0 0 0-96-96Zm0 176a80 80 0 1 1 80-80a80.1 80.1 0 0 1-80 80Z"
                />
                <path
                  fill="currentColor"
                  d="m161.9 82.7l-39.6 39.6a8.1 8.1 0 0 0 0 11.4a8.2 8.2 0 0 0 11.4 0l39.6-39.6a8.1 8.1 0 1 0-11.4-11.4ZM104 16h48a8 8 0 0 0 0-16h-48a8 8 0 0 0 0 16Z"
                />
              </svg>
            </div>
            <div class="font-semiboldw mt-0.5">50 ساعت</div>
          </div>
          <div
            class="inline-flex items-center gap-2 rounded bg-indigo-300 bg-opacity-20 py-1 px-1 pl-2 text-indigo-100 backdrop-blur"
          >
            <div>
              <svg class="aspect-square w-7" viewBox="0 0 256 256">
                <path
                  fill="currentColor"
                  d="M48 216a23.9 23.9 0 0 1 24-24h136V32H72a23.9 23.9 0 0 0-24 24Z"
                  opacity=".2"
                />
                <path
                  fill="currentColor"
                  d="M208 24H72a32.1 32.1 0 0 0-32 32v168a8 8 0 0 0 8 8h144a8 8 0 0 0 0-16H56a16 16 0 0 1 16-16h136a8 8 0 0 0 8-8V32a8 8 0 0 0-8-8Zm-8 160H72a32.2 32.2 0 0 0-16 4.3V56a16 16 0 0 1 16-16h128Z"
                />
              </svg>
            </div>
            <div class="font-semiboldw mt-0.5">12 جلسه</div>
          </div>
        </div>
      </div>
    </div>

    <section class="container mx-auto flex gap-2">
      <div class="w-2/3">
        <div class="mt-8 rounded-lg border bg-white p-6">
          <h2 class="text-lg font-bold text-indigo-500">درباره آموزش</h2>

          <div class="mt-4 w-24">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos id,
            consequatur ut facere quaerat totam atque vel? Neque similique
            nesciunt harum distinctio temporibus cupiditate ipsam dolores fugit
            velit.
          </div>
        </div>
        <div class="mt-8 rounded-lg border bg-white p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-indigo-500">جلسات دوره</h2>
            <div class="flex gap-2">
              <span class="text-sm text-gray-600">
                <strong> 92 </strong>
                جلسه
              </span>
              .
              <span class="text-gray-600">
                <strong> 10:56:11 </strong>
                ساعت
              </span>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-1">
            <div
              v-for="i in 4"
              :key="i"
              class="flex w-full items-center rounded border border-blue-50 bg-blue-50 bg-opacity-50 p-4 hover:bg-opacity-100"
            >
              <div class="w-8 flex-shrink-0 text-blue-400">
                <svg width="1em" height="1em" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M240 128a16.1 16.1 0 0 1-7.7 13.7l-144 87.9a15.5 15.5 0 0 1-16.1.3A15.8 15.8 0 0 1 64 216V40a15.8 15.8 0 0 1 8.2-13.9a15.5 15.5 0 0 1 16.1.3l144 87.9A16.1 16.1 0 0 1 240 128Z"
                  />
                </svg>
              </div>
              <div class="w-full">What is programming?</div>
              <div class="font-mono text-gray-500">05:34</div>
            </div>
          </div>
        </div>
        <CommentSection class="mt-8" />
        <div class="mt-8 mb-8 rounded-lg border bg-white">
          <div class="flex items-center justify-between px-6 pt-6">
            <h2 class="text-lg font-bold text-indigo-500">دیدگاه</h2>
            <div class="flex gap-2">
              <span class="text-sm text-gray-600">
                <strong> 12 </strong>
                دیدگاه
              </span>
            </div>
          </div>
          <div
            v-for="i in 4"
            :key="i"
            class="mt-4 flex flex-col gap-1 bg-opacity-75 px-6 py-4 odd:bg-slate-100"
          >
            <div>
              <div class="mb-1 flex items-center justify-between">
                <div>
                  <div class="text-sm font-bold">مهدیار اناری</div>

                  <div class="mt-1 text-xs text-gray-500">1 هفته پیش</div>
                </div>
                <div class="flex">
                  <svg
                    class="aspect-square w-4 text-yellow-400"
                    viewBox="0 2.4 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                    />
                  </svg>
                  <svg
                    class="aspect-square w-4 text-yellow-400"
                    viewBox="0 2.4 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                    />
                  </svg>
                  <svg
                    class="aspect-square w-4 text-yellow-400"
                    viewBox="0 2.4 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                    />
                  </svg>
                  <svg
                    class="aspect-square w-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
                    />
                  </svg>
                  <svg
                    class="aspect-square w-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
                    />
                  </svg>
                </div>
              </div>

              <hr class="mb-4 mt-2" />
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                voluptates odit illum repellendus consectetur aliquid commodi
                temporibus, deserunt dolorum. Illo deleniti alias saepe quis
                sapiente voluptates minus cum ab repellat.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/3">
        <div class="mt-8 rounded-lg border bg-white p-6">
          <div class="relative aspect-video">
            <img
              class="h-full w-full rounded object-cover"
              src="https://dreamslms.dreamguystech.com/html/assets/img/video.jpg"
              alt=""
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-slate-400 bg-opacity-40 backdrop-blur"
              >
                <svg class="h-10 w-10 text-slate-900" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M80 232a15.5 15.5 0 0 1-7.8-2.1A15.8 15.8 0 0 1 64 216V40a15.8 15.8 0 0 1 8.2-13.9a15.5 15.5 0 0 1 16.1.3l144 87.9a16 16 0 0 1 0 27.4l-144 87.9A15.4 15.4 0 0 1 80 232Zm0-192v176l144-88Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div></div>
          <h2 class="text-rigth mt-4 text-lg">
            The Complete Web Developer Course 2.0
          </h2>
          <div class="text-left text-xl">
            <div class="flex flex-col">
              <span class="-mb-2 text-3xl font-bold text-gray-900">
                300,000
              </span>
              <span class="text-base text-gray-600"> تومان </span>
            </div>
          </div>
          <div class="relative mt-4 text-left text-lg">
            <!-- <div
              aria-hidden="true"
              class="hiddenabsolute top-0 flex w-full items-center justify-center gap-2 rounded-sm bg-green-500 py-2 text-white opacity-60 blur-lg hover:bg-green-400"
            >
              asdasd
            </div> -->
            <button
              class="relative flex w-full items-center justify-center gap-2 rounded-sm bg-green-500 py-2 text-white shadow-lg shadow-green-500/50 hover:bg-green-400"
            >
              <span>
                <svg class="h-4 w-4" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"
                  />
                </svg>
              </span>
              اضافه کردن به کارت
            </button>

            <hr class="my-4" />

            <div class="mt-4 grid grid-cols-4 justify-center text-slate-700">
              <div
                @click="share('telegram')"
                class="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100 hover:text-indigo-500"
              >
                <svg class="aspect-auto w-7" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M470.435 45.423L16.827 221.249c-18.254 8.188-24.428 24.585-4.412 33.484l116.37 37.173l281.368-174.79c15.363-10.973 31.091-8.047 17.557 4.024L186.053 341.075l-7.591 93.076c7.031 14.371 19.905 14.438 28.117 7.295l66.858-63.589l114.505 86.187c26.595 15.826 41.066 5.613 46.788-23.394l75.105-357.47c7.798-35.705-5.5-51.437-39.4-37.757z"
                  />
                </svg>
              </div>

              <div
                @click="share('instagram')"
                class="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100 hover:text-indigo-500"
              >
                <svg class="aspect-auto w-7" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
                  />
                </svg>
              </div>

              <div
                @click="share('linkedin')"
                class="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100 hover:text-indigo-500"
              >
                <svg class="aspect-auto w-7" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                  />
                </svg>
              </div>
              <div
                @click="share('whatsapp')"
                class="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-100 hover:text-indigo-500"
              >
                <svg class="aspect-auto w-7" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-8 mb-4 flex flex-col items-center rounded-lg border bg-white p-6"
        >
          <div class="relative">
            <div
              class="border-3 group relative h-16 w-16 overflow-hidden rounded-full border-solid border-gray-200 bg-gray-300"
            >
              <span href="/@hesammousavi">
                <img
                  class="h-full w-full transform transition duration-200 group-hover:scale-110"
                  src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg"
                  alt="user-avatar"
                />
                <div class="h-full w-full bg-opacity-20"></div>
              </span>
            </div>
          </div>
          <!-- Livewire Component wire-end:0v7kaUiD4uiSu8tJEBFp -->
          <div class="mt-2 text-center">
            <h6>
              <a
                class="group flex items-center text-xl font-bold leading-3 text-indigo-600 transition duration-200"
                href="/@hesammousavi"
                >حسام موسوی
                <svg
                  class="mr-1 text-blue-700 transition duration-200"
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6936 9.39221C16.6936 9.97583 16.5534 10.5171 16.273 11.0127C15.9926 11.5083 15.6176 11.8962 15.1448 12.1669C15.1579 12.2549 15.1644 12.3918 15.1644 12.5777C15.1644 13.4613 14.8677 14.2112 14.2808 14.8307C13.6907 15.4534 12.9799 15.7632 12.1485 15.7632C11.7768 15.7632 11.4214 15.6947 11.0856 15.5577C10.8247 16.0925 10.4498 16.5228 9.95745 16.8521C9.46838 17.1847 8.9304 17.3477 8.34678 17.3477C7.75012 17.3477 7.20888 17.188 6.72633 16.8619C6.24052 16.5391 5.86883 16.1055 5.60799 15.5577C5.27217 15.6947 4.92004 15.7632 4.54508 15.7632C3.71367 15.7632 2.99962 15.4534 2.40296 14.8307C1.8063 14.2112 1.50959 13.458 1.50959 12.5777C1.50959 12.4799 1.52264 12.3429 1.54546 12.1669C1.07269 11.893 0.697739 11.5083 0.417339 11.0127C0.1402 10.5171 0 9.97583 0 9.39221C0 8.77272 0.156502 8.20214 0.466246 7.68699C0.77599 7.17184 1.19333 6.79036 1.715 6.54257C1.57806 6.17088 1.50959 5.79592 1.50959 5.42423C1.50959 4.5439 1.8063 3.79074 2.40296 3.17125C2.99962 2.55176 3.71367 2.23876 4.54508 2.23876C4.91678 2.23876 5.27217 2.30723 5.60799 2.44417C5.86883 1.90945 6.24378 1.47907 6.73611 1.14976C7.22518 0.820458 7.76316 0.654175 8.34678 0.654175C8.9304 0.654175 9.46838 0.820458 9.95745 1.1465C10.4465 1.47581 10.8247 1.90619 11.0856 2.44091C11.4214 2.30397 11.7735 2.2355 12.1485 2.2355C12.9799 2.2355 13.6907 2.54524 14.2808 3.16799C14.871 3.79074 15.1644 4.54064 15.1644 5.42097C15.1644 5.83179 15.1025 6.20348 14.9786 6.53931C15.5002 6.7871 15.9176 7.16858 16.2273 7.68373C16.5371 8.20214 16.6936 8.77272 16.6936 9.39221ZM7.99139 11.906L11.4377 6.74472C11.5257 6.60778 11.5518 6.4578 11.5225 6.29803C11.4899 6.13827 11.4084 6.01111 11.2714 5.92634C11.1345 5.83831 10.9845 5.80896 10.8247 5.83179C10.6617 5.85787 10.5313 5.93612 10.4335 6.07306L7.39799 10.6377L5.99925 9.24223C5.87535 9.11833 5.73189 9.05964 5.57213 9.06616C5.4091 9.07269 5.26891 9.13137 5.14501 9.24223C5.03415 9.35308 4.97872 9.49328 4.97872 9.66283C4.97872 9.82911 5.03415 9.96931 5.14501 10.0834L7.06542 12.0038L7.15997 12.0788C7.27083 12.1538 7.38494 12.1897 7.4958 12.1897C7.71425 12.1864 7.88053 12.0951 7.99139 11.906Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </h6>
            <span class="-mt-2 text-sm text-gray-500">مدرس دوره</span>
          </div>
          <p
            class="text-gray-360 text-15 dark:text-gray-920 mt-1.5 text-center leading-6"
          >
            اول داستان، طراح گرافیک بودم و ۲ سالی به عنوان طراح مشغول بودم، بعد
            به برنامه&zwnj;نویسی علاقمند شدم و الان بیشتر از ۱۰ ساله که عاشق
            کدزنی و چالش&zwnj;های پروژه&zwnj;های مختلفم. به تدریس علاقه خاصی
            دارم و دوست دارم دانشی که در این راه بدست آوردم را در اختیار
            دیگران...
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import CommentSection from '@/components/misc/CommentSection.vue'

function share(social: 'telegram' | 'instagram' | 'linkedin' | 'whatsapp') {
  console.log(social)
}
</script>
