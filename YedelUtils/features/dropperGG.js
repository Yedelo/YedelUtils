import Yettings from '../yettings'



register('chat', () => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria('                                Total Fails: ${*}').setContains()

register('chat', () => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria("                              You didn't finish!")