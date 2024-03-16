import {logo} from '../utils/constants'
import vals from '../utils/vals'



register('command', () => { // Playtime command
  const ptminutes = vals.ptminutes
  ChatLib.chat(`${logo} &ePlaytime: &6${Math.floor(ptminutes / 60)} hours &eand &6${ptminutes % 60} minutes`)
}).setName('yedelplaytime').setAliases('ypt', 'yedelpt')