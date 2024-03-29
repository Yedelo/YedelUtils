import {getSheared} from '../../utils/mappings'

import Yettings from '../../yettings'

import {items} from '../../utils/constants'



const targetItems = []
let highlightColor
let buttonMaterial
let armorMaterial
let specificBlock
let specificLore
let playing

let buttonCheck
let shearHighlight 
let armorCheck
let breakBlockCheck
let jukeboxCheck

export const restart = () => { 
  targetItems.length = 0 // Empty highlight items, per task
  buttonCheck = false
  shearHighlight = false
  armorCheck = false
  breakBlockCheck = false
  jukeboxCheck = false
}

const highlightItem = (x, y) => {
  Renderer.translate(0, 0, 0)
  Renderer.drawRect(highlightColor, x, y, 16, 16)
}

register('worldLoad', () => {
  if (!Yettings.hypixelSaysHelper) return
  restart()
  setTimeout(() => {
    const title = Scoreboard.getTitle().removeFormatting()
    if (title == 'HYPIXEL SAYS' || title == 'SANTA SAYS') {
      playing = true
      return
    }
  }, 500)
  playing = false
})

register('chat', restart).setCriteria('Game ended! Next game is starting in 3 seconds.')

register('renderItemIntoGui', (item, x, y) => {
  if (!playing) return
  const itemName = item?.getName()
  if (targetItems[1] == 'Enchanted Book') { // For add enchant task
    if (item.getLore()[1].includes(specificLore)) highlightItem(x,y)
  }
  if (targetItems.includes(itemName) && itemName != 'Enchanted Book') highlightItem(x,y)
})

register('playerInteract', (action, position, event) => {
  if (!buttonCheck) return
  if (Player.lookingAt()?.type == 'BlockType{name=minecraft:stone_button}' && buttonMaterial == 'Wood') cancel(event);
  if (Player.lookingAt()?.type == 'BlockType{name=minecraft:wooden_button}' && buttonMaterial == 'Stone') cancel(event);
})



const red = Renderer.RED
const black = Renderer.BLACK

register('renderEntity', (sheep) => {
  if (!shearHighlight) return
  if (!sheep.getEntity()[getSheared]()) {
    const partialTicks = Tessellator.getPartialTicks()
    const lastX = sheep.getLastX()
    const lastY = sheep.getLastY()
    const lastZ = sheep.getLastZ()
    const currentX = sheep.getX()
    const currentY = sheep.getY() 
    const currentZ = sheep.getZ()
    Tessellator.drawString('Not sheared', lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + 2.25, lastZ + (currentZ - lastZ) * partialTicks, black, true, 0.05, false); // Shadow
    Tessellator.drawString('Not sheared', lastX + (currentX - lastX) * partialTicks, lastY + (currentY - lastY) * partialTicks + 2.3, lastZ + (currentZ - lastZ) * partialTicks, red, true, 0.05, false);
  }
}).setFilteredClass(net.minecraft.entity.passive.EntitySheep)

register('playerInteract', (action, position, event) => {
  if (!armorCheck) return
  if (!Player.getHeldItem()?.getName()?.toUpperCase()?.startsWith(armorMaterial)) cancel(event)
})

register('hitBlock', (block, event) => {
  if (!breakBlockCheck) return
  if (block.type.getName() != specificBlock) cancel(event)
})

register('playerInteract', (action, pos, event) => {
  if (!jukeboxCheck) return
  if (Player.getHeldItem() != '1xitem.record@0' && Player.lookingAt()?.type == 'BlockType{name=minecraft:jukebox}') cancel(event);
})

// Triggers for all tasks. This couldn't be made with one pattern since some of them (such as repairing items) highlighted more than one item. 

