import {logo} from '../stuff/constants'
import vals from '../stuff/vals'
import {displayText} from '../features/displayText'




// This supports any variable / method from the game, however only logo, vals, and displayText from this module
// `${displayText.getLine(0).getText().string}` is cool

register('command', ...args => { // Display text
  try {
    text = eval('`' + args.join(' ') + '`')
  }
  catch (ReferenceError) {
    return ChatLib.chat(`${logo} &cYou set an invalid variable!`)
  }
  if (args.join('') == '') {
    return ChatLib.chat(`${logo} &cYou must provide valid text!`)
  }
  displayText.setLine(0, new DisplayLine(text).setShadow(true))
  vals.displayedText = text
  ChatLib.chat(`${logo} &eSet display text to &6"` + text + `&6"! &eUse &6/cleartext &eto remove the text and &6/movetext &eto move it.`)
  vals.save()
}).setName('settext')