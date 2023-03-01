import { showGeneralApiMessage, showGeneralError } from "~/data/utils"

export default function (context) {

    context.$axios.onResponse(res => {

        try {

            showGeneralApiMessage(res.data, context)
        } catch (error) {
            console.error(error)
        }
    })

    context.$axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        //   if (code === 400) {
        //   }

        try {

            showGeneralError(error, context)
        } catch (error) {
            console.error(error)
        }

        if (code === 401) {
            context.redirect('/login')

        }
    })
}