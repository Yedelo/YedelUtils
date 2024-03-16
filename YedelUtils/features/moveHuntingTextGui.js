import {displayGuiScreen, drawWorldBackground, isMouseOver} from '../utils/mappings'

import {mc} from '../utils/constants'

import {values, target} from './major/tntTag'



export default moveHuntingText = new Gui() // Display text GUI
moveHuntingText.addButton(-1, (Renderer.screen.getWidth() / 2) - 50, 40, 100, 20, 'Reset (R)')
moveHuntingText.addButton(-2, Renderer.screen.getWidth() - 30, 10, 20, 20, 'X')
moveHuntingText.addButton(-3, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 29, 131, 20, 'Center Vertically (V)');
buttons = [moveHuntingText.getButton(-1), moveHuntingText.getButton(-2), moveHuntingText.getButton(-3)]

moveHuntingText.registerOpened(() => target.hide())

const white = Renderer.WHITE

moveHuntingText.registerDraw((mouseX, mouseY) => {
  Renderer.translate(0, 0, -255)
  moveHuntingText[drawWorldBackground](1)
  Renderer.translate(0, 0, 0)
  moveHuntingText.drawString('Move your mouse to where you want to place the info, then click to set it.', Renderer.screen.getWidth() / 2 - 185.5, 25, white)
  Renderer.drawString(`&c&lBounty &f&lHunting\n&a85 points\n&a27 kills\n&cYour next target is &aYedelos.\n\n&f(${mouseX}, ${mouseY})`, mouseX, mouseY, true);
  // moveHuntingText.drawString(`(${mouseX}, ${mouseY})`, mouseXTicks, mouseYTicks + 15, white) 
  Renderer.drawString('&c&lBounty &f&lHunting\n&aCurrent position\n&aCurrent position\n&cYour next target is here.', values.bhDisplayX, values.bhDisplayY, true);
})

moveHuntingText.registerClicked((mouseX, mouseY) => {
  let stop = false
  buttons.forEach(button => { // Don't do anything if hovering over a button
    if (button[isMouseOver]()) stop = true
  })
  if (stop) return
  target.setRenderLoc(mouseX, mouseY)
  values.bhDisplayX = mouseX
  values.bhDisplayY = mouseY
  values.save()
})

moveHuntingText.registerActionPerformed(id => {
  if (id == -1) { // Reset
    target.setRenderLoc(5, 5)
    values.bhDisplayX = 5
    values.bhDisplayY = 5
    values.save() 
  }
  else if (id == -2) { // Close
    mc[displayGuiScreen](null)
  }
  else if (id == -3) { // Center vertically
    centerY = (Renderer.screen.getHeight() / 2) - 19.4
    target.setRenderY(centerY)
    values.bhDisplayY = centerY
    values.save() 
  }
})

moveHuntingText.registerKeyTyped(key => {
  const key = ChatLib.removeFormatting(key)
  if (key == 'r') {
    target.setRenderLoc(5, 5)
    values.bhDisplayX = 5
    values.bhDisplayY = 5
    values.save() 
  }
  else if (key == 'v') {
    centerY = (Renderer.screen.getHeight() / 2) - 19.4
    target.setRenderY(centerY)
    values.bhDisplayY = centerY
    values.save() 
  }
})

moveHuntingText.registerClosed(() => {
  if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') target.show()
})