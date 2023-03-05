<template>
  <div class="bg-white">
    <div
      class="h-[80vh] bg-neutral-100 text-neutral-800 flex flex-col overflow-hidden relative"
    >
      <div class="absolute top-0 left-0 overflow-hidden h-full w-full">
        <img
          class="h-full w-full object-cover object-top "
          src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div
          class="w-1/2 absolute top-0 right-0 bg-gradient-to-l from-white via-white to-transparent h-full"
        ></div>
        <div class="absolute inset-0 w-full h-full" aria-hidden="true">
          <div
            class="absolute inset-0 w-full h-full opacity-40 bg-gradient-to-tr   from-indigo-500 to-emerald-500 mix-blend-color"
          ></div>
        </div>
      </div>
      <!-- // top navbar -->
      <div class="my-4 container mx-auto shrink-0 relative">
        <div
          class="text-mono mx-2 flex flex-row-reverse justify-between text-neutral-600"
        >
          <div class="text-sm">
            Phone: +880 1680 6361 89 Mail: hello@udemo.com Find us: Road 18,
            Chicago, USA
          </div>
          <div class="flex gap-4">
            <svg
              class="w-4 h-4"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="m29.919 6.163l-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744l-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556L24.919 8.72c.519-.462-.113-.719-.806-.256l-14.75 9.288l-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"
              />
            </svg>
            <svg
              class="w-4 h-4"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"
              />
            </svg>
          </div>
        </div>
        <div
          class="bg-neutral-50 shadow px-8 h-20 mt-2 rounded flex justify-between"
        >
          <div class="flex-center w-28">
            <img
              src="https://eduvibe.react.devsvibe.com/images/logo/logo.png"
              alt=""
            />
          </div>
          <div>
            <div class="flex h-full">
              <div
                class="flex-center h-full mx-1 px-2 cursor-pointer hover:bg-neutral-100"
              >
                دوره های آنلاین
              </div>
              <div
                class="flex-center h-full mx-1 px-2 cursor-pointer hover:bg-neutral-100"
              >
                دوره های حضوری
              </div>
              <div
                class="flex-center h-full mx-1 px-2 cursor-pointer hover:bg-neutral-100"
              >
                رویداد ها
              </div>
              <div
                class="flex-center h-full mx-1 px-2 cursor-pointer hover:bg-neutral-100"
              >
                بلاگ
              </div>
              <div
                class="flex-center h-full mx-1 px-2 cursor-pointer hover:bg-neutral-100"
              >
                درباره ما
              </div>
            </div>
          </div>
          <div class="flex-center text-sm">
            <a
              href="#"
              class="flex-center gap-1 text-emerald-50 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 font-semibold rounded"
            >
              <svg
                class="w-5 h-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.325 16.275q-.275-.325-.275-.738q0-.412.275-.687l1.85-1.85H4q-.425 0-.712-.288Q3 12.425 3 12t.288-.713Q3.575 11 4 11h7.175l-1.85-1.85q-.3-.3-.3-.712q0-.413.3-.713q.275-.3.688-.3q.412 0 .687.275l3.6 3.6q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-3.6 3.6q-.3.3-.7.275q-.4-.025-.675-.3ZM13 21q-.425 0-.712-.288Q12 20.425 12 20t.288-.712Q12.575 19 13 19h6V5h-6q-.425 0-.712-.288Q12 4.425 12 4t.288-.713Q12.575 3 13 3h6q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z"
                />
              </svg>
              ورود
            </a>
            <a href="#" class="px-4 py-2 text-neutral-600 hover:bg-neutral-100"
              >ثبت نام
            </a>
          </div>
        </div>
      </div>
      <!-- // end-top navbar -->
      <div class="font-semibold mx-auto container h-full grow flex">
        <div class="flex relative flex-col h-full w-1/2 justify-center gap-5">
          <div>پیشرو در آموزش آنلاین</div>

          <h1 class="text-3xl pl-10">
            دوره های آنلاین جذاب و قابل دسترس برای همه
          </h1>

          <div>
            مالکیت آینده خود را در یادگیری مهارت های جدید آنلاین
          </div>

          <div
            class="bg-white w-full px-2 h-14 rounded-full font-normal shadow-sm"
          >
            <div class="flex h-full items-center gap-2 justify-between  ">
              <div class="w-10 flex-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                  />
                </svg>
              </div>
              <input
                class="w-full h-full focus-visible:outline-none"
                type="text"
                placeholder="دوره ی خود را جستجو کنید"
              />
              <div
                class="flex-shrink-0  text-indigo-600 px-4 h-full my-2 flex-center "
              >
                <div
                  class="bg-indigo-50 text-sm rounded py-2 px-2 flex items-center gap-2"
                >
                  <select
                    name="pets"
                    id="pets"
                    class=" bg-indigo-50  focus-visible:outline-none"
                  >
                    <option value="">دسته بندی ها</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="hamster">Hamster</option>
                    <option value="parrot">Parrot</option>
                    <option value="spider">Spider</option>
                    <option value="goldfish">Goldfish</option>
                  </select>
                  <label for="pets">
                    <svg
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div>
                <div
                  class="bg-indigo-500 text-indigo-50 flex-shrink-0 w-10 h-10 rounded-full flex-center"
                >
                  <svg
                    class="w-6 h-6"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <section class=" relative bg-neutral-50"> -->
    <section class=" relative bg-white">
      <div class="container mx-auto grid grid-cols-3 gap-4 -translate-y-10 ">
        <div
          class="flex flex-row-reverse justify-between items-center bg-white shadow-lg rounded-lg p-4 gap-6"
        >
          <div class="">
            <div class="bg-emerald-50 rounded flex-center w-12 h-12">
              <svg
                class="w-8 h-8 text-emerald-800"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 17h18V5H3v12zM9 7l7 4l-7 4V7z"
                  opacity=".15"
                />
                <path
                  fill="currentColor"
                  d="M9 7v8l7-4zm12-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
                />
              </svg>
            </div>
          </div>
          <div class="w-full flex flex-col">
            <h3 class="mb-2 font-bold text-emerald-900">
              دوره های آنلاین
            </h3>
            <p class="text-neutral-600 text-sm">
              بیش از 70 ساعت دوره ی انلاین در دسته های مختلف بیولژیک
            </p>
          </div>
        </div>
        <div
          class="flex flex-row-reverse justify-between items-center bg-white shadow-lg rounded-lg p-4 gap-6"
        >
          <div class="">
            <div class="bg-emerald-50 rounded flex-center w-12 h-12">
              <svg
                class="w-8 h-8 text-emerald-800"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M192 80v96h-88a32 32 0 1 0-32-32h-8V80Z"
                  opacity=".2"
                />
                <path
                  fill="currentColor"
                  d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h13.4a7.9 7.9 0 0 0 7.2-4.6a48.1 48.1 0 0 1 86.8 0a7.9 7.9 0 0 0 7.2 4.6H216a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM80 144a24 24 0 1 1 24 24a24.1 24.1 0 0 1-24-24Zm136 56h-56.6a64.6 64.6 0 0 0-28.8-26.2a40 40 0 1 0-53.2 0A64.6 64.6 0 0 0 48.6 200H40V56h176ZM56 96V80a8 8 0 0 1 8-8h128a8 8 0 0 1 8 8v96a8 8 0 0 1-8 8h-16a8 8 0 0 1 0-16h8V88H72v8a8 8 0 0 1-16 0Z"
                />
              </svg>
            </div>
          </div>
          <div class="w-full flex flex-col">
            <h3 class="mb-2 font-bold text-emerald-900">
              دوره های حضوری
            </h3>
            <p class="text-neutral-600 text-sm">
              برگزاری ورکشاپ به صورت هفتگی و منظم
            </p>
          </div>
        </div>
        <div
          class="flex flex-row-reverse justify-between items-center bg-white shadow-lg rounded-lg p-4 gap-6"
        >
          <div class="">
            <div class="bg-emerald-50 rounded flex-center w-12 h-12">
              <svg
                class="w-8 h-8 text-emerald-800"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M5 5h14v2H5z" opacity=".3" />
                <path
                  fill="currentColor"
                  d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zm-2.51 4.53l-1.06-1.06l-4.87 4.87l-2.11-2.11l-1.06 1.06l3.17 3.17z"
                />
              </svg>
            </div>
          </div>
          <div class="w-full flex flex-col">
            <h3 class="mb-2 font-bold text-emerald-900">
              برگزاری رویداد ها
            </h3>
            <p class="text-neutral-600 text-sm">
              بیش از 70 ساعت دوره ی انلاین در دسته های مختلف بیولژیک
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 relative overflow-hidden">
      <div id="particles-js" class=" inset-0 w-full h-full  absolute"></div>
      <!-- <img class="absolute top-0 left-0 w-1/3 object-cover h-full" src="petri-dish-svgrepo-com.svg" alt=""> -->

      <!-- <img class="absolute top-0 left-0 w-1/3 object-cover rotate-45 opacity-70 " style="filter: hue-rotate(45deg);"
      src="molecular-svgrepo-com.svg" alt=""> -->

      <div class="container mx-auto relative pointer-events-none">
        <div class="flex gap-2">
          <div class="w-1/3">
            <div class="text-xl text-right leading-10 font-bold">
              چرا در آموزش آنلاین بهترین هستیم ؟
            </div>
          </div>

          <div
            class="w-1/3 rounded-lg border p-2 px-3 flex flex-row-reverse items-center gap-2 bg-white bg-opacity-60 backdrop-blur-sm"
          >
            <img
              class="flex-shrink-0"
              src="https://udemo-html.netlify.app/assets/images/icons/icon_online_education_2.png"
              alt=""
            />
            <div class="text-right w-full">
              <div class="  text-right">
                آینده کاری خود را بسازید
              </div>
              <div class="text-neutral-600 mt-1 text-[13px]">
                هر چیزی که برای شروع باید بدانید
              </div>
              <div></div>
            </div>
          </div>
          <div
            class="w-1/3 rounded-lg border p-2 px-3 flex flex-row-reverse items-center gap-2 bg-white bg-opacity-60 backdrop-blur-sm"
          >
            <img
              class="flex-shrink-0"
              src="https://udemo-html.netlify.app/assets/images/icons/icon_online_education_2.png"
              alt=""
            />
            <div class="text-right w-full">
              <div class="  text-right">
                آینده کاری خود را بسازید
              </div>
              <div class="text-neutral-600 mt-1 text-[13px]">
                هر چیزی که برای شروع باید بدانید
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-center mt-4">
          <div
            class="w-1/3 rounded-lg border p-2 px-3 flex flex-row-reverse items-center gap-2 bg-white bg-opacity-60 backdrop-blur-sm"
          >
            <img
              class="flex-shrink-0"
              src="https://udemo-html.netlify.app/assets/images/icons/icon_online_education_2.png"
              alt=""
            />
            <div class="text-right w-full">
              <div class="  text-right">
                آینده کاری خود را بسازید
              </div>
              <div class="text-neutral-600 mt-1 text-[13px]">
                هر چیزی که برای شروع باید بدانید
              </div>
              <div></div>
            </div>
          </div>
          <div
            class="w-1/3 rounded-lg border p-2 px-3 flex flex-row-reverse items-center gap-2 bg-white bg-opacity-60 backdrop-blur-sm"
          >
            <img
              class="flex-shrink-0"
              src="https://udemo-html.netlify.app/assets/images/icons/icon_online_education_2.png"
              alt=""
            />
            <div class="text-right w-full">
              <div class="  text-right">
                آینده کاری خود را بسازید
              </div>
              <div class="text-neutral-600 mt-1 text-[13px]">
                هر چیزی که برای شروع باید بدانید
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="py-4 pb-24 bg-neutral-100 relative border-t border-gray-200"
    >
      <div class="absolute top-0 left-0 h-96 w-full">
        <img
          class=" opacity-60 w-full h-full object-cover object-top"
          src="/home/ce9acc131d.jpg"
          alt=""
        />
        <div
          class="h-52 bg-gradient-to-t from-neutral-100  to-transparent absolute bottom-0 w-full"
          aria-hidden="true"
        ></div>
      </div>

      <div class="container mx-auto flex flex-col relative">
        <h2 class="text-neutral-800 text-2xl my-4 flex flex-col items-center ">
          <span
            class="bg-white p-1 bg-opacity-50 backdrop-blur-sm inline-block w-max rounded"
          >
            پربازدیدترین
          </span>

          <span
            class="bg-white p-1 bg-opacity-50 backdrop-blur-sm inline-block w-max rounded"
          >
            دوره های آموزشی
            <strong class="text-indigo-500">
              میکروزیست
            </strong>
          </span>
        </h2>
        <p
          class="text-neutral-600 w-2/3 bg-white p-1 bg-opacity-50 backdrop-blur-sm rounded text-center mx-auto"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          nesciunt vitae molestiae rem facilis id voluptate corporis expedita
          aliquam nulla alias, iste libero possimus similique maxime sit aliquid
          repellat ad.
        </p>
        <div class="grid grid-cols-3 mt-8 gap-4">
          <div
            v-for="i in [1, 2, 3, 4, 5, 6]"
            :key="i"
            class="flex shadow-sm group ease-out"
          >
            <div
              class="rounded-lg relative p-5 bg-white   duration-500 transition-colors group-hover:bg-indigo-800"
            >
              <div class="rounded overflow-hidden relative  duration-500">
                <a href="course-details.html">
                  <img
                    class="w-full rounded h-full p-2 group-hover:scale-110 duration-1000 transition-transform ease-out "
                    alt=""
                    :src="
                      `https://dreamslms.dreamguystech.com/html/assets/img/course/course-0${i}.jpg`
                    "
                  />
                </a>
                <div
                  class=" py-2 fa-num px-2 rounded absolute bg-white left-5 bottom-5"
                >
                  <h3
                    class=" flex flex-row-reverse gap-2 justify-between items-center "
                    dir="ltr"
                  >
                    <div class="text-2xl text-indigo-500 font-semibold">
                      300,000
                    </div>
                    <span class="text-sm text-black">
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
                      <h4
                        class="text-neutral-800 group-hover:text-white font-semibold"
                      >
                        <a href="instructor-profile.html">Nicole Brown</a>
                      </h4>
                      <p
                        class="text-sm text-neutral-500 group-hover:text-indigo-100"
                      >
                        مدرس
                      </p>
                    </div>
                  </div>
                </div>
                <h3 class="text-xl mb-2 group-hover:text-white">
                  <a href="course-details.html"
                    >Information About UI/UX Design Degree</a
                  >
                </h3>
                <div
                  class="course-info flex items-center justify-between group-hover:text-indigo-100"
                >
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14 8.775q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375T17.5 7.5q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113Q17.9 9 17.5 9q-.65 0-1.275.125q-.625.125-1.2.325q-.45.175-.737-.025q-.288-.2-.288-.65Zm0 5.5q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375T17.5 13q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113q-.388-.037-.788-.037q-.65 0-1.275.113q-.625.112-1.2.312q-.45.175-.737-.013q-.288-.187-.288-.637Zm0-2.75q0-.225.163-.463q.162-.237.362-.312q.725-.25 1.45-.375t1.525-.125q.5 0 .988.062q.487.063.962.163q.225.05.387.25q.163.2.163.45q0 .425-.275.625t-.7.1q-.35-.075-.737-.113q-.388-.037-.788-.037q-.65 0-1.275.125q-.625.125-1.2.325q-.45.175-.737-.025q-.288-.2-.288-.65ZM6.5 16q1.175 0 2.288.262q1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 16 17.5 16q.9 0 1.763.15q.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3q-1.15.3-2.175.9Zm-6-5.4Zm5 7.825q-.35 0-.662-.087q-.313-.088-.588-.238q-.975-.575-2.05-.862Q7.625 18 6.5 18q-1.05 0-2.062.275q-1.013.275-1.938.775q-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525q.137-.25.412-.375q1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3q1.25.3 2.4.9q.275.125.413.375q.137.25.137.525v12.05q0 .575-.487.875q-.488.3-1.013.025q-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.125 0-2.2.288q-1.075.287-2.05.862q-.275.15-.587.238q-.313.087-.663.087Z"
                      />
                    </svg>
                    <p class="fa-num text-sm">12 جلسه</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
                      />
                    </svg>
                    <p class="fa-num text-sm">
                      9hr 30min
                    </p>
                  </div>
                </div>
                <hr class="my-5" />
                <button
                  class="border-indigo-300  font-bold group-hover:text-white group-hover:border-white text-indigo-900 border-2 rounded  w-full text-center py-2"
                >
                  خرید این دوره
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative">
      <img
        class=" absolute top-0 left-0 h-full w-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1490351267196-b7a67e26e41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1881&q=80"
        alt=""
      />
      <!-- <div
      class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-indigo-500 to-teal-300 opacity-40 mix-blend-multiply">
    </div> -->

      <div class="relative">
        <div class="mx-auto container">
          <h2 class="text-2xl  text-center text-indigo-500 font-semibold pt-8">
            بلاگ و خبر ها
          </h2>
        </div>

        <div class=" flex  py-8 gap-6 container mx-auto  items-stretch">
          <div class="w-1/2 h-full ">
            <article
              class="overflow-hidden rounded  border-gray-100 bg-white shadow-sm "
            >
              <div class="relative">
                <img
                  alt="Office"
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  class="h-full w-full object-cover"
                />

                <div
                  class="inset-0 w-full h-full bg-gradient-to-t from-black to-transparent absolute flex items-end"
                >
                  <div class="p-4 sm:p-6">
                    <a href="#">
                      <h3 class="text-lg font-medium text-white pl-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </h3>
                    </a>

                    <p
                      class="mt-2 text-sm leading-relaxed text-neutral-300 line-clamp-3"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Recusandae dolores, possimus pariatur animi temporibus
                      nesciunt praesentium dolore sed nulla ipsum eveniet
                      corporis quidem, mollitia itaque minus soluta, voluptates
                      neque explicabo tempora nisi culpa eius atque dignissimos.
                      Molestias explicabo corporis voluptatem?
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="flex flex-col gap-2  w-1/2">
            <article
              v-for="i in [0, 1]"
              :key="i"
              class="overflow-hidden flex  rounded border border-neutral-200 bg-white  bg-opacity-75 backdrop-blur  shadow-sm"
            >
              <div class="aspect-square w-1/3 p-4">
                <img
                  alt="Office"
                  src="https://images.unsplash.com/photo-1590402494693-bd0499aefe00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  class=" object-cover w-full h-full rounded "
                />
              </div>

              <div
                class="p-4 sm:p-6 w-2/3 flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div
                    class="bg-indigo-50 text-indigo-500 inline-block text-xs  px-2 py-0.5 rounded"
                  >
                    آموزش
                  </div>
                </div>
                <a href="#">
                  <h3 class="text-lg font-medium text-gray-900">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </a>

                <div class="w-full flex justify-between">
                  <a
                    href="#"
                    class="group  inline-flex items-center gap-1 text-sm font-medium text-indigo-600"
                  >
                    ادامه مطلب
                    <span
                      aria-hidden="true"
                      class="block transition group-hover:-translate-x-0.5"
                    >
                      &larr;
                    </span>
                  </a>

                  <span class=" flex-center text-xs text-neutral-400">
                    5 مهر 1400
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="flex justify-center pb-8 gap-2">
          <button
            class=" flex items-center gap-2 bg-indigo-500 text-white px-4 py-1 rounded shadow hover:bg-indigo-400 shadow-indigo-500/50 text-lg"
          >
            مشاهده تمام خبرها
            <svg class="w-5 h-5 rotate-180" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13.3 17.275q-.3-.3-.288-.725q.013-.425.313-.725L16.15 13H5q-.425 0-.713-.288Q4 12.425 4 12t.287-.713Q4.575 11 5 11h11.15L13.3 8.15q-.3-.3-.3-.713q0-.412.3-.712t.713-.3q.412 0 .712.3L19.3 11.3q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325l-4.6 4.6q-.275.275-.687.275q-.413 0-.713-.3Z"
              />
            </svg>
          </button>
          <!-- <div class="w-3 h-3 rounded-full bg-neutral-600"></div>
        <div class="w-3 h-3 rounded-full bg-neutral-300"></div>
        <div class="w-3 h-3 rounded-full bg-neutral-300"></div> -->
        </div>
      </div>
    </section>
    <section class="bg-gradient-to-tr to-white  from-gray-200 pt-10">
      <!-- <div class="bg-gradient-to-tr to-teal-300  from-indigo-500 relative "> -->
      <div class=" relative ">
        <div
          class="absolute inset-0 w-full h-full flex justify-start items-end"
        >
          <!-- <img class=" object-contain bottom-0 left-0 max-w-md" src="/events.png" alt=""> -->
          <!-- <img src="https://angfuzsoft.com/html/acadu/demo/assets/img/bg/bg_overlay_2.png" alt="">
        <img class="rotate-180" src="https://angfuzsoft.com/html/acadu/demo/assets/img/bg/bg_overlay_2.png" alt=""> -->
        </div>

        <div class="container mx-auto py-10">
          <h2 class="text-emerald-500 font-bold text-3xl mb-8 text-center ">
            رویداد ها
          </h2>

          <div class="absolute inset-0 flex justify-end align-top ">
            <img
              class="max-w-md object-contain object-top"
              src="https://kodesolution.com/html/2022/edulerns-html/images/icons/icon-dotted-map-2.png"
              alt=""
            />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div v-for="(item, i) in events" :key="i" class="flex group">
              <div class="w-1/4 relative z-10">
                <img
                  class="w-full aspect-square rounded-2xl border overflow-hidden scale-95 relative -translate-x-5  filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-100"
                  :src="
                    `https://angfuzsoft.com/html/acadu/demo/assets/img/event/event_1_${i +
                      1}.jpg`
                  "
                  alt=""
                />
              </div>
              <div
                class="w-3/4 bg-white bg-opacity-90 border rounded-lg p-4 pr-10 p translate-y-5 z-0 flex flex-col gap-2"
              >
                <div class="text-neutral-600 flex gap-4 items-center">
                  <div class="flex gap-2 items-center">
                    <svg
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 7.35q3.05-2.8 4.525-5.088Q18 11.975 18 10.2q0-2.725-1.738-4.463Q14.525 4 12 4Q9.475 4 7.737 5.737Q6 7.475 6 10.2q0 1.775 1.475 4.062Q8.95 16.55 12 19.35Zm0 2.275q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.363Q4 12.6 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.4-1.8 5.163q-1.8 2.762-5.45 5.987q-.15.125-.35.2q-.2.075-.4.075ZM12 10.2Z"
                      />
                    </svg>

                    <div class="text-xs font-semibold mt-1">
                      ساختمان 5
                    </div>
                  </div>

                  <strong>.</strong>

                  <div class="flex gap-2 items-center">
                    <svg
                      class="w-4 h-4 "
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="m12 12l2 3m-2-8v5" />
                      </g>
                    </svg>
                    <div class="text-xs font-semibold mt-1 " dir="ltr">
                      09:00 am - 11:00 am
                    </div>
                  </div>
                </div>
                <div
                  class="text-black text-xl mb-2 mt-1"
                  v-text="item.txt"
                ></div>
                <div class="grid grid-cols-2 items-center ">
                  <div class="flex gap-2 items-center">
                    <div>
                      <img
                        class="w-10 h-10 rounded-full border"
                        src="https://angfuzsoft.com/html/acadu/demo/assets/img/event/avater.jpg"
                        alt=""
                      />
                    </div>
                    <div>
                      <span class="text-xs font-bold text-neutral-600">
                        سخنران
                      </span>
                      <h2>
                        David Smith
                      </h2>
                    </div>
                  </div>
                  <div class="flex justify-end items-end h-full">
                    <a
                      v-if="i === 0"
                      href=""
                      class=" bg-emerald-500 flex items-end text-white font-bold px-4 py-1.5 rounded text-sm gap-1 fa-num"
                    >
                      <span
                        class="text-xs text-neutral-600  mr-2 ml-0.5 -translate-y-1"
                        >S</span
                      >
                      <strong class="text-lg" id="secounds">55</strong>
                      <span
                        class="text-xs text-neutral-600  mr-2 ml-0.5 -translate-y-1"
                        >H</span
                      >
                      <strong class="text-lg">20</strong>
                      <span
                        class="text-xs text-neutral-600  mr-2 ml-0.5 -translate-y-1"
                        >D</span
                      >
                      <strong class="text-lg">4</strong>
                    </a>

                    <div
                      v-else
                      class="relative text-white duration-1000 transition-colors group-hover:text-slate-800 group-hover:bg-white  bg-slate-800 px-4 py-1.5 rounded text-sm  shadow-lg flex-center w-28 h-10"
                    >
                      <a
                        href="#"
                        class=" absolute transition-all group-hover:-translate-y-full duration-700 group-hover:opacity-0 ease-out"
                        >مشاهده رویداد</a
                      >
                      <a
                        href="#"
                        class=" hover:scale-105 absolute translate-y-full duration-700 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ease-out"
                        >مشاهده رویداد</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-52 w-full relative ">
          <!-- <div class="container mx-auto flex justify-end">
          <a class="text-emerald-500 mt-6 px-2 py-2 rounded" href="">مشاهده ی همه رویداد ها</a>
        </div> -->
          <div
            class="h-[100px]  w-full bg-[#e0dfdf] absolute bottom-0 "
            style="    filter: blur(3px);"
          ></div>
          <img
            class=" object-contain bottom-0 left-0 max-w-md relative "
            src="/home/events.png"
            alt=""
          />
        </div>
      </div>
    </section>

    <footer aria-label="Site Footer" class="bg-white">
      <div
        class="max-w-screen-xl px-4 py-16 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8"
      >
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div class="text-indigo-600">
              <img
                class="h-8"
                src="https://eduvibe.react.devsvibe.com/images/logo/logo.png"
                alt=""
              />
            </div>

            <p class="max-w-xs mt-4 text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul class="flex gap-6 mt-8">
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-gray-700 transition hover:opacity-75"
                >
                  <span class="sr-only">Facebook</span>

                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-gray-700 transition hover:opacity-75"
                >
                  <span class="sr-only">Instagram</span>

                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-gray-700 transition hover:opacity-75"
                >
                  <span class="sr-only">Twitter</span>

                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-gray-700 transition hover:opacity-75"
                >
                  <span class="sr-only">GitHub</span>

                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-gray-700 transition hover:opacity-75"
                >
                  <span class="sr-only">Dribbble</span>

                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4"
          >
            <div>
              <p class="font-medium text-gray-900">Services</p>

              <nav aria-label="Footer Navigation - Services" class="mt-6">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      1on1 Coaching
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Company Review
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Accounts Review
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      HR Consulting
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      SEO Optimisation
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <p class="font-medium text-gray-900">Company</p>

              <nav aria-label="Footer Navigation - Company" class="mt-6">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      About
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Meet the Team
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Accounts Review
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <p class="font-medium text-gray-900">Helpful Links</p>

              <nav aria-label="Footer Navigation - Company" class="mt-6">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Contact
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      FAQs
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Live Chat
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <p class="font-medium text-gray-900">Legal</p>

              <nav aria-label="Footer Navigation - Legal" class="mt-6">
                <ul class="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Accessibility
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Returns Policy
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Refund Policy
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="text-gray-700 transition hover:opacity-75"
                    >
                      Hiring Statistics
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-500">
          &copy; 2022. Company Name. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- <script src="/particles.min.js"></script>
  <script type="module" src="src/main.js"></script> -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {
    script: [
      {
        src: '/home/particles.min.js',
        body: true,
        once: true,
        vmid: 'particles'
      }
    ]
  },
  setup () {
    const isClient = process.client
    const events = ref([
      {
        txt: 'چگونه به یک بازاریاب خوب تبدیل شویم'
      },
      {
        txt: 'نکته ها و ترفند های طراحی وب'
      },
      {
        txt: 'مثل یک موتور جستوگر فکر کنید'
      },
      {
        txt: 'مقدمه ای بر سیستم های بی وقفه'
      }
    ])

    function runParticles () {
      console.log(runParticles)
      // @ts-ignore
      window.particlesJS.load(
        'particles-js',
        '/home/particlesjs-config.json',
        function () {
          console.log('callback - particles.js config loaded')
        }
      )
    }

    console.log(process.client)

    onMounted(() => {
      console.log(isClient)
      if (isClient) {
        window.addEventListener('DOMContentLoaded', runParticles)
      } else {
        ;(document.querySelector(
          'script[vmid=particles]'
        ) as HTMLScriptElement).onload = runParticles
      }
      // if (isClient)
      //   window.addEventListener('DOMContentLoaded', event => {
      //     runParticles()
      //   })()
    })
    return { events }
  }
})
</script>
