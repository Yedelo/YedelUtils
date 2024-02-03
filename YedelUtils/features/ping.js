import {color} from '../longstuff.txt'
import Yettings from '../yettings'

const uuid = Java.type('java.util.UUID')

const tabPacket = net.minecraft.network.play.client.C14PacketTabComplete
const statusPacket = net.minecraft.network.play.client.C16PacketClientStatus
const request = net.minecraft.network.play.client.C16PacketClientStatus$EnumState.REQUEST_STATS
let time

register('command', type => {
  switch (type) {
    case 'ping':
    case 'p':
      ChatLib.command('ping')
      break
    case 'command':
    case 'c': // Send random command
      commandCheck.register()
      commandCheckSpectator.register()
      ChatLib.command(uuid.randomUUID().toString().substring(0, 8)) 
      time = Date.now()
      break
    case 'tab':
    case 't': // Send tab completion packet
      tabCheck.register()
      Client.sendPacket(new tabPacket('Ping!'))
      time = Date.now()
      break
    case 'stats':
    case 's': // Send stats packet
      statCheck.register()
      Client.sendPacket(new statusPacket(request))
      time = Date.now()
      break
    default: 
      switch (Yettings.pingMethod) {
        case 0:
          ChatLib.command('ping')
          break
        case 1:
          commandCheck.register()
          commandCheckSpectator.register()
          ChatLib.command(uuid.randomUUID().toString().substring(0, 8)) 
          time = Date.now()
          break
        case 2:
          tabCheck.register()
          Client.sendPacket(new tabPacket('ping'))
          time = Date.now()
          break
	case 3:
          statCheck.register()
          Client.sendPacket(new statusPacket(request))
          time = Date.now()
          break
      }
  }
}).setName('yping').setAliases('yp')

commandCheck = register('chat', event => { // Command detector
  cancel(event)
  showtime = Date.now() - time
  commandCheck.unregister()
  commandCheckSpectator.unregister()
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
}).setCriteria('Unknown command').setContains().unregister()

commandCheckSpectator = register('chat', event => { // Command detector in spectator
  cancel(event)
  showtime = Date.now() - time
  commandCheck.unregister()
  commandCheckSpectator.unregister()
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
}).setCriteria('You are not allowed to use commands as a spectator!').setContains().unregister()

tabCheck = register('packetReceived', packet => { // Waits for tab completion info
  showtime = Date.now() - time
  tabCheck.unregister()
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(tab)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
}).setFilteredClass(net.minecraft.network.play.server.S3APacketTabComplete).unregister()

statCheck = register('packetReceived', packet => { // Waits for statistics
  showtime = Date.now() - time
  statCheck.unregister()
  ChatLib.chat(`&9&l< Yedel > &ePing: ${color(showtime)}${showtime} ms &7(stats)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
}).setFilteredClass(net.minecraft.network.play.server.S37PacketStatistics).unregister()

