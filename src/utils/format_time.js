import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export function format2FullTime(time) {
  const format = 'YYYY-M-D a h:mm'
  return moment(time).format(format)
}

export function format2RelativeTime(time) {
  return moment(time).fromNow()
}
