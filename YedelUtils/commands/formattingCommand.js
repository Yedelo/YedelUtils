import {formattingGuide} from '../utils/constants'



register('command', () => {
  ChatLib.chat(formattingGuide[0])
  ChatLib.chat('')
  ChatLib.chat(formattingGuide[1])
  ChatLib.chat(formattingGuide[2])
  ChatLib.chat(formattingGuide[3])
  ChatLib.chat(formattingGuide[4])
  ChatLib.chat('')
  ChatLib.chat(formattingGuide[5])  
  ChatLib.chat(formattingGuide[6])
  ChatLib.chat('') 
  ChatLib.chat(formattingGuide[7])
}).setName('formatting')