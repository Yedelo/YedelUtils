import Yettings from '../yettings'



register('chat', fails => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria('                                Total Fails: ${fails}').setContains()

register('chat', event => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria("                              You didn't finish!")