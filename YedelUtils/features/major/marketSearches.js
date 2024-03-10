import {logo} from '../../utils/constants'



const ahSearch = new KeyBind('AH search your held item', 37, 'YedelUtils')
const bzSearch = new KeyBind('BZ search your held item', 38, 'YedelUtils')

let inSkyblock
let ahSearching
let bzSearching
let bazaarValidCheck

register('worldLoad', () => {
  setTimeout(() => {
    const title = Scoreboard.getTitle()
    if (title.includes('SKYBLOCK') || title.includes('SKIBLOCK')) {
      return inSkyblock = true 
    }
    inSkyblock = false
  }, 300)
})

ahSearch.registerKeyPress(() => {
  ahSearching = true
  if (inSkyblock) {
    const heldItem = Player.getHeldItem()
    if (heldItem) {
      const itemName = heldItem.getName()
      if (itemName == '§aSkyBlock Menu §7(Click)') return 
      ChatLib.chat(`${logo} &eSearching the auction house for ${itemName}&e...`)
      ChatLib.command(`ahs ${itemName.removeFormatting()}`)
    }
  }
})

bzSearch.registerKeyPress(() => {
  bzSearching = true
  if (inSkyblock) {
    const heldItem = Player.getHeldItem()
    if (heldItem) {
      const itemName = heldItem.getName()
      if (itemName == '§aSkyBlock Menu §7(Click)') return
      ChatLib.chat(`${logo} &eSearching the bazaar for ${itemName}&e...`)
      ChatLib.command(`bz ${itemName.removeFormatting()}`)
    }
  }
  bazaarValidCheck = true
})

register('chat', event => { // Change message
  if (ahSearching || bzSearching) {
    cancel(event)
    ChatLib.chat(`${logo} &r&cYou don't have the Cookie Buff!`)
  }
}).setCriteria('You need the Cookie Buff to use this ${}!')

register('chat', event => { // Cancel search
  if (ahSearching || bzSearching) {
    cancel(event)
    ahSearching = false
    bzSearching = false
    bazaarValidCheck = false
  }
}).setCriteria('Obtain a Booster Cookie from the community shop in the hub!')

register('renderItemIntoGui', item => { // Closes bazaar menu if there aren't any items
  if (!bazaarValidCheck) return
  if (item.getName().removeFormatting() == 'No Product Found') {
    bazaarValidCheck = false
    Client.currentGui.close()
    ChatLib.chat(`${logo} &r&cNo item in bazaar with this name!`)
  }
})