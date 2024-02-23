import Yettings from '../../yettings'

import {commafy} from '../../stuff/functions'



const Calendar = java.util.Calendar

let coins

register('worldLoad', () => {
  day = Calendar.getInstance().get(Calendar.DAY_OF_YEAR)
  daysquared = day ** 2
  coinOutput = 13331996 + 2 * daysquared - 58 * Player.getName().length
  coins = `&fSacrifice coins: &6${commafy(coinOutput)}` 
})

register('guiRender', () => {
  if (!Yettings.sacrificeDisplay) return
  if (Client.currentGui.getClassName() == 'GuiEditSign' && Scoreboard.getLineByIndex(8).toString() == ' §7⏣ §cPlhlegbla👾§cst Pool') { // 👾
    Renderer.drawString(coins, (Renderer.screen.getWidth() - Renderer.getStringWidth(coins)) / 2, 30, true)
  }
})