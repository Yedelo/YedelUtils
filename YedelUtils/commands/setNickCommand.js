import Yettings from '../yettings'



register('command', name => { 
  if (!name) return ChatLib.chat('&c&lBounty&f&lHunting > &cYou must set a valid nick!')
  ChatLib.chat('&c&lBounty&f&lHunting > &eSet nick to ' + name + '&e!')
  Yettings.nick = name
  Yettings.save()
}).setName('bh:setnick')