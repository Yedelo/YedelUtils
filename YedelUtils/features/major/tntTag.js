import PogObject from 'PogData'

import Yettings from '../../yettings'

import {notifications} from '../../utils/constants'

import RankColor from '../../utils/RankColor'



export const values = new PogObject('YedelUtils', {
  bhDisplayX: 5,
  bhDisplayY: 5,
  points: 0,
  kills: 0,
  firstTime: true, // Nick warning / info
})

let players, playerMP, person, personRanked, whoCheck, fight, color
let playingTag, dead
let playerName = Player.getName()

export const target = new Display().hide()
target.setLine(0, new DisplayLine('&c&lBounty &f&lHunting').setShadow(true))
target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
target.setRenderLoc(values.bhDisplayX, values.bhDisplayY) 

// Clickables

const playItem = new Item('minecraft:paper').setName('&r&b&lPlay Again §r§7(Right Click)').getItemStack() 
const leaveItem = new Item('minecraft:bed').setName('&r&c&lReturn To Lobby §r§7(Right Click)').getItemStack()

register('worldLoad', () => { // Bounty hunting specific checker
  if (!Yettings.bountyHunting) return
  dead = false
  playerMP = Player.asPlayerMP()
  person = null
  setTimeout(() => {
    if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') {
      playingTag = true
      target.show()
      target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
      target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
      if (target.getLines()?.[3]?.includes('Your next target is ')) target?.removeLine(3)
      if (values.firstTime) ChatLib.chat("&6&l< BountyHunting > &3If this is your first time using this mod and you're nicked, or you've changed your nick, you will have to set your nick with &n/bh:setnick&r&3.");
      values.firstTime = false
      values.save()
    }
    else {
      playingTag = false
      target.hide()
    }
  }, 500)
})

register('worldLoad', () => { // TNT tag checker for other features. This could likely be merged with the hunting load trigger
  playerName = Player.getName()
  if (!Yettings.clickables) return // In the future, return if all extra features are disabled
  dead = false
  setTimeout(() => {
    if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') {
      return playingTag = true
    }
    playingTag = false
  }, 500)
})

register('chat', () => { // Start of round
  if (!playingTag || dead) return
  if (Yettings.clickables) {
    const inventory = Player.getInventory().getInventory()
    inventory.func_70299_a(Yettings.playAgainItem - 1, playItem)
    inventory.func_70299_a(Yettings.returnToLobbyItem - 1, leaveItem)
  }
  if (!Yettings.bountyHunting) return
  whoCheck = true
  ChatLib.command('who')
  players = TabList.getUnformattedNames()
  players.forEach(element => {
    if (element.includes(playerName)) {
      players = players?.filter(element => !element.includes(playerName))
    }
  })
  const nick = Yettings.nick
  players.forEach(element => {
    if (element.includes(nick)) {
      players = players?.filter(element => !element.includes(nick))
    }
  })
  person = players[Math.floor(Math.random()*players.length)]
  if (Yettings.sounds) World.playSound('random.successful_hit', 10, 0.8)
}).setCriteria('${} has started!')

register('chat', (event) => { // Gets colors of players, defaults to red
  if (!(playingTag && Yettings.bountyHunting)) return
  if (whoCheck) {
    whoCheck = false
    cancel(event)
    const msg = ChatLib.getChatMessage(event, true)
    const playersArray = msg.substring(14).split('&r&7, ')
    playersArray.forEach(element => {if (element.removeFormatting() == person) personRanked = element})
    target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
    target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
    target.setLine(3, new DisplayLine(`&cYour next target is &l${personRanked}.`).setShadow(true))
    if (personRanked?.startsWith('&r&7')) color = RankColor.GRAY
    else if (personRanked?.startsWith('&r&a')) color = RankColor.GREEN
    else if (personRanked?.startsWith('&r&b')) color = RankColor.AQUA
    else if (personRanked?.startsWith('&r&6')) color = RankColor.GOLD
    else color = RankColor.RED
  }
}).setCriteria('ONLINE: ${}')

register('chat', somebody => { // If you hit your target, you will be 'fighting' them
  if (!(playingTag && Yettings.bountyHunting)) return
  if (somebody == person) fight = true
}).setCriteria('You tagged ${somebody}!')

register('attackEntity', entity => {
  if (!(playingTag && Yettings.bountyHunting)) return
  if (entity.name == person && !dead) fight = true
})

