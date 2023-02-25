<template>
  <div class="h-full bg-slate-50">
    <loading-indicator :loading="loadingInfo">
      <div class="container mx-auto mt-8">
        <div v-if="tabIndex === 0">
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                fa::Applicant Information
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                اطلاعات عمومی پروفایل شما
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    نام و نام خانوادگی
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ profileInfo?.user?.name }}
                    {{ profileInfo?.user?.lastName }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">ایمیل</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ profileInfo?.user?.email }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    تعداد دوره های آموزشی من
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ profileInfo?.user?.coursesCount }}
                  </dd>
                </div>

                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    رویداد هایی که شرکت کرده ام
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ profileInfo?.user?.eventsCount || 0 }}
                  </dd>
                </div>
                <!-- <div
                          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                          <dt class="text-sm font-medium text-gray-500">About</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                            consequat sint. Sit id mollit nulla mollit nostrud in ea
                            officia proident. Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div>
                        <div
                          class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                          <dt class="text-sm font-medium text-gray-500">Attachments</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                              role="list"
                              class="divide-y divide-gray-200 rounded-md border border-gray-200"
                            >
                              <li
                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                              >
                                <div class="flex w-0 flex-1 items-center">
                                  <svg
                                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="ml-2 w-0 flex-1 truncate"
                                    >resume_back_end_developer.pdf</span
                                  >
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >Download</a
                                  >
                                </div>
                              </li>
                              <li
                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                              >
                                <div class="flex w-0 flex-1 items-center">
                                  <svg
                                    class="h-5 w-5 flex-shrink-0 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="ml-2 w-0 flex-1 truncate"
                                    >coverletter_back_end_developer.pdf</span
                                  >
                                </div>
                                <div class="ml-4 flex-shrink-0">
                                  <a
                                    href="#"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                    >Download</a
                                  >
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div> -->
              </dl>
            </div>
          </div>

          <!-- orders -->
          <div class="overflow-hidden bg-white shadow sm:rounded-lg mt-4">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                اطلاعات سفارشات
              </h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    شماره ی سفارش
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    وضعیت
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    هزینه (تومن)
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    تاریخ
                  </dd>
                </div>
              </dl>
              <dl>
                <div
                  v-for="oi in profileInfo?.user?.orders || []"
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    {{ oi.id }}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    {{ oi.paymentStatus === 1 ? 'موفقیت آمیز' : 'خطا' }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    {{ oi.totalCost }}
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    {{ oi.orderDate }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div v-else-if="tabIndex === 1">
          <form
            @submit.prevent="
              updateMyInfo({ id: $store.getters.user.id, ...userNewInfo })
            "
          >
            fname
            <input type="text" v-model="userNewInfo.name" />
            <br />
            last name
            <input type="text" v-model="userNewInfo.lastName" />
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </loading-indicator>
  </div>
</template>

<script lang="ts">
import MYPROFILE from '@/apollo/q/my-profile.gql'
import UPDATEMYPROFILE from '@/apollo/m/update-my-info.gql'
import {
  MyProfileQuery,
  MyProfileQueryVariables,
  UpdateMyInfoMutation,
  UpdateMyInfoMutationVariables
} from '@/types/types'
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { useQuery, useMutation } from '@vue/apollo-composable/dist'
import useTabIndex from '~/components/useTabIndex'

export default defineComponent({
  // middleware: ['auth'],
  layout: 'dashboard',
  setup () {
    const userNewInfo = ref({ name: '', lastName: '' })
    const ctx = useContext()
    const {
      result: profileInfo,
      loading: loadingInfo,
      onResult: onFetchMyProfile
    } = useQuery<MyProfileQuery, MyProfileQueryVariables>(MYPROFILE, {
      id: ctx.store.getters.user.id
    })

    const { mutate: updateMyInfo, onDone: onDoneProfileInfo } = useMutation<
      UpdateMyInfoMutation,
      UpdateMyInfoMutationVariables
    >(UPDATEMYPROFILE)

    const { tabIndex } = useTabIndex()

    const profileIcon = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" ><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" ></path></svg>`
    const editProfileIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" ></path></svg>`
    const resetPasswordIcon = `<svg viewBox="0 2.4 24 24" ><path fill="currentColor" d="M2 21.4v-2h20v2H2Zm1.15-6.05l-1.3-.75l.85-1.5H1v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H7v1.5H5.3l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H9v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H15v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H17v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H23v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Z" ></path></svg>`

    onFetchMyProfile(res => {
      userNewInfo.value.name = res.data.user?.name || ''
      userNewInfo.value.lastName = res.data.user?.lastName || ''
    })

    ctx.$mitt.emit('tabItems', [
      {
        icon: profileIcon,
        name: 'پروفایل کاربر'
      },
      {
        icon: editProfileIcon,
        name: 'ویرایش اطلاعات'
      },
      {
        name: 'تغییر پسورد',
        icon: resetPasswordIcon
      }
    ])

    onDoneProfileInfo(() => {
      // TODO
      alert('successful')
      window.location.reload()
    })

    return { profileInfo, loadingInfo, tabIndex, userNewInfo, updateMyInfo }
  }
})
</script>
