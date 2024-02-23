import vals from '../stuff/vals'
import {displayText} from './displayText'



export const moveText = new Gui() // Display text GUI
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