// Tasks that have no varying elements:

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eTame the Horse by feeding it &7&l(Participation)')
  }
  targetItems.push(items.hayBale) // items object is for registry names, for different resource packs and languages (?)
  highlightColor = Renderer.color(185, 170, 24) // Sets the color of the highlight
}).setCriteria('NEXT TASK: Tame the Horse by feeding it')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eExtinguish yourself &7&l(Participation)')
  }
  targetItems.push(items.waterBucket)
  highlightColor = Renderer.color(32, 148, 201)
}).setCriteria('NEXT TASK: Extinguish yourself')

register('chat', event => { 
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eRemove the Poison effect &7&l(Participation)')
  }
  targetItems.push(items.milkBucket)  
  highlightColor = Renderer.WHITE
}).setCriteria('NEXT TASK: Remove the Poison effect')

register('chat', event => { 
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat("&6&lNEXT TASK: &eEat until you're full &6&l(Ranked)")
  }
  targetItems.push(items.steak, items.cookedPorkchop, items.bakedPotato)
  highlightColor = Renderer.color(201, 137, 32)
}).setCriteria("NEXT TASK: Eat until you're full")

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eFeed both sheep &6&l(Ranked)')
  }
  targetItems.push(items.wheat)
  highlightColor = Renderer.color(185, 170, 24)
}).setCriteria('NEXT TASK: Feed both sheep')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eInsert a music disc into the jukebox &6&l(Ranked)')
  }
  targetItems.push(items.musicDisc)
  highlightColor = Renderer.color(132, 22, 168)
}).setCriteria('NEXT TASK: Insert a music disc into the jukebox')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eJump up to the floating platform using a Potion of Leaping &6&l(Ranked)')
  }
  targetItems.push('Potion of Leaping')
  highlightColor = Renderer.color(24, 199, 117)
}).setCriteria('NEXT TASK: Jump up to the floating platform using a Potion of Leaping')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eShear the sheep &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Shear the sheep')

// Tasks that have varying elements

register('chat', (slapItem, event) => { // Doesn't work currently because messages are structured differently
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eSlap a player with ${slapItem} &7&l(Participation)`)
  }
  targetItems.push(slapItem)
  highlightColor = Renderer.color(212, 38, 70)
}).setCriteria('NEXT TASK: Slap a player with ${slapItem}')

register('chat', (something, brewItem, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eBrew a Potion of ${something} using ${brewItem} &6&l(Ranked)`)
  }
  switch (brewItem) {
    case 'Spider Eye':
      highlightColor = Renderer.color(149, 82, 171)
      brewItem = items.spiderEye
      break
    case 'Glistening Melon':
      highlightColor = Renderer.color(214, 79, 93)
      brewItem = items.glisteningMelon
      break
    case 'Magma Cream':
      highlightColor = Renderer.color(79, 214, 178)
      brewItem = items.magmaCream
      break
    case 'Golden Carrot':
      highlightColor = Renderer.color(214, 187, 79)
      brewItem = items.goldenCarrot
      break
    case 'Sugar':
      highlightColor = Renderer.color(176, 217, 213)
      brewItem = items.sugar
      break
    case 'Ghast Tear':
      highlightColor = Renderer.color(232, 202, 221)
      brewItem = items.ghastTear
      break
    case 'Blaze Powder':
      highlightColor = Renderer.color(212, 138, 95)
      brewItem = items.blazePowder
      break
    default:
      highlightColor = Renderer.WHITE
  }
  targetItems.push(brewItem)
}).setCriteria('NEXT TASK: Brew a Potion of ${something} using ${brewItem}')

