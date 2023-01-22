const changeHtml = (lang) => {
  document.querySelector('html').lang = lang
  document.querySelector('html').dir = lang === 'fa' ? 'rtl' : 'ltr'
}

export default function (ctx) {
  // onBeforeLanguageSwitch called right before setting a new locale
  // app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
  //     console.log(oldLocale, newLocale, isInitialSetup)
  // }
  // onLanguageSwitched called right after a new locale has been set

  changeHtml(ctx.i18n.locale)
  ctx.app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    changeHtml(newLocale)
  }
}
