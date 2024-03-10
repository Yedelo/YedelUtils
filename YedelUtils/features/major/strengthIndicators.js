import Yettings from '../../yettings'

import {killMessages} from '../../utils/constants'




export const killTriggers = []

const strengthPlayers = new Map // All players who had strength at any point during the game
const startStrengthPlayers = [] // 5.5s to 0.5s
const endStrengthPlayers = [] // Apothecary bonus

let playingSw
let playerMP

register('worldLoad', () => { // Skywars checker
  strengthPlayers.clear()
  startStrengthPlayers.length = 0
  endStrengthPlayers.length = 0
  if (!Yettings.strengthIndicators) return
  setTimeout(() => {
    if (Scoreboard.getTitle().removeFormatting() == 'SKYWARS') {
      playingSw = true
      playerMP = Player.asPlayerMP()
    }
    else {
      playingSw = false
    }
  }, 300)
})

const strength = (killed, num, killer, event) => {
  if (!Yettings.strengthIndicators || !playingSw) return
  if (!event) { // If the message isnt 'killed was victim # of killer'
    event = killer
    killer = num
    num = 0
  }
  strengthPlayers.set(killer, 5.5)
  if (startStrengthPlayers.indexOf(killer) == -1) {
    startStrengthPlayers.push(killer)
  }
  endStrengthPlayers.pop(killer)
  // strengthPlayers.set(killed, 0) Currently breaks things
}

register('step', () => {
  if (!playingSw || !Yettings.strengthIndicators) return
  strengthPlayers.forEach((seconds, player) => {
    strengthPlayers.set(player, seconds - 0.5)
    if (seconds == 0.5) { // Apothecary stage
      startStrengthPlayers.pop(player)
      endStrengthPlayers.push(player)
    }
    else if (!seconds) {
      startStrengthPlayers.pop(player)
      endStrengthPlayers.pop(player)
    }
  })
}).setFps(2)

killMessages.forEach(msg => register('chat', strength).setCriteria(msg)) // utils/constants

// Short list of killerless messages

register('chat', killed => {
  strengthPlayers.set(killed, 0)
}).setCriteria('${killed} blew up.')

register('chat', killed => {
  strengthPlayers.set(killed, 0)
}).setCriteria('${killed} fell into the void.')

register('chat', killed => {
  strengthPlayers.set(killed, 0)
}).setCriteria('${killed} died.')



const black = Renderer.BLACK
const darkRed = Renderer.DARK_RED
const gold = Renderer.GOLD

register('renderEntity', entity => {
  if (!Yettings.strengthIndicators || !playingSw) return
  const entityName = entity.name
  const inStart = startStrengthPlayers.includes(entityName)
  const inEnd = endStrengthPlayers.includes(entityName)
  if (playerMP.canSeeEntity(entity)) {
    let text = 'Strength'
    let color = darkRed
    if (inEnd) {
      text = 'Strength ?'
      color = gold
    }
    else if (!inStart) return
    partialTicks = Tessellator.getPartialTicks()
    lastX = entity.getLastX()
    lastY = entity.getLastY()
    lastZ = entity.getLastZ()
    currentX = entity.getX()
    currentY = entity.getY()
    currentZ = entity.getZ()
    blackInc = entity.isSneaking() ? 2.65 : 3.05
    colorInc = entity.isSneaking() ? 2.7 : 3.1
    Tessellator.drawString(text, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + blackInc, lastZ + (currentZ - lastZ) * partialTicks, black, false, 0.05, false); // Shadow  
    Tessellator.drawString(text, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, color, true, 0.05, false);
  }
}).setFilteredClass(net.minecraft.entity.player.EntityPlayer)