register('chat', (potion, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eDrink a ${potion} &6&l(Ranked)`)  
  }
  targetItems.push(potion)
  switch (potion) {
    case 'Healing':
      highlightColor = Renderer.color(252, 81, 87)
      break
    case 'Swiftness':
      highlightColor = Renderer.color(116, 210, 227)
      break
    case 'Invisibility':
      highlightColor = Renderer.color(118, 93, 143)
      break
    case 'Harming':
      highlightColor = Renderer.color(120, 8, 25)
      break
    case 'Regeneration':
      highlightColor = Renderer.color(214, 51, 174)
      break
    case 'Poison':
      highlightColor = Renderer.color(69, 115, 79)
      break
    case 'Strength':
      highlightColor = Renderer.color(107, 14, 56)
      break
    case 'Slowness':
      highlightColor = Renderer.color(76, 49, 133)
      break
    case 'Fire Resistance':
      highlightColor = Renderer.GOLD
      break
    default:
      highlightColor = Renderer.WHITE
  }
  highlightColor = Renderer.color(182, 154, 252)
}).setCriteria('NEXT TASK: Drink a ${potion}')

register('chat', (enchantItem, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eEnchant a ${enchantItem} &6&l(Ranked)`)
  }
  enchantItem = enchantItem.replace('Gold', 'Golden')
  enchantItem = enchantItem.replace('Spade', 'Shovel')
  targetItems.push(enchantItem)
  const material = enchantItem.split(' ')[0]
  switch (material) {
    case 'Wooden':
      highlightColor = Renderer.color(100, 116, 143)
      break
    case 'Stone':
      highlightColor = Renderer.color(161, 170, 162)
      break
    case 'Golden':
      highlightColor = Renderer.color(235, 222, 89)
      break
    case 'Iron':
      highlightColor = Renderer.color(186, 218, 227)
      break
    case 'Diamond':
      highlightColor = Renderer.color(109, 213, 242)
      break      
    default:
      highlightColor = Renderer.WHITE
  }
}).setCriteria('NEXT TASK: Enchant a ${enchantItem}')

register('chat', (material, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eFully equip ${material} Armor &6&l(Ranked)`)
  }
  armorMaterial = material
  const material = material.replace('GOLD', 'GOLDEN')
  setTimeout(() => {
    Player.getContainer().getItems().forEach(item => {
      const itemName = item?.getName()
      const itemRegistry = item?.getRegistryName()
      if (itemRegistry.toUpperCase()?.includes(material)) {
        targetItems.push(itemName)
        highlightColor = Renderer.color(150, 146, 178)
      }
    })
  }, 200)
  switch (material) {
    case 'LEATHER':
      highlightColor = Renderer.color(210, 105, 30)
      break
    case 'GOLDEN':
      highlightColor = Renderer.color(235, 222, 89)
      break
    case 'IRON':
      highlightColor = Renderer.color(186, 218, 227)
      break
    case 'DIAMOND':
      highlightColor = Renderer.color(109, 213, 242)
      break
    default:
      highlightColor = Renderer.WHITE
  }
}).setCriteria('NEXT TASK: Fully equip ${material} Armor')

register('chat', (standItem, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &ePut ${standItem} on the armor stand &6&l(Ranked)`)
  }
  standItem.replace('Gold', 'Golden')
  if (standItem.startsWith('Leather')) {
    standItem.replace('Leggings', 'Pants')
    standItem.replace('Chestplate', 'Tunic')
    standItem.replace('Helmet', 'Cap')
  }
  targetItems.push(standItem)
  highlightColor = Renderer.color(204, 201, 126)
}).setCriteria('NEXT TASK: Put ${standItem} on the armor stand')

