register('command', () => { // Limbo command
  ChatLib.say('§')
  setTimeout(() => {
    if (Scoreboard.getTitle() /* if in a lobby still */) ChatLib.say('§')
  }, 500)
}).setName('yedelli').setAliases('yli', 'li')