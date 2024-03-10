import Yettings from '../yettings'



register('chat', (_, newjoin) => {
  if (!Yettings.guildWelcome) return
  ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${rank} ${newjoin} joined the guild!')

register('chat', newjoin => {
  if (!Yettings.guildWelcome) return
  if (!newjoin.startsWith('[')) ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${newjoin} joined the guild!')