register('chat', (smeltItem, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eSmelt ${smeltItem} Ore &6&l(Ranked)`)
  }
  switch (smeltItem) {
    case 'Gold':
      highlightColor = Renderer.color(235, 222, 89)
      smeltItem = items.goldOre
      break
    case 'Redstone':
      highlightColor = Renderer.color(235, 77, 88)
      smeltItem = items.redstoneOre
      break
    case 'Iron':
      highlightColor = Renderer.color(186, 218, 227)	
      smeltItem = items.ironOre
      break
    case 'Lapis':
      highlightColor = Renderer.color(91, 112, 207)
      smeltItem = items.lapisOre
      break
    case 'Diamond':
      highlightColor = Renderer.color(109, 213, 242)
      smeltItem = items.diamondOre
      break
    case 'Emerald':
      highlightColor = Renderer.color(91, 207, 103)
      smeltItem = items.emeraldOre
      break
    default:
      highlightColor = Renderer.WHITE
    }
    targetItems.push(smeltItem)
}).setCriteria('NEXT TASK: Smelt ${smeltItem} Ore')

register('chat', (repairItem, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eRepair a ${repairItem} to full durability &6&l(Ranked)`)
  }
  targetItems.push(repairItem.replace('Gold', 'Golden'))
  const material = repairItem.split(' ')[0]
  switch (material) {
    case 'Golden':
      highlightColor = Renderer.color(235, 222, 89)
      targetItems.push(items.goldIngot)
      break
    case 'Iron':
      highlightColor = Renderer.color(186, 218, 227)
      targetItems.push(items.ironIngot)	
      break
    case 'Diamond':
      highlightColor = Renderer.color(109, 213, 242)
      targetItems.push(items.diamond)
      break
    default:
      highlightColor = Renderer.WHITE
  }
}).setCriteria('NEXT TASK: Repair a ${repairItem} to full durability')

register('chat', (material, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &ePress the ${material} Button &7&l(Participation)`)
  }
  buttonMaterial = material
}).setCriteria('NEXT TASK: Press the ${material} Button')

register('chat', (block, event) => {
  if (!playing) return
 if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eBreak a ${block} block &6&l(Ranked)`)
  }
  specificBlock = block
}).setCriteria('NEXT TASK: Break a ${block} block')

register('chat', (enchant, material, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eAdd ${enchant} to a ${material} sword &6&l(Ranked)`)
  }
  material = material.replace('Gold', 'Golden')
  material = material.replace('Wood', 'Wooden')
  specificLore = enchant
  switch (material) {
    case 'Wooden':
      highlightColor = Renderer.color(100, 116, 143)
      targetItems.push(items.woodenSword)
      break
    case 'Stone':
      highlightColor = Renderer.color(121, 130, 122)
      targetItems.push(items.stoneSword)   
      break
    case 'Golden':
      highlightColor = Renderer.color(235, 222, 89)
      targetItems.push(items.goldenSword)
      break
    case 'Iron':
      highlightColor = Renderer.color(186, 218, 227)
      targetItems.push(items.ironSword)
      break
    case 'Diamond':
      highlightColor = Renderer.color(109, 213, 242)
      targetItems.push(items.diamondSword)
      break      
    default:
      highlightColor = Renderer.WHITE
  }   
  targetItems.push(items.enchantedBook)
}).setCriteria('NEXT TASK: Add ${enchant} to a ${material} sword')

// Santa says tasks

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGive a player a wrapped present &c&l(Santa, ranked)')
  }
  targetItems.push('§aPresent §7(Right Click)')
  highlightColor = Renderer.color(235, 64, 52)
}).setCriteria('NEXT TASK: Give a player a wrapped present')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGive Rudolph his shiny red nose &c&l(Santa, ranked)')
  }
  targetItems.push('§aRed Nose §7(Right Click)')
  highlightColor = Renderer.color(235, 64, 52)
}).setCriteria('NEXT TASK: Give Rudolph his shiny red nose')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eDrink the eggnog &c&l(Santa, ranked)')
  }
  targetItems.push('§aEggnog §7(Right Click)')
  highlightColor = Renderer.color(204, 212, 123)
}).setCriteria('NEXT TASK: Drink the eggnog')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGive Santa milk and cookies &c&l(Santa, ranked)') 
  }
  targetItems.push(items.milkBucket, items.cookie)
  highlightColor = Renderer.color(172, 230, 133)
}).setCriteria('NEXT TASK: Give Santa milk and cookies')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eRemove the coal from your inventory &c&l(Santa, participation)')
  }
  targetItems.push(items.coal)
  highlightColor = Renderer.color(200, 200, 200)
}).setCriteria('NEXT TASK: Remove the coal from your inventory')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eOpen a present under the tree &c&l(Santa, participation)')
  }
}).setCriteria('NEXT TASK: Open a present under the tree')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eCollect as many ornaments as you can &c&l(Santa, ranked)')
  }
}).setCriteria('NEXT TASK: Collect as many ornaments as you can')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &ePlace the gold block on top of the tree &c&l(Santa, ranked)')
  }
}).setCriteria('NEXT TASK: Place the gold block on top of the tree')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat("&6&lNEXT TASK: &eWear Santa's hat &c&l(Santa, participation)")
  }
}).setCriteria("NEXT TASK: Wear Santa's hat")

// All other tasks (for later and for point message)

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eEnter the End Portal &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Enter the End Portal')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eEnter the Nether Portal &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Enter the Nether Portal')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGet in a bed &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Get in a bed')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGet into a minecart &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Get into a minecart')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGive Grandma a flower &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Give Grandma a flower')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eJump into the air on the spot &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Jump into the air on the spot')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eJump into the water safely without hitting solid blocks! &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Jump into the water safely without hitting solid blocks!')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat("&6&lNEXT TASK: &eLook at a player's head &7&l(Participation)")
  }
}).setCriteria("NEXT TASK: Look at a player's head")

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eLook at the sky &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Look at the sky')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eNod by looking up and down &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Nod by looking up and down')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &ePlay a song with the Noteblocks &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Play a song with the Noteblocks')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eSpin around in a full circle &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Spin around in a full circle')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eStand completely still &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Stand completely still')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
   ChatLib.chat('&6&lNEXT TASK: &eStand on the cobblestone &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Stand on the cobblestone')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eThrow a diamond at a player &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Throw a Diamond at a player')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eThrow eggs at other players &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Throw eggs at other players')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eThrow snowballs at other players &7&l(Participation)')
  }
}).setCriteria('NEXT TASK: Throw snowballs at other players')

register('chat', (block, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eLook at a ${block} block &7&l(Participation)`)
  }
}).setCriteria('NEXT TASK: Look at a ${block} block')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eBounce as high as you can (Hold Sneak) &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Bounce as high as you can (Hold Sneak)')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eBuild an Iron Golem &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Build an Iron Golem')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eClimb to the middle &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Climb to the middle')

