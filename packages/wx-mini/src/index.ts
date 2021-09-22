import wxAppPlugins from './plugins/wxApp'
import wxConsolePlugin from './plugins/wxConsole'
import wxDomPlugin from './plugins/wxDom'
import wxPagePlugins from './plugins/wxPage'
import wxRequestPlugin from './plugins/wxRequest'
import wxRoutePlugin from './plugins/wxRoute'
import { WxOptionsFieldsTypes } from './types'
import { WxClient } from './wxClient'

function createWxInstance(options: WxOptionsFieldsTypes) {
  const wxClient = new WxClient(options)
  const plugins = [wxRequestPlugin, wxRoutePlugin, wxConsolePlugin, wxDomPlugin, ...wxAppPlugins, ...wxPagePlugins]
  wxClient.use(plugins)
  return wxClient
}

const init = createWxInstance
export { init }
