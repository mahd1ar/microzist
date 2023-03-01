<template>
  <div class="container mx-auto">
    <template>
      <div
        class="mt-10 flex max-w-3xl flex-col space-y-4 rounded bg-gray-900 p-6 text-gray-100 sm:p-10"
      >
        <h2 class="text-xl font-semibold">Your cart</h2>
        <template v-if="store.getters.isLoggedIn">
          <div class="" v-if="cartResult?.carts && cartResult.carts.length > 0">
            <ul class="flex flex-col divide-y divide-gray-700">
              <li
                v-for="item in cartResult?.carts[0].items"
                :key="item.id"
                class="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div class="flex w-full gap-2 sm:gap-4">
                  <img
                    class="h-20 w-20 flex-shrink-0 rounded object-cover outline-none dark:border-transparent dark:bg-gray-500 sm:h-32 sm:w-32"
                    :src="item.event?.image?.url || item.course?.image?.url"
                    alt="product image"
                  />
                  <div class="flex w-full flex-col justify-between pb-4">
                    <div class="flex w-full justify-between space-x-2 pb-2">
                      <div class="space-y-1">
                        <h3
                          v-if="item.type === 'event'"
                          class="text-lg font-semibold leading-snug sm:pl-8"
                        >
                          {{ item.event?.name || '' }}
                        </h3>
                        <h3
                          v-else-if="item.type === 'course'"
                          class="text-lg font-semibold leading-snug sm:pl-8"
                        >
                          {{ item.course?.name || '' }}
                        </h3>
                        <p class="text-sm text-gray-400">Classic</p>
                      </div>

                      <div v-if="item.type === 'event'" class="text-right">
                        <p class="text-lg font-semibold">
                          {{ item.event?.price }}
                        </p>
                      </div>
                      <div
                        v-else-if="item.type === 'course'"
                        class="text-right"
                      >
                        <p
                          v-if="item.coupon && item.coupon?.id"
                          class="text-lg font-semibold"
                        >
                          {{
                            ((item.course?.price || 0) *
                              (item.coupon?.discount || 100)) /
                            100
                          }}

                          <s class="text-sm text-gray-600">
                            {{ item.course?.price }}
                          </s>
                        </p>
                        <p v-else class="text-lg font-semibold">
                          {{ item.course?.price }}
                        </p>
                      </div>
                    </div>
                    <div class="flex text-sm">
                      <button
                        @click="deleteFromCart(item.id)"
                        type="button"
                        class="flex items-start gap-2 border border-slate-900 px-2 py-1 transition-colors hover:border-gray-500 hover:bg-white/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          class="h-4 w-4 fill-current"
                        >
                          <path
                            d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"
                          ></path>
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
                          <path
                            d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"
                          ></path>
                        </svg>
                        <span>حذف از سبدخرید</span>
                      </button>
                      <!-- @click="openCouponBox" -->
                      <AddCouponBtn
                        @submit="addCoupon(couponsInput[item.id], item.id)"
                        v-if="!item.coupon?.id && item.type === 'course'"
                        :code.sync="couponsInput[item.id]"
                      />

                      <div v-if="item.coupon?.id">fa:; already added</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="space-y-1 text-right">
              <p>
                Total amount:
                <span class="font-semibold">{{
                  cartResult.carts[0].totalPrice
                }}</span>
              </p>
              <p class="text-sm dark:text-gray-400">
                Not including taxes and shipping costs
              </p>
            </div>
            <div class="flex justify-end gap-4">
              <button @click="$router.go(-1)" type="button" class="px-6 py-2">
                Back
                <span class="sr-only sm:not-sr-only">to shop</span>
              </button>
              <button
                @click="checkout"
                type="button"
                class="flex items-center gap-1 border border-indigo-400 bg-indigo-500 px-6 py-2 text-white"
              >
                <svg
                  class="ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6Z"
                  />
                </svg>

                تکمیل خرید
              </button>
            </div>
          </div>
          <div v-else>fa:: cart is empty</div>
        </template>
        <template v-else> fa:: login first </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import CARTBYUSER from '@/apollo/q/cart-by-user.gql'
import { CartByUserQuery, CartByUserQueryVariables } from '@/types/types'
import {
  useStore,
  onMounted,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'
import { useLazyQuery } from '@vue/apollo-composable/dist'
import { showGeneralError, showGeneralApiMessage } from '~/data/utils'
import AddCouponBtn from './misc/AddCouponBtn.vue'

const store = useStore()
const ctx = useContext()

const {
  result: cartResult,
  loading,
  refetch,
  load,
} = useLazyQuery<CartByUserQuery, CartByUserQueryVariables>(CARTBYUSER)

const couponsInput = reactive<Record<string, string>>({})

async function addCoupon(code: string = '', cartitem: string = '') {
  if (code.trim() === '') {
    showGeneralApiMessage(
      { ok: false, message: 'fa:; code must not be empty' },
      ctx
    )
    return
  }

  await ctx.$axios.get('/coupon', {
    params: {
      id: code,
      cartitem,
    },
  })

  refetch()
  alert('added')
  console.log(code)
}

async function deleteFromCart(cartid: string) {
  await ctx.$axios.delete('/cart-item', {
    data: { cartid },
  })
  refetch()
}

function checkout() {
  window.open('http://localhost:3030' + '/checkout')
}

function openCouponBox() {}

onMounted(() => {
  if (store.getters.isLoggedIn)
    load(
      CARTBYUSER,
      { user: store.getters.user.id },
      { fetchPolicy: 'no-cache' }
    )
})
</script>
