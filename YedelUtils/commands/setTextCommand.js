import {logo} from '../utils/constants'
import vals from '../utils/vals'
import displayText from '../features/displayText'



// This supports any variable / method from the game, however only logo, evaluate, vals, and displayText from this module
// `${displayText.getLine(0).getText().string}` is cool
// I just found out that \n works here

register('command', ...args => { // Display text
  let text
  try {
    text = eval('`' + args.join(' ') + '`')
  }
  catch (terror) {
    return ChatLib.chat(`${logo} &cSomething went wrong! Make sure your variables are valid or that your text isn't empty.`)
  }
  displayText.setLine(0, new DisplayLine(text).setShadow(true))
  ChatLib.chat(`${logo} &eSet display text to &6"` + text + `&6"! &eUse &6/cleartext &eto remove the text and &6/movetext &eto move it.`)
  vals.displayedText = text
  vals.save()
}).setName('settext')