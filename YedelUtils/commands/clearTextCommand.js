import {logo} from '../stuff/constants'
import vals from '../stuff/vals'
import {displayText} from '../features/displayText'



register('command', () => { // don't display text
  displayText.clearLines()
  vals.displayedText = ''
  vals.save()
  ChatLib.chat(`${logo} &cCleared display!`) 
}).setName('cleartext')