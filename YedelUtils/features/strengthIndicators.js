import Promise from 'PromiseV2'
import {killMessages} from 'YedelUtils/longstuff.txt'

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
  setTimeout(() => {
    if (Scoreboard.getTitle() == '§e§lSKYWARS') killTriggers.forEach(elem => elem.register())
    else killTriggers.forEach(elem => elem.unregister())
  }, 300)
})

export const registerTriggers = () => { // Create triggers
  killMessages.forEach(elem => {
    const trigger = register('chat', (killed, killer, event) => {
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
    }).setCriteria(elem).unregister()
    killTriggers.push(trigger)
  })
}
