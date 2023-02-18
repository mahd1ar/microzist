import { showGeneralApiMessage, showGeneralError } from "~/data/utils"

export default function (context) {

    context.$axios.onResponse(res => {


        showGeneralApiMessage(res.data, context)
    })

    context.$axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        //   if (code === 400) {
        //   }

        showGeneralError(error, context)

        if (code === 401) {
            redirect('/login')

        }
    })
}