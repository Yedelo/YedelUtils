import PogObject from 'PogData'
import Yettings from '../yettings'

export const values = new PogObject('YedelUtils', {
  bhDisplayX: 5,
  bhDisplayY: 5,
  points: 0,
  kills: 0,
  firstTime: true,
  randomVariableIHaveToChangeForSomeReason: 0
})

values.randomVariableIHaveToChangeForSomeReason = 9
values.save()

let players, playerMP, person, personRanked, whoCheck, fight, color
let playingTag, dead

export const target = new Display().hide()
target.setLine(0, new DisplayLine('&c&lBounty &f&lHunting').setShadow(true))
target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
target.setRenderLoc(values.bhDisplayX, values.bhDisplayY) 

const playItem = new Item('minecraft:paper').setName('&r&b&lPlay Again §r§7(Right Click)').getItemStack()
const leaveItem = new Item('minecraft:bed').setName('&r&c&lReturn To Lobby §r§7(Right Click)').getItemStack()



export const moveHuntingText = new Gui() // Display text GUI
moveHuntingText.addButton(-1, (Renderer.screen.getWidth() / 2) - 50, 40, 100, 20, 'Reset (R)')
moveHuntingText.addButton(-2, Renderer.screen.getWidth() - 30, 10, 20, 20, 'X')
moveHuntingText.addButton(-3, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 29, 131, 20, 'Center Vertically (V)');

moveHuntingText.registerOpened(() => target.hide())

const white = Renderer.WHITE

moveHuntingText.registerDraw((mouseX, mouseY, partialTicks) => {
  mouseXTicks = mouseX + partialTicks
  mouseYTicks = mouseY + partialTicks

  Renderer.translate(0, 0, -255)
  Client.currentGui.get().func_146270_b(1) // Default gradient background
  Renderer.translate(0, 0, 0)
  moveHuntingText.drawString('Move your mouse to where you want to place the info, then click to set it.', Renderer.screen.getWidth() / 2 - 185.5, 25, white)
  Renderer.drawString(`&c&lBounty &f&lHunting\n&a85 points\n&a27 kills\n&cYour next target is &aYedelos.\n\n&f(${mouseX}, ${mouseY})`, mouseX, mouseY, true);
  // moveHuntingText.drawString(`(${mouseX}, ${mouseY})`, mouseXTicks, mouseYTicks + 15, white)
  Renderer.drawString('&c&lBounty &f&lHunting\n&aCurrent position\n&aCurrent position\n&cYour next target is here.', values.bhDisplayX, values.bhDisplayY, true)
})

moveHuntingText.registerClicked((mouseX, mouseY) => {
  target.setRenderLoc(mouseX, mouseY)
  values.bhDisplayX = mouseX
  values.bhDisplayY = mouseY
  values.save()
})

moveHuntingText.registerActionPerformed(id => {
  if (id == -1) { // Reset
    setTimeout(() => {
      target.setRenderLoc(5, 5)
      values.bhDisplayX = 5
      values.bhDisplayY = 5
      values.save() 
    }, 1) // Delay to perform right after click trigger above
  }
  else if (id == -2) { // Close
    pastX = values.bhDisplayX // Quickly store values before click is performed
    pastY = values.bhDisplayY
    Client.getMinecraft().func_147108_a(null)
    setTimeout(() => {
      target.setRenderLoc(pastX, pastY)
      values.bhDisplayX = pastX
      values.bhDisplayY = pastY
      values.save() 
    }, 1)
  }
  else if (id == -3) { // Center vertically
    pastX = values.bhDisplayX // Quickly store values before click is performed
    setTimeout(() => {
      centerY = (Renderer.screen.getHeight() - 36) / 2
      target.setRenderLoc(pastX, centerY)
      values.bhDisplayX = pastX
      values.bhDisplayY = centerY
      values.save() 
    }, 1)  
  }
})

moveHuntingText.registerKeyTyped(key => {
  key = ChatLib.removeFormatting(key)
  if (key == 'r') {
    target.setRenderLoc(5, 5)
    values.bhDisplayX = 5
    values.bhDisplayY = 5
    values.save() 
  }
  else if (key == 'v') {
    centerY = Renderer.screen.getHeight() / 2
    target.setRenderLoc(values.bhDisplayX, centerY)
    values.bhDisplayY = centerY
    values.save() 
  }
})

