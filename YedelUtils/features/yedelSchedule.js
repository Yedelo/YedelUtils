import {yedel} from '../stuff/functions'



register('step', () => { // yedel
  if (!Server.getIP()) return
  m = Math.floor(Math.random() * 120)
  if (m == 42) yedel()
}).setDelay(30)