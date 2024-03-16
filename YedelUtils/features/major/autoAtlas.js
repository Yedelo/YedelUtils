import {rightClickMouse} from '../../utils/mappings'

import Yettings from '../../yettings'

import {logo, mc} from '../../utils/constants'
import {randomRange} from '../../utils/functions'

import {serverListPing} from './ping' // Server list ping, better than nothing



const insufficient = new KeyBind('Insufficient Evidence', 24, 'YedelUtils | Atlas')
const sufficient = new KeyBind('Evidence Without Doubt', 25, 'YedelUtils | Atlas')

const rightClick = mc.class.getDeclaredMethod(rightClickMouse)
rightClick.setAccessible(true)

let inAtlas

register('chat', () => { // Atlas check
  setTimeout(() => {
    const title = Scoreboard.getTitle().removeFormatting()
    if (title == 'ATLAS') {
      inAtlas = true
    }
  }, 300)
}).setCriteria('Teleporting you to suspect')

register('chat', () => {
  inAtlas = false
}).setCriteria('Atlas verdict submitted! Thank you :)')

// Random time is to make it seem less automatic

insufficient.registerKeyPress(() => {
  if (!inAtlas || !Yettings.autoAtlas) return
  ChatLib.chat(`${logo} &eSubmitting an Atlas verdict for "Insufficient Evidence"...`)
  Player.setHeldItemIndex(7) // Submit verdict item
  setTimeout(() => {
    rightClick.invoke(mc)
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
    rightClick.invoke(mc)
    setTimeout(() => {
      Player.getContainer().click(32)
    }, randomRange(500, 600) + serverListPing)
  }, randomRange(158, 301) + serverListPing)
})