moveHuntingText.registerClosed(() => {if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') target.show()})



register('command', () => moveHuntingText.open()).setName('movehuntingtext')

register('worldLoad', () => { // TNT tag checker for bounty hunting
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
      if (target.getLines().length > 3) target.removeLine(3)
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

register('worldLoad', () => { // TNT tag checker for other features. This could likely be merged with the hunting load trigger;
  if (!Yettings.clickables) return // make this all other custom features when they are added;
  dead = false
  setTimeout(() => {
    if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') {
      return playingTag = true
    }
    playingTag = false
  }, 500)
})

startTrigger = register('chat', () => { // Registers when the round starts
  if (!playingTag) return
  if (Yettings.clickables) {
    Player.getInventory().getInventory().func_70299_a(7, playItem)
    Player.getInventory().getInventory().func_70299_a(8, leaveItem)
  }
  if (!Yettings.bountyHunting) return
  whoCheck = true
  ChatLib.command('who')
  players = TabList.getUnformattedNames()
  players.forEach(element => {if (element.includes(Player.getName())) players = players?.filter(element => !element.includes(Player.getName()))});
  players.forEach(element => {if (element.includes(Yettings.nick)) players = players?.filter(element => !element.includes(Yettings.nick))});
  person = players[Math.floor(Math.random()*players.length)]
  if (Yettings.sounds) World.playSound('random.successful_hit', 10, 0.8)
}).setCriteria('${} has started!')

whoTrigger = register('chat', (event) => { // Gets ranks of players
  if (!(playingTag && Yettings.bountyHunting)) return
  if (whoCheck) {
    whoCheck = false
    cancel(event)
    msg = ChatLib.getChatMessage(event, true)
    playersArray = msg.substring(14).split('&r&7, ')
    playersArray.forEach(element => {if (element.removeFormatting() == person) personRanked = element})
    target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
    target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
    target.setLine(3, new DisplayLine(`&cYour next target is &l${personRanked}.`).setShadow(true))
    if (personRanked.startsWith('&r&7')) color = 'gray'
    else if (personRanked.startsWith('&r&a')) color = 'green'
    else if (personRanked.startsWith('&r&b')) color = 'aqua'
    else if (personRanked.startsWith('&r&6')) color = 'gold'
    else color = 'other'
  }
}).setCriteria('ONLINE: ${}')

taggedTrigger = register('chat', somebody => { // If you hit your target, you will be 'fighting' them
  if (!(playingTag && Yettings.bountyHunting)) return
  if (somebody == person) fight = true
}).setCriteria('You tagged ${somebody}!')

itTrigger = register('chat', somebody => { // If your target gets tagged again, you won't be 'fighting' them
  if (!(playingTag && Yettings.bountyHunting)) return
  if (somebody == person) fight = false
}).setCriteria('${somebody} is IT!')

hitTrigger = register('attackEntity', entity => {
  if (!(playingTag && Yettings.bountyHunting)) return
  if (entity.name == person) fight = true
})

const black = Renderer.BLACK
const gray = Renderer.GRAY
const green = Renderer.GREEN
const aqua = Renderer.AQUA
const gold = Renderer.GOLD
const red = Renderer.RED

locationTrigger = register('renderEntity', entity => { // Renders the distance to your target above them
  if (!(playingTag && Yettings.bountyHunting && Yettings.display)) return
  if (entity.name == person && playerMP.canSeeEntity(entity)) {    
    partialTicks = Tessellator.getPartialTicks()
    lastX = entity.getLastX()
    lastY = entity.getLastY()
    lastZ = entity.getLastZ()
    currentX = entity.getX()
    currentY = entity.getY()
    currentZ = entity.getZ()
    blackInc = entity.isSneaking() ? 2.35 : 2.75
    colorInc = entity.isSneaking() ? 2.4 : 2.8
    Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + blackInc, lastZ + (currentZ - lastZ) * partialTicks, black, false, 0.05, false); // Shadow
    switch (color) {
      case 'gray':
        Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, gray, true, 0.05, false);
        break
      case 'green':
        Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, green, true, 0.05, false);
        break
      case 'aqua':
        Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, aqua, true, 0.05, false);
        break
      case 'gold':
        Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, gold, true, 0.05, false);
        break
      default:
        Tessellator.drawString(`Distance: ${Math.floor(playerMP.distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, red, true, 0.05, false);
      }
  }
}).setFilteredClass(net.minecraft.entity.player.EntityPlayer)

register('playerInteract', (action, pos, event) => { // Runs commands for in-game items
  if (!(playingTag && Yettings.clickables)) return
  if (Player.getHeldItem()?.getName() == '§r§b§lPlay Again §r§7(Right Click)') {
    playingTag = false
    ChatLib.command('play tnt_tntag')
    cancel(event)
  }
  else if (Player.getHeldItem()?.getName() == '§r§c§lReturn To Lobby §r§7(Right Click)') {
    playingTag = false
    ChatLib.command('lobby')
    cancel(event)
  }
})

diedTrigger = register('chat', () => {
  if (!playingTag) return
  dead = true
  playingTag = false
  person = null
  target.removeLine(3)
}).setCriteria('You were blown up by ${} explosion!')

blewTrigger = register('chat', people => { // Registers when the round ends 
  if (!playingTag) return
  if (people == 'You') {
    dead = true
    playingTag = false
    person = null
    target.removeLine(3)
  }
  if (people == person && fight && Yettings.bountyHunting) {
    setTimeout(() => {
      inc = dead ? Math.round(players.length * 0.8) : Math.round(Math.round(players.length * 0.8) / 2)
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

register('command', Argh => { 
  Yettings.nick = Argh
  ChatLib.chat(`&6&l< BountyHunting > &3Set nick to &n${Argh}&r&3!`)
  Yettings.save()
}).setName('bh:setnick')

register('chat', () => {
  ChatLib.chat('&6&l< BountyHunting > &3Please set your nick with &n/bh:setnick&r&3 or in the config.')
}).setCriteria('Processing request. Please wait...')