<template>
  <div class="container mx-auto">
    <div>cart item</div>
    <div v-if="store.getters.isLoggedIn">
      <div
        v-if="cart.result.value?.carts && cart.result.value.carts.length > 0"
      >
        <div
          v-for="cartitem in cart.result.value.carts[0].items"
          :key="cartitem.id"
        >
          <div class="flex justify-between border p-10" dir="ltr">
            <div v-if="cartitem.type === 'event'">
              name: {{ cartitem.event?.name }} <br />
              price:
              {{ cartitem.event?.price }}
            </div>
            <div v-else>
              name:
              {{ cartitem.course?.name }}
              <br />
              price:
              <div
                class="flex flex-row-reverse gap-1"
                v-if="cartitem.coupon && cartitem.coupon?.id"
              >
                <strong>
                  {{
                    ((cartitem.course?.price || 0) *
                      (cartitem.coupon?.discount || 100)) /
                      100
                  }}
                </strong>
                <s>
                  {{ cartitem.course?.price }}
                </s>
              </div>
              <span v-else>
                {{ cartitem.course?.price }}
              </span>

              <br />

              coupon:
              {{ cartitem.coupon?.id }}
            </div>

            <div>
              <div v-if="!cartitem.coupon?.id">
                add coupon
                <br />
                <input type="text" v-model="couponsInput[cartitem.id]" />
                <!-- :disabled="!!cartitem.coupon?.id"
                  :disabled="!!cartitem.coupon?.id" -->
                <button
                  @click="addCoupon(couponsInput[cartitem.id], cartitem.id)"
                >
                  submit
                </button>
              </div>
              <div v-else>fa:: coupon already added</div>
            </div>

            <div>
              <button
                @click="deleteFromCart(cartitem.id)"
                class="flex-center rounded bg-rose-500 p-1 text-rose-50"
              >
                delete
              </button>
            </div>
          </div>
        </div>
        <div>
          price with discount:
          {{ cart.result.value.carts[0].totalPrice }}
        </div>
        <a target="_blank" href="http://localhost:3030/checkout">
          <span class="text-3xl">checkout -&gt;</span>
        </a>
        <pre class="bg-black text-yellow-100" dir="ltr"></pre>
      </div>
      <div v-else>fa:: cart is empty</div>
    </div>
    <div v-else>fa:: login first &gt;</div>
    <hr />
    <template>
      <div
        class="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100"
      >
        <h2 class="text-xl font-semibold">Your cart</h2>
        <ul class="flex flex-col divide-y divide-gray-700">
          <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div class="flex w-full space-x-2 sm:space-x-4">
              <img
                class="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                alt="Polaroid camera"
              />
              <div class="flex flex-col justify-between w-full pb-4">
                <div class="flex justify-between w-full pb-2 space-x-2">
                  <div class="space-y-1">
                    <h3 class="text-lg font-semibold leading-snug sm:pr-8">
                      Polaroid camera
                    </h3>
                    <p class="text-sm dark:text-gray-400">Classic</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-semibold">59.99€</p>
                    <p class="text-sm line-through dark:text-gray-600">
                      75.50€
                    </p>
                  </div>
                </div>
                <div class="flex text-sm divide-x">
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
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
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                      ></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div class="flex w-full space-x-2 sm:space-x-4">
              <img
                class="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=675&amp;q=80"
                alt="Replica headphones"
              />
              <div class="flex flex-col justify-between w-full pb-4">
                <div class="flex justify-between w-full pb-2 space-x-2">
                  <div class="space-y-1">
                    <h3 class="text-lg font-semibold leading-snug sm:pr-8">
                      Replica headphones
                    </h3>
                    <p class="text-sm dark:text-gray-400">White</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-semibold">99.95€</p>
                    <p class="text-sm line-through dark:text-gray-600">150€</p>
                  </div>
                </div>
                <div class="flex text-sm divide-x">
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
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
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                      ></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li class="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div class="flex w-full space-x-2 sm:space-x-4">
              <img
                class="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/phodark:to-1594549181132-9045fed330ce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=675&amp;q=80"
                alt="Set of travel chargers"
              />
              <div class="flex flex-col justify-between w-full pb-4">
                <div class="flex justify-between w-full pb-2 space-x-2">
                  <div class="space-y-1">
                    <h3 class="text-lg font-semibold leading-snug sm:pr-8">
                      Set of travel chargers
                    </h3>
                    <p class="text-sm dark:text-gray-400">Black</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-semibold">8.99€</p>
                    <p class="text-sm line-through dark:text-gray-600">
                      15.99€
                    </p>
                  </div>
                </div>
                <div class="flex text-sm divide-x">
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
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
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    class="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"
                      ></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="space-y-1 text-right">
          <p>
            Total amount:
            <span class="font-semibold">357 €</span>
          </p>
          <p class="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="px-6 py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span class="sr-only sm:not-sr-only">to shop</span>
          </button>
          <button
            type="button"
            class="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span class="sr-only sm:not-sr-only">Continue to</span>Checkout
          </button>
        </div>
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
  useContext
} from '@nuxtjs/composition-api'
import { useLazyQuery } from '@vue/apollo-composable/dist'
import { showGeneralError, showGeneralApiMessage } from '~/data/utils'
import { GeneralApiResponse } from '../../api/data/types'

const store = useStore()
const ctx = useContext()

const cart = useLazyQuery<CartByUserQuery, CartByUserQueryVariables>(CARTBYUSER)

const couponsInput = reactive<Record<string, string>>({})

async function addCoupon (code: string = '', cartitem: string = '') {
  if (code.trim() === '') {
    showGeneralApiMessage(
      { ok: false, message: 'fa:; code must not be empty' },
      ctx
    )
    return
  }

  try {
    const { data } = await ctx.$axios.get<GeneralApiResponse>('/coupon', {
      params: {
        id: code,
        cartitem
      }
    })

    showGeneralApiMessage(data, ctx)
    cart.refetch()
  } catch (error) {
    showGeneralError(error, ctx)
  }
  console.log(code)
}

async function deleteFromCart (cartid: string) {
  try {
    const { data } = await ctx.$axios.delete<GeneralApiResponse>('/cart-item', {
      data: { cartid }
    })
    cart.refetch()
    showGeneralApiMessage(data, ctx)
  } catch (error) {
    showGeneralError(error, ctx)
  }
}

onMounted(() => {
  if (store.getters.isLoggedIn)
    cart.load(
      CARTBYUSER,
      { user: store.getters.user.id },
      { fetchPolicy: 'no-cache' }
    )
})
</script>
