import Yettings from '../yettings'

import {logo} from '../utils/constants'



const CREATIVE = net.minecraft.world.WorldSettings$GameType.CREATIVE

export default function checkLimboCreative(fromChat) {
  if (fromChat && !Yettings.limboCreative) return
  const playerController = Client.getMinecraft().field_71442_b
  if ( /* limbo checks */
    !Scoreboard.getTitle() 
    && World.getAllEntities().length == 2 
    && World.getBlockAt(-26, 36, 28).toString() == 'Block{type=minecraft:brown_mushroom_block, x=-26, y=36, z=28}'  
  ) {
    playerController.func_78746_a /* setGameType */(CREATIVE) 
    setTimeout(() => {ChatLib.chat(`${logo} &eSet gamemode to creative!`)}, 100)
  } 
  else if (playerController.func_78758_h() /* isInCreativeMode */) ChatLib.chat(`${logo} &cYou are already in creative mode!`)
  else ChatLib.chat(`${logo} &cLimbo check failed, try again in a bit!`)
}