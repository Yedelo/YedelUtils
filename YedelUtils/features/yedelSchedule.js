import {yedel} from '../utils/functions'



register('step', () => { // yedel
  if (!Server.getIP()) return
  const m = Math.floor(Math.random() * 120)
  if (m == 50) yedel()
}).setDelay(30)