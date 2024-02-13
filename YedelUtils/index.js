import PogObject from 'PogData'

import Yettings from './yettings.js'
import {uuid, yedel, welcomeMessage} from './stuff.txt'
import {f1, f2, f3, f4, f5, f6, f7, f8} from './stuff.txt'
import * as tag from './features/tntTag'
import * as swi from './features/strengthIndicators'
import * as hsh from './features/hypixelSaysHelper'
import * as display from './features/sacrificeDisplay.js'
import './features/marketSearches'
import './features/ping'

const vals = new PogObject('YedelUtils', {
  displayedText: 'Display text&e', // If anyone actually wants to use 'Display text' as their display text
  displayX: 5,
  displayY: 5,
  ptminutes: 0,
  first: true
})

tag.values.randomVariableIHaveToChangeForSomeReason = 3
tag.values.save()

const displayText = new Display().setRenderLoc(vals.displayX, vals.displayY)
if (vals.displayedText != 'Display text&e') displayText.setLine(0, new DisplayLine(vals.displayedText).setShadow(true))

register('command', () => { // Formatting guide
  ChatLib.chat(f1)
  ChatLib.chat('')
  ChatLib.chat(f2)
  ChatLib.chat(f3)
  ChatLib.chat(f4)
  ChatLib.chat(f5)
  ChatLib.chat('')
  ChatLib.chat(f6)  
  ChatLib.chat(f7)
  ChatLib.chat('') 
  ChatLib.chat(f8)
}).setName('formatting')

register('command', ...args => { // Display text
  if (args.join('') == '') {
    return ChatLib.chat('&9&l< Yedel > &cYou must provide valid text!')
  }
  displayText.setLine(0, new DisplayLine(args.join(' ')).setShadow(true))
  vals.displayedText = args.join(' ')
  ChatLib.chat(`&9&l< Yedel > &eSet display text to &6"` + args.join(' ') + `&6"! &eUse &6/cleartext &eto remove the text and &6/movetext &eto move it.`)
  vals.save()
}).setName('settext')
  
register('command', () => { // don't display text
  displayText.clearLines()
  vals.displayedText = ''
  vals.save()
  ChatLib.chat(`&9&l< Yedel > &cCleared display!`) 
}).setName('cleartext')

register('step', () => { // Playtime
  if (!Server.getIP()) return // Check if you're online
  vals.ptminutes ++
  vals.save()
}).setDelay(60)

register('command', () => { // Playtime command
  hours = Math.floor(vals.ptminutes / 60)
  minutes = vals.ptminutes % 60
  ChatLib.chat(`&9&l< Yedel > &ePlaytime: &6${hours} hours &eand &6${minutes} minutes`)
}).setName('yedelplaytime').setAliases('ypt', 'yedelpt')

register('messageSent', (message, event) => { // Random message blocks
  if (message.includes(Yettings.randomString)) {
    cancel(event)
    ChatLib.say(message.replace(Yettings.randomString, `@${uuid()}`))
  }
})

register('command', () => { // Limbo command
  ChatLib.say('§')
  setTimeout(() => {
    if (Scoreboard.getTitle() /* if in a lobby still */) ChatLib.say('§')
  }, 500)
}).setName('yedelli').setAliases('yli', 'li')

const creative = net.minecraft.world.WorldSettings$GameType.CREATIVE

register('chat', () => ChatLib.command('yedellimbocreative', true)).setCriteria('You were spawned in Limbo.') // Auto limbo creative

register('command', () => {
  playerController = Client.getMinecraft().field_71442_b
  if (!Scoreboard.getTitle() && World.getAllEntities().length == 2 && World.getBlockAt(-26, 36, 28).toString() == 'Block{type=minecraft:brown_mushroom_block, x=-26, y=36, z=28}'  /* limbo checks */) {
    playerController.func_78746_a(creative) 
    setTimeout(() => {ChatLib.chat('&9&l< Yedel > &eSet gamemode to creative!')}, 100)
  } 
  else if (playerController.func_78758_h()) ChatLib.chat('&9&l< Yedel > &cYou are already in creative mode!')
  else ChatLib.chat('&9&l< Yedel > &cLimbo check failed, try again in a bit!')
}).setName('yedellimbocreative').setAliases('limbogmc', 'lgmc')

