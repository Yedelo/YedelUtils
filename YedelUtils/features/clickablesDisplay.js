import Yettings from '../yettings'

register('guiRender', () => {
  if (Player.getContainer()?.name == 'Layout Editor - TNT Tag' && Yettings.clickables) {
  	const width = Renderer.screen.getWidth()
		const playAgainItem = Yettings.playAgainItem
		const returnToLobbyItem = Yettings.returnToLobbyItem
  	Renderer.drawString(`&r&b&lPlay Again §r§7(Right Click) &r| Slot ${playAgainItem}`, (width - 165) / 2, 30, true)
  	Renderer.drawString(`&r&c&lReturn To Lobby §r§7(Right Click) &r| Slot ${returnToLobbyItem}`, (width - 203) / 2, 40, true)
		if (playAgainItem == returnToLobbyItem) {
			Renderer.drawString(`&c&lYour clickables are conflicting! Change them in the config.`, (width - 351) / 2, 50, true)
    }
	}
})