import {version} from './constants'


/** 
* A varying changelog
**/

export default function welcomeMessage () {
  ChatLib.chat('')
  ChatLib.chat(ChatLib.getCenteredText(`&7&l--< &9&lYedelUtils &7&l${version} >--`))
  ChatLib.chat(ChatLib.getCenteredText('&9Book backgrounds:'))
  ChatLib.chat(ChatLib.getCenteredText('&7Draws the default gray background in book GUIs'))
  ChatLib.chat('')
  ChatLib.chat(ChatLib.getCenteredText('&9/yedel &7for more info.'))
  ChatLib.chat(ChatLib.getCenteredText('&7&l--------------------'))
  ChatLib.chat('')
}