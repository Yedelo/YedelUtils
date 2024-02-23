import {logo} from '../stuff/constants'
import vals from '../stuff/vals'



register('command', () => { // Playtime command
  hours = Math.floor(vals.ptminutes / 60)
  minutes = vals.ptminutes % 60
  ChatLib.chat(`${logo} &ePlaytime: &6${hours} hours &eand &6${minutes} minutes`)
}).setName('yedelplaytime').setAliases('ypt', 'yedelpt')