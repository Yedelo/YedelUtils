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

let players, playerMP, person, personRanked, whoCheck, fight, color, e

export const target = new Display().hide()
target.setLine(0, new DisplayLine('&c&lBounty &f&lHunting').setShadow(true))
target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
target.setRenderLoc(values.bhDisplayX, values.bhDisplayY) 



export const moveHuntingText = new Gui() // Display text GUI
moveHuntingText.addButton(-3, (Renderer.screen.getWidth() / 2) - 50, 40, 100, 20, 'Reset')
moveHuntingText.addButton(-4, Renderer.screen.getWidth() - 30, 10, 20, 20, 'X')

moveHuntingText.registerOpened(() => target.hide())

moveHuntingText.registerDraw((mouseX, mouseY, partialTicks) => {
  mouseXTicks = mouseX + partialTicks
  mouseYTicks = mouseY + partialTicks

  Renderer.translate(0, 0, -255)
  Client.currentGui.get().func_146270_b(1) // Default gradient background
  Renderer.translate(0, 0, 0)
  moveHuntingText.drawString('Move your mouse to where you want to place the info, then click to set it.', Renderer.screen.getWidth() / 2 - 185.5, 25, Renderer.WHITE)
  Renderer.drawString(`&c&lBounty &f&lHunting\n&a85 points\n&a27 kills\n&cYour next target is &aYedelos.\n\n&f(${mouseX}, ${mouseY})`, mouseX, mouseY, true)
  // moveHuntingText.drawString(`(${mouseX}, ${mouseY})`, mouseXTicks, mouseYTicks + 15, Renderer.WHITE)
  Renderer.drawString('&c&lBounty &f&lHunting\n&aCurrent position\n&aCurrent position\n&cYour next target is here.', values.bhDisplayX, values.bhDisplayY, true)
})

moveHuntingText.registerClicked((mouseX, mouseY) => {
  target.setRenderLoc(mouseX, mouseY)
  values.bhDisplayX = mouseX
  values.bhDisplayY = mouseY
  values.save()
})

moveHuntingText.registerActionPerformed(id => {
  if (id == -4) {
    pastX = values.bhDisplayX // Quickly store values before click is performed
    pastY = values.bhDisplayY
    Client.getMinecraft().func_147108_a(null)
    setTimeout(() => {
      target.setRenderLoc(pastX, pastY)
      values.bhDisplayX = pastX
      values.bhDisplayY = pastY
      values.save() 
    }, 1)
    return
  }
  setTimeout(() => {
    target.setRenderLoc(5, 5)
    values.bhDisplayX = 5
    values.bhDisplayY = 5
    values.save() 
  }, 1) // Delay to perform right after click trigger above
})

