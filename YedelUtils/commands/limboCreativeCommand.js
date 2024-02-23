import {logo} from '../stuff/constants'



const CREATIVE = net.minecraft.world.WorldSettings$GameType.CREATIVE

register('command', () => {
  playerController = Client.getMinecraft().field_71442_b
  if (!Scoreboard.getTitle() && World.getAllEntities().length == 2 && World.getBlockAt(-26, 36, 28).toString() == 'Block{type=minecraft:brown_mushroom_block, x=-26, y=36, z=28}'  /* limbo checks */) {
    playerController.func_78746_a(CREATIVE) 
    setTimeout(() => {ChatLib.chat(`${logo} &eSet gamemode to creative!`)}, 100)
  } 
  else if (playerController.func_78758_h()) ChatLib.chat(`${logo} &cYou are already in creative mode!`)
  else ChatLib.chat(`${logo} &cLimbo check failed, try again in a bit!`)
}).setName('yedellimbocreative').setAliases('limbogmc', 'lgmc')