<template>
  <div class="flex shadow-sm group ease-out w-full">
    <div
      class="rounded-lg w-full relative p-5 bg-white   duration-500 transition-colors group-hover:bg-indigo-800"
    >
      <div class="rounded overflow-hidden relative  duration-500">
        <img
          class="w-full h-56 object-cover rounded  group-hover:scale-110 duration-1000 transition-transform ease-out "
          alt=""
          :src="props.image"
        />

        <div
          class=" p-1 fa-num  rounded absolute  bg-black  backdrop-blur left-2 bottom-2"
        >
          <h3
            class=" flex flex-row-reverse gap-2 justify-between items-center "
            dir="ltr"
          >
            <div class="text-lg text-indigo-300 font-semibold">
              {{ props.price }}
            </div>
            <span class="text-sm text-white">
              تومان
            </span>
          </h3>
        </div>
      </div>
      <div class="pt-4">
        <div class="w-full inline-block">
          <div class=" flex gap-2">
            <a
              class="rounded-full w-12 h-12 overflow-hidden"
              href="instructor-profile.html"
            >
              <img
                src="https://dreamslms.dreamguystech.com/html/assets/img/user/user5.jpg"
                alt=""
                class="w-full h-full"
            /></a>

            <div class="course-name">
              <h4 class="text-neutral-800 group-hover:text-white font-semibold">
                <a href="instructor-profile.html">{{ props.teacherName }}</a>
              </h4>
              <p class="text-sm text-neutral-500 group-hover:text-indigo-100">
                مدرس
              </p>
            </div>
          </div>
        </div>
        <h3 class="text-xl mb-2 group-hover:text-white">
          <a href="course-details.html">{{ props.title }}</a>
        </h3>
        <div
          class="course-info flex items-center justify-between group-hover:text-indigo-100"
        >
          <div class="flex items-center gap-1">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 8.775q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375T17.5 7.5q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113Q17.9 9 17.5 9q-.65 0-1.275.125q-.625.125-1.2.325q-.45.175-.737-.025q-.288-.2-.288-.65Zm0 5.5q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375T17.5 13q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113q-.388-.037-.788-.037q-.65 0-1.275.113q-.625.112-1.2.312q-.45.175-.737-.013q-.288-.187-.288-.637Zm0-2.75q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375t1.525-.125q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113q-.388-.037-.788-.037q-.65 0-1.275.125q-.625.125-1.2.325q-.45.175-.737-.025q-.288-.2-.288-.65ZM6.5 16q1.175 0 2.288.262q1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 16 17.5 16q.9 0 1.763.15q.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3q-1.15.3-2.175.9Zm-6-5.4Zm5 7.825q-.35 0-.662-.087q-.313-.088-.588-.238q-.975-.575-2.05-.862Q7.625 18 6.5 18q-1.05 0-2.062.275q-1.013.275-1.938.775q-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525q.137-.25.412-.375q1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3q1.25.3 2.4.9q.275.125.413.375q.137.25.137.525v12.05q0 .575-.487.875q-.488.3-1.013.025q-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.125 0-2.2.288q-1.075.287-2.05.862q-.275.15-.587.238q-.313.087-.663.087Z"
              ></path>
            </svg>
            <p class="fa-num text-sm">{{ props.sessionsCount }} جلسه</p>
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
              ></path>
            </svg>
            <p class="fa-num text-sm">
              9hr 30min
            </p>
          </div>
        </div>
        <hr class="my-5" />
        <nuxt-link
          :to="props.url"
          class="border-indigo-300 inline-block font-bold group-hover:text-white group-hover:border-white text-indigo-900 border-2 rounded  w-full text-center py-2"
        >
          مشاهده ی این دوره
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  teacherName: { type: String, required: true },
  teacherPicture: { type: String, required: true },
  sessionsCount: { type: Number, required: true }
})
</script>
