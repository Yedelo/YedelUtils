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
import './features/clickablesDisplay'
import './features/displayText'
import './features/drawBookBackground'
import './features/dropperGG'
import './features/moveTextGui'
import './features/playtime'
import './features/randomPhrases'
import './features/sacrificeDisplay'
import './features/yedelSchedule'

// Features with more than one register usually constitute major features

import './features/major/autoAtlas'
import './features/major/hypixelSaysHelper'
import './features/major/marketSearches'
import './features/major/ping'
import './features/major/strengthIndicators'
import './features/major/tntTag'

// Module

import {YedelCheck, isYedelModActive, logo, version} from './utils/constants'
import welcomeMessage from './utils/welcomeMessage'
import vals from './utils/vals'


if (isYedelModActive) { // if YedelMod detected
  YedelCheck.YedelUtils = true // Tells YedelMod that YedelUtils is active
  const yedelActive = register('worldLoad', () => {
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
  val ? target.show() : target.hide()
})

if (vals[version]) {
  const firstTime = register('worldLoad', () => {
    setTimeout(() => { // First load / changelog message
      vals[version] = false
      vals.save()
      welcomeMessage()
      firstTime.unregister()
    }, 500)
  })
}