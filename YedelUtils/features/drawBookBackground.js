import {drawWorldBackground} from '../utils/mappings'

import Yettings from '../yettings'



const GuiScreenBook = net.minecraft.client.gui.GuiScreenBook

register(net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre, event => {
  const gui = event.gui
  if (gui instanceof GuiScreenBook && Yettings.drawBookBackground) {
    gui[drawWorldBackground](1)
  }
})