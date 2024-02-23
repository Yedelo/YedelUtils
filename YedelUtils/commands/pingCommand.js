import Yettings from '../yettings'

import {pingPing, commandPing, tabPing, statsPing, listPing} from '../features/major/ping'



register('command', type => {
  switch (type) {
    case 'ping':
    case 'p':
      pingPing()
      break
    case 'command':
    case 'c': // Send random command
      commandPing()
      break
    case 'tab':
    case 't': // Send tab completion packet
      tabPing()
      break
    case 'stats':
    case 's': // Send stats packet
      statsPing()
      break
    case 'l': // Server list ping
      listPing()
      break
    default: 
      switch (Yettings.pingMethod) {
        case 0:
          pingPing()
          break
        case 1:
          commandPing()
          break
        case 2:
          tabPing()
          break
	case 3:
          statsPing()
          break
        case 4:
        default:
          listPing()
          break
      }
  }
}).setName('yping').setAliases('yp')