register('chat', (rank, newjoin) => {
  if (!Yettings.guildWelcome) return
  ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${rank} ${newjoin} joined the guild!') // Auto guild welcome

register('chat', newjoin => {
  if (!Yettings.guildWelcome) return
  if (!newjoin.startsWith('[')) ChatLib.command(`gc Welcome, ${newjoin}!`)
}).setCriteria('${newjoin} joined the guild!') // Auto guild welcome

register('chat', fails => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria('                                Total Fails: ${fails}').setContains()

register('chat', event => { 
  if (!Yettings.dropperGG) return
  setTimeout(() => {ChatLib.command('ac gg')}, Yettings.dropperGGDelay * 1000)
}).setCriteria("                              You didn't finish!")



const moveText = new Gui() // Display text GUI
moveText.addButton(-1, (Renderer.screen.getWidth() / 2) - 50, 40, 100, 20, 'Reset (R)')
moveText.addButton(-2, Renderer.screen.getWidth() - 30, 10, 20, 20, 'X')
moveText.addButton(-3, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 29, 131, 20, 'Center Horizontally (H)')
moveText.addButton(-4, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 53, 131, 20, 'Center Vertically (V)')

const white = Renderer.WHITE // To not access this property every frame
const yellow = Renderer.YELLOW

moveText.registerDraw((mouseX, mouseY, partialTicks) => {
  text = vals.displayedText
  screenWidth = Renderer.screen.getWidth()
  screenHeight = Renderer.screen.getHeight()
  textWidth = Renderer.getStringWidth(text)
  mouseXTicks = mouseX + partialTicks
  mouseYTicks = mouseY + partialTicks

  Renderer.translate(0, 0, -255)
  moveText.func_146270_b(1) // Default gradient background
  Renderer.translate(0, 0, 0)
  moveText.drawString('Move your mouse to where you want to place the text, then click to set it.', Renderer.screen.getWidth() / 2 - 185.5, 25, Renderer.WHITE);
  moveText.drawString('Example text', mouseXTicks, mouseYTicks, yellow)
  moveText.drawString(`(${mouseX}, ${mouseY})`, mouseXTicks, mouseYTicks + 15, white)
  moveText.drawString(`Width of screen: ${screenWidth}`, 10, screenHeight - 32, white)
  moveText.drawString(`Height of screen: ${screenHeight}`, 10, screenHeight - 16, white)
  Renderer.drawString(text, vals.displayX, vals.displayY, true)
})

moveText.registerClicked((mouseX, mouseY) => {
  displayText.setRenderLoc(mouseX, mouseY)
  vals.displayX = mouseX
  vals.displayY = mouseY
  vals.save()
})

moveText.registerActionPerformed(id => {
  if (id == -1) { // Reset
    setTimeout(() => {
      displayText.setRenderLoc(5, 5)
      vals.displayX = 5
      vals.displayY = 5
      vals.save() 
    }, 1) // Delay to perform right after click trigger above
  }
  else if (id == -2) { // Close
    pastX = vals.displayX // Quickly store values before click is performed
    pastY = vals.displayY
    Client.getMinecraft().func_147108_a(null)
    setTimeout(() => {
      displayText.setRenderLoc(pastX, pastY)
      vals.displayX = pastX
      vals.displayY = pastY
      vals.save() 
    }, 1)
  }
  else if (id == -3) { // Center horizontally
    pastY = vals.displayY
    setTimeout(() => {
      centerX = (Renderer.screen.getWidth() - Renderer.getStringWidth(vals.displayedText)) / 2
      displayText.setRenderLoc(centerX, pastY)
      vals.displayX = centerX
      vals.displayY = pastY
      vals.save() 
    }, 1)
  }
  else if (id == -4) { // Center vertically
    pastX = vals.displayX
    setTimeout(() => {
      centerY = Renderer.screen.getHeight() / 2
      displayText.setRenderLoc(pastX, centerY)
      vals.displayX = pastX
      vals.displayY = centerY
      vals.save() 
    }, 1)
  }
})

moveText.registerKeyTyped(key => {
  key = ChatLib.removeFormatting(key)
  if (key == 'r') {
    displayText.setRenderLoc(5, 5)
    vals.displayX = 5
    vals.displayY = 5
    vals.save() 
  }
  else if (key == 'v') {
    centerY = Renderer.screen.getHeight() / 2
    displayText.setRenderLoc(vals.displayX, centerY)
    vals.displayY = centerY
    vals.save() 
  }
  else if (key == 'h') {
    centerX = (Renderer.screen.getWidth() - Renderer.getStringWidth(vals.displayedText)) / 2
    displayText.setRenderLoc(centerX, vals.displayY)
    vals.displayX = centerX
    vals.save() 
  }
})

register('command', () => moveText.open()).setName('movetext')



register('step', () => { // yedel
  if (!Server.getIP()) return
  m = Math.floor(Math.random() * 120)
  if (m == 42) yedel()
}).setDelay(30)

Yettings.registerListener('SkyWars strength indicators', val => {
  if (val) swi.killTriggers.forEach(trigger => trigger.register())
  else swi.killTriggers.forEach(trigger => trigger.unregister())
})

Yettings.registerListener('Bounty Hunting', val => {
  if (Scoreboard.getTitle().removeFormatting() != 'TNT TAG') return
  if (val) tag.target.show()
  else tag.target.hide()
})

Yettings.registerListener('Hypixel Says helper', val => {
  hsh.restart()
  title = Scoreboard.getTitle().removeFormatting()
  if (direction && (title == 'HYPIXEL SAYS' || title == 'SANTA SAYS')) {
    return hsh.taskTriggers.forEach(trigger => trigger.register())
  }
  hsh.taskTriggers.forEach(trigger => trigger.unregister())
})

Yettings.reset = () => {
  tag.values.points = 0
  tag.values.kills = 0
  tag.target.setLine(1, new DisplayLine(`&a0 points &7(reset)`).setShadow(true))
  tag.target.setLine(2, new DisplayLine(`&a0 kills &7(reset)`).setShadow(true))
  tag.values.save()
}

register('command', () => Yettings.openGUI()).setName('yettings').setAliases('yedel')

if (vals.first) {
  const firstTime = register('worldLoad', () => {
    setTimeout(() => { // First load message
      if (vals.first) {
        vals.first = false
        vals.save()
        welcomeMessage()
        firstTime.unregister()
      }
    }, 500)
  })
}