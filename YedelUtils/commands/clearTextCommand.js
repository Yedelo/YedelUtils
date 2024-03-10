import {logo} from '../utils/constants'
import vals from '../utils/vals'
import displayText from '../features/displayText'



register('command', () => {
  displayText.clearLines()
  vals.displayedText = ''
  vals.save()
  ChatLib.chat(`${logo} &cCleared display!`) 
}).setName('cleartext')