import { createI18n } from 'vue-i18n'
import en_US from './langs/en_US.json' // 英语
import zh_CN from './langs/zh_CN.json' // 中文
import ru_RU from './langs/ru_RU.json' // 俄罗斯语

const getLocale = () => {
  let locale = 'ru_RU'
  if (localStorage.getItem('locale')) {
    locale = localStorage.getItem('locale') || 'ru_RU'
  }
  return locale
}
const messages = { en_US, zh_CN, ru_RU }

const i18n = createI18n({
  legacy: true,
  locale: getLocale(),
  messages
})

export default i18n