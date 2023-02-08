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
            <div>
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
        <pre class="bg-black text-yellow-100" dir="ltr"></pre>
      </div>
      <div v-else>fa:: cart is empty</div>
    </div>
    <div v-else>fa:: login first &gt;</div>
  </div>
</template>

<script lang="ts" setup>
import CARTBYUSER from '@/apollo/q/cart-by-user.gql'
import { CartByUserQuery, CartByUserQueryVariables } from '@/types/types'
import {
  useStore,
  onMounted,
  defineComponent,
  ref,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'
import { useLazyQuery } from '@vue/apollo-composable/dist'
import { showGeneralError, showGeneralApiMessage } from '~/data/utils'
import { GeneralApiResponse } from '../../api/data/types'

const store = useStore()
const ctx = useContext()

const cart = useLazyQuery<CartByUserQuery, CartByUserQueryVariables>(CARTBYUSER)

const couponsInput = reactive<Record<string, string>>({})

async function addCoupon(code: string = '', cartitem: string = '') {
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
        cartitem,
      },
    })

    showGeneralApiMessage(data, ctx)
    cart.refetch()
  } catch (error) {
    showGeneralError(error, ctx)
  }
  console.log(code)
}

async function deleteFromCart(cartid: string) {
  try {
    const { data } = await ctx.$axios.delete<GeneralApiResponse>('/cart-item', {
      data: { cartid },
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
