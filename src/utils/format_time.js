import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export function format2RelativeTime(timestamp) {
  return moment(Number(timestamp)).fromNow()
}

export function format2FullTime(timestamp) {
  const format = 'YYYY-M-D a h:mm'
  return moment(Number(timestamp)).format(format)
}
