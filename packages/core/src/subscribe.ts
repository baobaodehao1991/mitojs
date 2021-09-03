import { getFunctionName, logger, nativeTryCatch } from '@mitojs/utils'

type MonitorCallback = (data: any) => void
/**
 *发布订阅类
 *
 * @export
 * @class Subscrib
 * @template T 事件枚举
 */
export default class Subscrib<T> {
  dep: Map<T, MonitorCallback[]> = new Map()
  constructor() {}
  watch(eventName: T, callBack: (data: any) => any) {
    console.log(this)
    const fns = this.dep.get(eventName)
    if (fns) {
      this.dep.set(eventName, fns.concat(callBack))
      return
    }
    this.dep.set(eventName, [callBack])
  }
  notify<D = any>(eventName: T, data: D) {
    console.log(this)
    const fns = this.dep.get(eventName)
    if (!eventName || !fns) return
    fns.forEach((fn) => {
      nativeTryCatch(
        () => {
          fn(data)
        },
        (e: Error) => {
          logger.error(`重写事件triggerHandlers的回调函数发生错误\neventName:${eventName}\nName: ${getFunctionName(fn)}\nError: ${e}`)
        }
      )
    })
  }
}
