import Promise from 'PromiseV2'
import {killMessages} from '../stuff.txt'
import Yettings from '../yettings'

export const killTriggers = []

const setStrengthNormal = player => { // 5s strength promise
  return new Promise((resolve) => {
    player.setNametagName(new TextComponent('&4' + player.getName() + ' &4&lStrength'))
    setTimeout(() => {resolve()}, 5000)
  })
}

const setStrengthExtended = player => { // 5.5s strength promise
  return new Promise((resolve) => {
    player.setNametagName(new TextComponent('&6' + player.getName() + ' &6&lStrength?'))
    setTimeout(() => {resolve()}, 500)
  })
}

export const skywarsCheck = register('worldLoad', () => { // Skywars checker
  if (!Yettings.strengthIndicators) return
  setTimeout(() => {
    if (Scoreboard.getTitle() == '§e§lSKYWARS') killTriggers.forEach(elem => elem.register())
    else killTriggers.forEach(elem => elem.unregister())
  }, 300)
})

killMessages.forEach(elem => {
  trigger = register('chat', (killed, killer, event) => {
    if (!Yettings.strengthIndicators) return
    World.getAllPlayers().forEach(player => {
      if (player.name == killer) {
        before = player.getName()
        setStrengthNormal(player).then(() => 
          setStrengthExtended(player)
        ).then(() => {
          color = before == Player.getName() ? '&a' : '&c'
          player.setNametagName(new TextComponent(color + before))
        })
      }
    })
  }).setCriteria(elem)
  killTriggers.push(trigger)
})

if (!Yettings.strengthIndicators) killTriggers.forEach(trigger => trigger.unregister())