register('chat', somebody => { // If your target gets tagged again, you won't be 'fighting' them
  if (!(playingTag && Yettings.bountyHunting)) return
  if (somebody == person && !dead) fight = false
}).setCriteria('${somebody} is IT!')



const black = Renderer.BLACK
const gray = Renderer.GRAY
const green = Renderer.GREEN
const aqua = Renderer.AQUA
const gold = Renderer.GOLD
const red = Renderer.RED

register('renderEntity', entity => { // Renders the distance to your target above them
  if (!(playingTag && Yettings.bountyHunting && Yettings.display)) return
  if (entity.name == person && playerMP.canSeeEntity(entity)) {    
    const partialTicks = Tessellator.getPartialTicks()
    const lastX = entity.getLastX()
    const lastY = entity.getLastY()
    const lastZ = entity.getLastZ()
    const currentX = entity.getX()
    const currentY = entity.getY()
    const currentZ = entity.getZ()
    const blackInc = entity.isSneaking() ? 2.35 : 2.75
    const colorInc = entity.isSneaking() ? 2.4 : 2.8
    Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`,
   			  lastX + (currentX - lastX) * partialTicks, 
			    lastY + (currentY - lastY) * partialTicks + blackInc, 
 			    lastZ + (currentZ - lastZ) * partialTicks, 
			    black, 
			    false, 
			    0.05, 
			    false
    ) // Shadow
    let renderColor
    switch (color) {
      case RankColor.GRAY: 
	      renderColor = gray
        break
      case RankColor.GREEN: 
	      renderColor = green
        break
      case RankColor.AQUA: 
	      renderColor = aqua
        break
      case RankColor.GOLD: 
	      renderColor = gold
        break
      default: 
        renderColor = red
        break
    }
    Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, 
			    lastX + (currentX - lastX) * partialTicks, 
			    lastY + (currentY - lastY) * partialTicks + colorInc, 
			    lastZ + (currentZ - lastZ) * partialTicks, 
			    renderColor, 
			    true, 
			    0.05, 
			    false
    )
  }
}).setFilteredClass(net.minecraft.entity.player.EntityPlayer)

register('playerInteract', (_, __, event) => { // Runs commands for in-game items
  if (!(playingTag && Yettings.clickables)) return
  const itemName = Player.getHeldItem()?.getName()
  if (itemName == '§r§b§lPlay Again §r§7(Right Click)') {
    playingTag = false
    ChatLib.command('play tnt_tntag')
    cancel(event)
  }
  else if (itemName == '§r§c§lReturn To Lobby §r§7(Right Click)') {
    playingTag = false
    ChatLib.command('lobby')
    cancel(event)
  }
})

register('chat', () => {
  if (!playingTag) return
  dead = true
  playingTag = false
  person = null
  target.removeLine(3)
}).setCriteria('You were blown up by ${*} explosion!')

register('chat', people => { // Registers when the round ends 
  if (!playingTag) return
  if (people == 'You') {
    dead = true
    playingTag = false
    person = null
    target.removeLine(3)
  }
  if (people == person && fight && Yettings.bountyHunting) {
    setTimeout(() => {
      const inc = dead ? Math.round(players.length * 0.8) : Math.round(Math.round(players.length * 0.8) / 2)
      values.points += inc
      values.kills += 1
      target.setLine(1, new DisplayLine(`&a${values.points} points (+${inc})`).setShadow(true))
      target.setLine(2, new DisplayLine(`&a${values.kills} kills (+1)`).setShadow(true))
      target.setLine(3, new DisplayLine('&cYou killed your target!').setShadow(true))  
      if (Yettings.sounds) World.playSound('random.successful_hit', 10, 1.04)
      values.save()
    }, 500) 
  }
}).setCriteria('${people} blew up!')

register('chat', () => {
  ChatLib.chat('&c&lBounty&f&lHunting > &ePlease set your nick with /bh:setnick or in the config.')
}).setCriteria('Processing request. Please wait...') // When you change your nick



Yettings.reset = () => {
  notifications.push('Bounty Hunting', 'Are you sure you want to reset your stats? (click)', 3, reset) // Essential notifications in the config GUI
}

const reset = () => {
  values.points = 0
  values.kills = 0
  target.setLine(1, new DisplayLine(`&a0 points &7(reset)`).setShadow(true))
  target.setLine(2, new DisplayLine(`&a0 kills &7(reset)`).setShadow(true))
  values.save()
  notifications.push('Bounty Hunting', 'Reset stats!', 3)
}