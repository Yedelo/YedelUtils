let coins

const commafy = number => {
  return number.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getSacrificePrice = register('worldLoad', () => {
  now = new Date()
  start = new Date(now.getFullYear(), 0, 0)
  day = Math.floor(((now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)) / 86400000)
  daysquared = day ** 2
  output = 13331996 + 2 * daysquared - 58 * Player.getName().length
  coins = `&fSacrifice coins: &6${commafy(output)}`
})

export const renderPrice = register('guiRender', () => {
  if (Client.currentGui.getClassName() == 'GuiEditSign' && Scoreboard.getLineByIndex(8).toString() == ' §7⏣ §cPlhlegbla👾§cst Pool') { // 👾
   	Renderer.drawString(coins, (Renderer.screen.getWidth() - Renderer.getStringWidth(coins)) / 2, 30, true)
  }
})