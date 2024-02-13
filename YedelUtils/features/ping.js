import {color, uuid} from '../stuff.txt'
import Yettings from '../yettings'

const tabPacket = net.minecraft.network.play.client.C14PacketTabComplete
const statusPacket = net.minecraft.network.play.client.C16PacketClientStatus
const request = net.minecraft.network.play.client.C16PacketClientStatus$EnumState.REQUEST_STATS
let time

let commandCheck
let tabCheck
let statsCheck

register('command', type => {
  switch (type) {
    case 'ping':
    case 'p':
      ChatLib.command('ping')
      break
    case 'command':
    case 'c': // Send random command
      commandCheck = true
      ChatLib.command(uuid()) 
      time = Date.now()
      break
    case 'tab':
    case 't': // Send tab completion packet
      tabCheck = true
      Client.sendPacket(new tabPacket('y'))
      time = Date.now()
      break
    case 'stats':
    case 's': // Send stats packet
      statsCheck = true
      Client.sendPacket(new statusPacket(request))
      time = Date.now()
      break
    case 'l': // Server list ping
      ping = Client.getMinecraft().func_147104_D()?.field_78844_e
      if (ping == 0) return ChatLib.chat('&9&l< Yedel > &cPing is 0! This might have occured if you used Direct Connect.');
      if (!ping) return ChatLib.chat('&9&l< Yedel > &cServer data not found! This might have occured if you are in singleplayer.');
      ChatLib.chat(`&9&l< Yedel > &ePing: ${color(ping)}${ping} ms &7(server list)`);
      World.playSound('random.successful_hit', 10, ping * -0.006 + 2)
      break
    default: 
      switch (Yettings.pingMethod) {
        case 0:
          ChatLib.command('ping')
          break
        case 1:
          commandCheck = true
          ChatLib.command(uuid()) 
          time = Date.now()
          break
        case 2:
          tabCheck = true
          Client.sendPacket(new tabPacket('y'))
          time = Date.now()
          break
	case 3:
          statsCheck = true
          Client.sendPacket(new statusPacket(request))
          time = Date.now()
          break
        case 4:
        default:
          ping = Client.getMinecraft().func_147104_D()?.field_78844_e
          if (ping == 0) return ChatLib.chat('&9&l< Yedel > &cPing is 0! This might have occured if you used Direct Connect.');
          if (!ping) return ChatLib.chat('&9&l< Yedel > &cServer data not found! This might have occured if you are in singleplayer.');
          ChatLib.chat(`&9&l< Yedel > &ePing: ${color(ping)}${ping} ms &7(server list)`)
          World.playSound('random.successful_hit', 10, ping * -0.006 + 2)
          break
      }
  }
}).setName('yping').setAliases('yp')

register('chat', event => { // Command detector
  if (!commandCheck) return
  cancel(event)
  showtime = Date.now() - time
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  commandCheck = false
}).setCriteria('Unknown command').setContains()

register('chat', event => { // Command detector in spectator
  if (!commandCheck) return
  cancel(event)
  showtime = Date.now() - time
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  commandCheck = false
}).setCriteria('You are not allowed to use commands as a spectator!').setContains()

register('packetReceived', packet => { // Waits for tab completion info
  if (!tabCheck) return
  showtime = Date.now() - time
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(tab)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  tabCheck = false
}).setFilteredClass(net.minecraft.network.play.server.S3APacketTabComplete)

register('packetReceived', packet => { // Waits for statistics
  if (!statsCheck) return
  showtime = Date.now() - time
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(stats)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  statsCheck = false
}).setFilteredClass(net.minecraft.network.play.server.S37PacketStatistics)

