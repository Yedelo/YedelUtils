import Yettings from './yettings'

// Commands

import './commands/clearTextCommand'
import './commands/formattingCommand'
import './commands/limboCommand'
import './commands/limboCreativeCommand'
import './commands/moveTextCommand'
import './commands/moveHuntingTextCommand'
import './commands/pingCommand'
import './commands/playtimeCommand'
import './commands/setNickCommand'
import './commands/setTextCommand'
import './commands/yedelCommand'

// Features

import './features/autoGuildWelcome'
import './features/autoLimboCreative'
import './features/displayText'
import './features/dropperGG'
import './features/moveTextGui'
import './features/playtime'
import './features/randomPhrases'
import './features/yedelSchedule'

// Features with more than one register usually constitute major features

import './features/major/autoAtlas'
import './features/major/hypixelSaysHelper'
import './features/major/marketSearches'
import './features/major/ping'
import './features/major/sacrificeDisplay'
import './features/major/strengthIndicators'
import './features/major/tntTag'

// Module

import {YedelCheck, isYedelModActive, logo, version} from './stuff/constants'
import {welcomeMessage} from './stuff/functions'
import vals from './stuff/vals'



if (isYedelModActive) {
  YedelCheck.YedelUtils = true
  yedelActive = register('worldLoad', () => {
    yedelActive.unregister()
    setTimeout(() => {
      new Message(
        `${logo} &9&lYedel&7&lMod &cdetected, it's likely that this module will completely break it. If you are not seeing a similar message from &9&lYedel&7&lMod, &cignore this message. `,
        new TextComponent('&c&n&lUninstall YedelUtils').setClick('run_command', '/ct delete YedelUtils')
      )
      .chat()
    }, 500)
  })
}

Yettings.registerListener('Bounty Hunting', val => {
  if (Scoreboard.getTitle().removeFormatting() != 'TNT TAG') return
  if (val) target.show()
  else target.hide()
})

Yettings.registerListener('Hypixel Says helper', val => {
  restart()
  title = Scoreboard.getTitle().removeFormatting()
  if (direction && (title == 'HYPIXEL SAYS' || title == 'SANTA SAYS')) {
    return taskTriggers.forEach(trigger => trigger.register())
  }
  taskTriggers.forEach(trigger => trigger.unregister())
})

if (vals[version]) {
  const firstTime = register('worldLoad', () => {
    setTimeout(() => { // First load message
      vals[version] = false
      vals.save()
      welcomeMessage()
      firstTime.unregister()
    }, 500)
  })
}