import PogObject from 'PogData'

import {version} from './constants'



export default vals = new PogObject('YedelUtils', {
  displayedText: 'Display text&e&n&l&r', // If anyone actually wants to use 'Display text' as their display text
  displayX: 5,
  displayY: 5,
  ptminutes: 0,
  [version]: true // changes every update, showing the welcome/changelog message 
})