moveHuntingText.registerClosed(() => {if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') target.show()})



register('command', () => moveHuntingText.open()).setName('movehuntingtext')

export const loadTrigger = register('worldLoad', () => { // TNT tag checker
  playerMP = Player.asPlayerMP()
  person = null
  setTimeout(() => {
    if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') {
      target.show()
      target.setLine(1, new DisplayLine(`&a${values.points} points`).setShadow(true))
      target.setLine(2, new DisplayLine(`&a${values.kills} kills`).setShadow(true))
      if (Scoreboard.getLines().length != 8) startTrigger.register()
      if (target.getLines().length > 3) target.removeLine(3)
      if (values.firstTime) ChatLib.chat("&6&l< BountyHunting > &3If this is your first time using this mod and you're nicked, or you've changed your nick, you will have to set your nick with &n/bh:setnick&r&3.")
      values.firstTime = false
      values.save()
    }
    else {
      target.hide()
      startTrigger.unregister()
      whoTrigger.unregister()
      taggedTrigger.unregister()
      itTrigger.unregister()
      hitTrigger.register()
      blewTrigger.unregister()
      locationTrigger.unregister()
      clickablesTrigger.unregister()
    }
  }, 500)
}).unregister()

const startTrigger = register('chat', () => { // Registers when the round starts
  whoCheck = true
  whoTrigger.register()
  ChatLib.command('who')
  if (Yettings.clickables) clickablesTrigger.register()
  taggedTrigger.register()
  itTrigger.register()
  hitTrigger.register()
  blewTrigger.register()
  if (Yettings.clickables) {
    Player.getInventory().getInventory().func_70299_a(7, new Item('minecraft:paper').setName('&b&lPlay Again &r&7(Right Click)').getItemStack())
    Player.getInventory().getInventory().func_70299_a(8, new Item('minecraft:bed').setName('&c&lReturn To Lobby &r&7(Right Click)').getItemStack())
  }
  if (Yettings.display) locationTrigger.register()
  players = TabList.getUnformattedNames()
  players.forEach(element => {if (element.includes(Player.getName())) players = players.filter(element => !element.includes(Player.getName()))})
  players.forEach(element => {if (element.includes(Yettings.nick)) players = players.filter(element => !element.includes(Yettings.nick))})
  person = players[Math.floor(Math.random()*players.length)]
  if (Yettings.sounds) World.playSound('random.successful_hit', 10, 0.8)
}).setCriteria('${} has started!').unregister()

const whoTrigger = register('chat', (event) => { // Gets ranks of players
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
}).setCriteria('ONLINE: ${}').unregister()

const taggedTrigger = register('chat', somebody => { // If you hit your target, you will be 'fighting' them
  if (somebody == person) fight = true
}).setCriteria('You tagged ${somebody}!').unregister()

const itTrigger = register('chat', somebody => { // If your target gets tagged again, you won't be 'fighting' them
  if (somebody == person) fight = false
}).setCriteria('${somebody} is IT!').unregister()

const hitTrigger = register('attackEntity', entity => { // If you hit your target while they are it, you are 'fighting' them
  if (entity.name == person) fight = true
}).unregister()

const locationTrigger = register('renderEntity', entity => { // Renders the distance to your target above them
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
    Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + blackInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.BLACK, false, 0.05, false)
    switch (color) {
      case 'gray':
        Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.GRAY, true, 0.05, false)
        break
      case 'green':
        Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.GREEN, true, 0.05, false)
        break
      case 'aqua':
        Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.AQUA, true, 0.05, false)
        break
      case 'gold':
        Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.GOLD, true, 0.05, false)
        break
      default:
        Tessellator.drawString(`Distance: ${Math.floor(Player.asPlayerMP().distanceTo(entity))} blocks`, lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + colorInc, lastZ + (currentZ - lastZ) * partialTicks, Renderer.RED, true, 0.05, false)
      }
  }
}).setFilteredClass(net.minecraft.entity.player.EntityPlayer).unregister()

const clickablesTrigger = register('playerInteract', (x, y, button) => { // Runs commands for in-game items
  if (Player.getHeldItem()?.getName() == '§b§lPlay Again §r§7(Right Click)') ChatLib.command('play tnt_tntag')
  if (Player.getHeldItem()?.getName() == '§c§lReturn To Lobby §r§7(Right Click)') ChatLib.command('lobby')
})

const blewTrigger = register('chat', (people) => { // Registers when the round ends 
  if (people == 'You' && target.getLines().length == 4) {
    person = null
    target.removeLine(3)
    startTrigger.unregister()
    whoTrigger.unregister()
    taggedTrigger.unregister()
    itTrigger.unregister()
    hitTrigger.register()
    blewTrigger.unregister()
    locationTrigger.unregister()
    clickablesTrigger.unregister()
  }
  if (people == person && fight) {
    setTimeout(() => {
      inc = Scoreboard.getLines().length == 10 ? Math.round(players.length * 0.8) : Math.round(Math.round(players.length * 0.8) / 2)
      values.points += inc
      values.kills += 1
      target.setLine(1, new DisplayLine(`&a${values.points} points (+${inc})`).setShadow(true))
      target.setLine(2, new DisplayLine(`&a${values.kills} kills (+1)`).setShadow(true))
      target.setLine(3, new DisplayLine('&cYou killed your target!').setShadow(true))  
      if (Yettings.sounds) World.playSound('random.successful_hit', 10, 1.04)
      values.save()
      blewTrigger.unregister()
      locationTrigger.unregister()
    }, 500) 
  }
}).setCriteria('${people} blew up!').unregister()

Yettings.registerListener('Highlight target and show distance', val => {
  if (val) locationTrigger.register(); return
  locationTrigger.unregister(); return
})

Yettings.registerListener('Give items to play again and leave the game', val => {
  if (val) clickablesTrigger.register(); return
  clickablesTrigger.unregister(); return
})

register('command', arghh => { 
  Yettings.nick = arghh
  ChatLib.chat(`&6&l< BountyHunting > &3Set nick to &n${arghh}&r&3!`)
  Yettings.save()
}).setName('bh:setnick')

nickCheck = register('chat', () => {
  ChatLib.chat('&6&l< BountyHunting > &3Please set your nick with &n/bh:setnick&r&3 or in the config.')
}).setCriteria('Processing request. Please wait...')