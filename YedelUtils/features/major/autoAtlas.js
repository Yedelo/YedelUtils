import Yettings from '../../yettings'

import {logo, mc} from '../../stuff/constants'
import {randomRange} from '../../stuff/functions'

import {serverListPing} from './ping' // Server list ping, better than nothing



const insufficient = new KeyBind('Insufficient Evidence', 24, 'YedelUtils | Atlas')
const sufficient = new KeyBind('Evidence Without Doubt', 25, 'YedelUtils | Atlas')

const rightClickMouse = mc.class.getDeclaredMethod('func_147121_ag')
rightClickMouse.setAccessible(true)

let inAtlas

register('chat', () => { // Atlas check
  setTimeout(() => {
    title = Scoreboard.getTitle().removeFormatting()
    if (title == 'ATLAS') {
      inAtlas = true
    }
  }, 300)
}).setCriteria('Teleporting you to suspect')

register('chat', () => {
  inAtlas = false
}).setCriteria('Atlas verdict submitted! Thank you :)')

insufficient.registerKeyPress(() => {
  if (!inAtlas || !Yettings.autoAtlas) return
  ChatLib.chat(`${logo} &eSubmitting an Atlas verdict for "Insufficient Evidence"...`)
  Player.setHeldItemIndex(7)
  setTimeout(() => {
    rightClickMouse.invoke(mc)
    setTimeout(() => {
      Player.getContainer().click(30)
    }, randomRange(500, 600) + serverListPing)
  }, randomRange(158, 301) + serverListPing)
})

sufficient.registerKeyPress(() => {
  if (!inAtlas || !Yettings.autoAtlas) return
  ChatLib.chat(`${logo} &eSubmitting an Atlas verdict for "Evidence Without Doubt"...`)
  Player.setHeldItemIndex(7)
  setTimeout(() => {
    rightClickMouse.invoke(mc)
    setTimeout(() => {
      Player.getContainer().click(32)
    }, randomRange(500, 600) + serverListPing)
  }, randomRange(158, 301) + serverListPing)
})