register('chat', (item, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eCraft a ${item} &e&6&l(Ranked)`)
  }
}).setCriteria('NEXT TASK: Craft a ${item}')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eCure the Zombie Villager &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Cure the Zombie Villager')


register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat("&6&lNEXT TASK: &eDon't get killed by the TNT &6&l(Ranked)")
  }
}).setCriteria("NEXT TASK: Don't get killed by the TNT")

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat("&6&lNEXT TASK: &eDon't get killed by the zombies or the void &6&l(Ranked)")
  }
}).setCriteria("NEXT TASK: Don't get killed by the zombies or the void")

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eEat Mushroom Stew &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Eat Mushroom Stew')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGet yourself to full health &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Get yourself to full health')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eGrow a tree &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Grow a tree')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eJump off the platform &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Jump off the platform')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eKeep punching the Dragon Egg &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Keep punching the Dragon Egg')

register('chat', (animal, event) => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat(`&6&lNEXT TASK: &eKill a ${animal} &6&l(Ranked)`)
  }
}).setCriteria('NEXT TASK: Kill a ${animal}')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eMake your inventory completely full &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Make your inventory completely full')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &ePlace a beacon on top of the pyramid &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Place a beacon on top of the pyramid')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &ePunch the most tall grass &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Punch the most tall grass')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eRide a pig off the platform &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Ride a pig off the platform')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eShoot as many slimes as possible &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Shoot as many slimes as possible')

register('chat', event => {
  if (!playing) return
  if (Yettings.showType) {
    cancel(event)
    ChatLib.chat('&6&lNEXT TASK: &eShoot yourself with an arrow &6&l(Ranked)')
  }
}).setCriteria('NEXT TASK: Shoot yourself with an arrow')

// End of triggers