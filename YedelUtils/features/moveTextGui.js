import {displayGuiScreen, drawWorldBackground, isMouseOver} from '../utils/mappings'

import {mc} from '../utils/constants'

import vals from '../utils/vals'
import displayText from './displayText'



export default moveText = new Gui() // Display text GUI
moveText.addButton(-1, (Renderer.screen.getWidth() / 2) - 50, 40, 100, 20, 'Reset (R)')
moveText.addButton(-2, Renderer.screen.getWidth() - 30, 10, 20, 20, 'X')
moveText.addButton(-3, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 29, 131, 20, 'Center Horizontally (H)')
moveText.addButton(-4, Renderer.screen.getWidth() - 140, Renderer.screen.getHeight() - 53, 131, 20, 'Center Vertically (V)')
const buttons = [moveText.getButton(-1), moveText.getButton(-2), moveText.getButton(-3), moveText.getButton(-4)]



const white = Renderer.WHITE // To not access this property every frame
const yellow = Renderer.YELLOW

moveText.registerDraw((mouseX, mouseY, partialTicks) => {
  const text = vals.displayedText
  const screenWidth = Renderer.screen.getWidth()
  const screenHeight = Renderer.screen.getHeight()
  const textWidth = Renderer.getStringWidth(text)
  const mouseXTicks = mouseX + partialTicks
  const mouseYTicks = mouseY + partialTicks

  Renderer.translate(0, 0, -255)
  moveText[drawWorldBackground](1)
  Renderer.translate(0, 0, 0)
  moveText.drawString('Move your mouse to where you want to place the text, then click to set it.', screenWidth / 2 - 185.5, 25, white);
  moveText.drawString('Example text', mouseXTicks, mouseYTicks, yellow)
  moveText.drawString(`(${mouseX}, ${mouseY})`, mouseXTicks, mouseYTicks + 15, white)
  moveText.drawString(`Width of screen: ${screenWidth}`, 10, screenHeight - 32, white)
  moveText.drawString(`Height of screen: ${screenHeight}`, 10, screenHeight - 16, white)
  Renderer.drawString(text, vals.displayX, vals.displayY, true)
})

moveText.registerClicked((mouseX, mouseY) => {
  let stop = false
  buttons.forEach(button => {
    if (button[isMouseOver]()) stop = true
  })
  if (stop) return
  displayText.setRenderLoc(mouseX, mouseY)
  vals.displayX = mouseX
  vals.displayY = mouseY
  vals.save()
})

moveText.registerActionPerformed(id => {
  if (id == -1) { // Reset
    displayText.setRenderLoc(5, 5)
    vals.displayX = 5
    vals.displayY = 5
    vals.save() 
  }
  else if (id == -2) { // Close
    mc[displayGuiScreen](null)
    vals.save() 
  }
  else if (id == -3) { // Center horizontally
    let text = vals.displayedText 
    if (text.includes('\n')) text = text.substring(0, text.indexOf('\n'))
    const centerX = (Renderer.screen.getWidth() - Renderer.getStringWidth(text)) / 2
    displayText.setRenderX(centerX)
    vals.displayX = centerX
    vals.save()
  }
  else if (id == -4) { // Center vertically
    let text = vals.displayedText
    let lines
    if (text.includes('\n')) lines = text.match(/\n/g)?.length + 1
    else lines = 1
    const totalLineHeight = lines * 4.85
    const centerY = (Renderer.screen.getHeight() / 2) - totalLineHeight
    displayText.setRenderY(centerY)
    vals.displayY = centerY
    vals.save()
  }
})

moveText.registerKeyTyped(key => {
  const key = ChatLib.removeFormatting(key)
  if (key == 'r') {
    displayText.setRenderLoc(5, 5)
    vals.displayX = 5
    vals.displayY = 5
    vals.save() 
  }
  else if (key == 'v') {
    let text = vals.displayedText
    let lines
    if (text.includes('\n')) lines = text.match(/\n/g)?.length + 1
    else lines = 1
    const totalLineHeight = lines * 4.85
    const centerY = (Renderer.screen.getHeight() / 2) - totalLineHeight
    displayText.setRenderY(centerY)
    vals.displayY = centerY
    vals.save() 
  }
  else if (key == 'h') {
    let text = vals.displayedText 
    if (text.includes('\n')) text = text.substring(0, text.indexOf('\n'))
    const centerX = (Renderer.screen.getWidth() - Renderer.getStringWidth(text)) / 2
    displayText.setRenderX(centerX)
    vals.displayX = centerX
    vals.save() 
  }
})