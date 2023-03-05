<template>
  <div>
    <div class="flex gap-4">
      <div class="w-full">
        <div>
          <div>
            <div class="flex flex-row-reverse justify-between">
              <div class="flex gap-1">
                <svg class="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M13 9h4.5l-.5 2h-4v9h-2v-9H7V9h4V7.128c0-1.783.186-2.43.534-3.082a3.635 3.635 0 0 1 1.512-1.512C13.698 2.186 14.345 2 16.128 2c.522 0 .98.05 1.372.15V4h-1.372c-1.324 0-1.727.078-2.138.298c-.304.162-.53.388-.692.692c-.22.411-.298.814-.298 2.138V9z"
                  />
                </svg>
                <svg class="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.437 20.937H5.563a2.5 2.5 0 0 1-2.5-2.5V5.563a2.5 2.5 0 0 1 2.5-2.5h12.874a2.5 2.5 0 0 1 2.5 2.5v12.874a2.5 2.5 0 0 1-2.5 2.5ZM5.563 4.063a1.5 1.5 0 0 0-1.5 1.5v12.874a1.5 1.5 0 0 0 1.5 1.5h12.874a1.5 1.5 0 0 0 1.5-1.5V5.563a1.5 1.5 0 0 0-1.5-1.5Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 16.594A4.595 4.595 0 1 1 16.6 12a4.6 4.6 0 0 1-4.6 4.594ZM12 8.4a3.595 3.595 0 1 0 3.6 3.6A3.6 3.6 0 0 0 12 8.4Z"
                  />
                  <circle cx="17.2" cy="6.83" r="1.075" fill="currentColor" />
                </svg>
                <svg class="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 9.55C12.917 8.613 14.111 8 15.5 8a5.5 5.5 0 0 1 5.5 5.5V21h-2v-7.5a3.5 3.5 0 0 0-7 0V21h-2V8.5h2v1.05zM5 6.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm-1 2h2V21H4V8.5z"
                  />
                </svg>
              </div>
              <div class="">
                <h1 class="text-3xl">
                  Delion Anderson
                </h1>
                <div class="text-sky-500">
                  A certified instructor from Acadu
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 text-sm py-2 my-4 border-y">
          <div class="flex flex-col gap-1">
            <span>
              تعداد آموزش ها: 4
            </span>
            <span>
              تداد دانشجو ها: 50
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <div>
              نظرات
            </div>

            <div class="flex gap-1 text-sky-500">
              <svg v-for="i in 3" class="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <span>
              تجربیات
            </span>
            <span>
              10 سال
            </span>
          </div>
        </div>
        <div class="">
          <h2 class="mt-6 text-xl font-semibold mb-4">
            بیوگرافی
          </h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          eaque pariatur facilis distinctio repudiandae at nulla ad illo dolorem
          reiciendis perspiciatis magni unde inventore velit, quos numquam cum.
          Voluptatem, tenetur.
        </div>
      </div>
      <div
        class="max-w-sm rounded-xl overflow-hidden flex-shrink-0 border shadow"
      >
        <img
          src="https://angfuzsoft.com/html/acadu/demo/assets/img/team/team_details_1.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
