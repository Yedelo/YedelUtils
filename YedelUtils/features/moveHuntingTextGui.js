import {mc} from '../stuff/constants'

import {values, target} from './major/tntTag'



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
  Renderer.drawString('&c&lBounty &f&lHunting\n&aCurrent position\n&aCurrent position\n&cYour next target is here.', values.bhDisplayX, values.bhDisplayY, true);
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
    mc.func_147108_a(null)
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
      centerY = (Renderer.screen.getHeight() / 2) - 35
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
    centerY = (Renderer.screen.getHeight() / 2) - 35
    target.setRenderLoc(values.bhDisplayX, centerY)
    values.bhDisplayY = centerY
    values.save() 
  }
})

moveHuntingText.registerClosed(() => {
  if (Scoreboard.getTitle().removeFormatting() == 'TNT TAG') target.show()
})