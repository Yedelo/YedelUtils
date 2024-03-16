import vals from '../utils/vals'



register('step', () => {
  if (!Server.getIP()) return // Check if you're online
  vals.ptminutes ++
  vals.save()
}).setDelay(60)