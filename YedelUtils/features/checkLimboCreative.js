import {isInCreativeMode, playerController, setGameType} from '../utils/mappings'

import Yettings from '../yettings'

import {logo} from '../utils/constants'



const CREATIVE = net.minecraft.world.WorldSettings$GameType.CREATIVE

export default function checkLimboCreative(fromChat) {
  if (fromChat && !Yettings.limboCreative) return // This variable exists (true) if it is from chat (automatic, trigger is not cancelled), so it checks the setting
  const controller = Client.getMinecraft()[playerController]
  if ( /* limbo checks */
    !Scoreboard.getTitle() 
    && World.getAllEntities().length == 2 
    && World.getBlockAt(-26, 36, 28).toString() == 'Block{type=minecraft:brown_mushroom_block, x=-26, y=36, z=28}'  
  ) {
    controller[setGameType](CREATIVE) 
    setTimeout(() => {ChatLib.chat(`${logo} &eSet gamemode to creative!`)}, 100)
  } 
  else if (controller[isInCreativeMode]()) ChatLib.chat(`${logo} &cYou are already in creative mode!`)
  else ChatLib.chat(`${logo} &cLimbo check failed, try again in a bit!`)
}