import Yettings from '../yettings'



register('chat', (rank, newjoin) => {
  if (!Yettings.guildWelcome) return
  ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${rank} ${newjoin} joined the guild!') // Auto guild welcome

register('chat', newjoin => {
  if (!Yettings.guildWelcome) return
  if (!newjoin.startsWith('[')) ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${newjoin} joined the guild!') // Auto guild welcome