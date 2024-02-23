import vals from '../stuff/vals'



register('step', () => { // Playtime
  if (!Server.getIP()) return // Check if you're online
  vals.ptminutes ++
  vals.save()
}).setDelay(60)