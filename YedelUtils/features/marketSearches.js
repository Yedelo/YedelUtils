export const ahSearch = new KeyBind('AH search your held item', 37, 'YedelUtils')
export const bzSearch = new KeyBind('BZ search your held item', 38, 'YedelUtils')

let inSkyblock
let ahSearching
let bzSearching

register('worldLoad', () => { // Skyblock check
  setTimeout(() => {
    title = Scoreboard.getTitle()
    if (title.includes('SKYBLOCK') || title.includes('SKIBLOCK')) {
      return inSkyblock = true 
    }
    inSkyblock = false
  }, 300)
})

ahSearch.registerKeyPress(() => {
  ahSearching = true
  if (inSkyblock) {
    heldItem = Player.getHeldItem()
    if (heldItem) {
      itemName = heldItem.getName()
      if (itemName == '§aSkyBlock Menu §7(Click)') return 
      ChatLib.chat(`&9&l< Yedel > &eSearching the auction house for ${itemName}&e...`)
      ChatLib.command(`ahs ${itemName.removeFormatting()}`)
    }
  }
})

bzSearch.registerKeyPress(() => {
  bzSearching = true
  if (inSkyblock) {
    heldItem = Player.getHeldItem()
    if (heldItem) {
      itemName = heldItem.getName()
      if (itemName == '§aSkyBlock Menu §7(Click)') return
      ChatLib.chat(`&9&l< Yedel > &eSearching the bazaar for ${itemName}&e...`)
      ChatLib.command(`bz ${itemName.removeFormatting()}`)
    }
  }
  bazaarValidCheck.register()
})

register('chat', event => { // Different message for no cookie
  if (ahSearching == true || bzSearching == true) {
    cancel(event)
    ChatLib.chat("&9&l< Yedel > &r&cYou don't have the Cookie Buff!")
  }
}).setCriteria('You need the Cookie Buff to use this ${}!')

register('chat', event => {
  if (ahSearching == true || bzSearching == true) {
    cancel(event)
    ahSearching = false
    bzSearching = false
  }
}).setCriteria('Obtain a Booster Cookie from the community shop in the hub!')

bazaarValidCheck = register('renderItemIntoGui', item => { // Closes bazaar menu if there aren't any items
  if (item.getName().removeFormatting() == 'No Product Found') {
    bazaarValidCheck.unregister()
    Client.currentGui.close()
    ChatLib.chat('&9&l< Yedel > &r&cNo item in bazaar with this name!')
  }
}).unregister()


