import Yettings from '../../yettings'

import {logo, mc} from '../../stuff/constants'
import {randomUuid, color} from '../../stuff/functions'



const C14PacketTabComplete = net.minecraft.network.play.client.C14PacketTabComplete
const C16PacketClientStatus = net.minecraft.network.play.client.C16PacketClientStatus
const REQUEST_STATS = net.minecraft.network.play.client.C16PacketClientStatus$EnumState.REQUEST_STATS

let time

export let serverListPing = mc.func_147104_D()?.field_78844_e || -1

let commandCheck
let tabCheck
let statsCheck

register('serverConnect', () => {
  serverListPing = mc.func_147104_D()?.field_78844_e || -1
})

export function pingPing () {
  ChatLib.command('ping')
}

export function commandPing() {
  commandCheck = true
  ChatLib.command(randomUuid())
  time = Date.now()
}

export function tabPing() {
  tabCheck = true
  Client.sendPacket(new C14PacketTabComplete('y'))
  time = Date.now()
}

export function statsPing() {
  statsCheck = true
  Client.sendPacket(new C16PacketClientStatus(REQUEST_STATS))
  time = Date.now()
}

export function listPing() {
  ping = serverListPing
  if (mc.func_71356_B()) return ChatLib.chat(`${logo} &cThis method doesn't work in singleplayer!`);
  if (ping == -1) return ChatLib.chat(`${logo} &cPing is 0! This might have occured if you used Direct Connect.`);
  ChatLib.chat(`${logo} &ePing: ${color(ping)}${ping} ms &7(server list)`);
  World.playSound('random.successful_hit', 10, ping * -0.006 + 2)
}

register('chat', event => { // Command detector
  if (!commandCheck) return
  cancel(event)
  showtime = Date.now() - time
  ChatLib.chat(`${logo} &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  commandCheck = false
}).setCriteria('Unknown command').setContains()

register('chat', event => { // Command detector in spectator
  if (!commandCheck) return
  cancel(event)
  showtime = Date.now() - time
  ChatLib.chat(`${logo} &ePing: ${color(showtime)}${showtime} ms &7(command)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  commandCheck = false
}).setCriteria('You are not allowed to use commands as a spectator!').setContains()

register('packetReceived', packet => { // Waits for tab completion info
  if (!tabCheck) return
  showtime = Date.now() - time
  ChatLib.chat(`${logo} &ePing: ${color(showtime)}${showtime} ms &7(tab)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  tabCheck = false
}).setFilteredClass(net.minecraft.network.play.server.S3APacketTabComplete)

register('packetReceived', packet => { // Waits for statistics
  if (!statsCheck) return
  showtime = Date.now() - time
  ChatLib.chat(`${logo} &ePing: ${color(showtime)}${showtime} ms &7(stats)`)
  World.playSound('random.successful_hit', 10, showtime * -0.006 + 2)
  statsCheck = false
}).setFilteredClass(net.minecraft.network.play.server.S37PacketStatistics)
