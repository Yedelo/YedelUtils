
import { @Vigilant, @SwitchProperty,
           @TextProperty, @ButtonProperty,
              @SelectorProperty, @SliderProperty } from 'Vigilance'
         
const Desktop = java.awt.Desktop
const URI = java.net.URI
const video = new URI('https://www.youtube.com/watch?v=-z_AZR35ozI') // Bounty hunting video

const autoGGClass = Java.type('club.sk1er.mods.autogg.AutoGG')
let autoGGConfig
let autoGGOn = false

const getIsAutoGG = () => { // Detect if AutoGG is on (if it exists)
  autoGG = autoGGClass.INSTANCE
  if (!autoGG instanceof autoGGClass) return true
  
  autoGGConfig = autoGG.getAutoGGConfig()

  if (autoGGConfig.isModEnabled()) {
    autoGGOn = true
    return true
  }
  else return false
}

const getAutoGGDelay = () => {
  if (autoGGOn) {
    return autoGGConfig.getAutoGGDelay()
  }
  else return 1 
}

@Vigilant('YedelUtils', 'YedelUtils', {
  getCategoryComparator: () => (a, b) => {
    const categories = ['General', 'TNT Tag', 'Hypixel Says']
    return categories.indexOf(a.name) - categories.indexOf(b.name)
  },
  getSubcategoryComparator: () => (a, b) => {
    const subcategories = ['Features', 'Customization']
    return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory)
  },
  getPropertyComparator: () => (a, b) => {
    const properties = ['Reset stats', 'Customize display', 'Highlight target and show distance', 'Play sounds for target selections and kills', 'Target selection sound', 'Kill sound', 'Give items to play again and leave the game']
    return properties.indexOf(a.attributesExt.name) - properties.indexOf(b.attributesExt.name)
  }
})

class Yettings {

  @SwitchProperty({
    name: 'Show type of task in task message',
    description: 'All tasks are either participation tasks (do it to get the point) or ranked tasks (top 3 players only get points). Toggle this to show the type of task at the end of the message.',
    category: 'Hypixel Says',
    subcategory: 'Features'
  })
  showType = true



  @ButtonProperty({
    name: 'Customize display text',
    description: 'Customize the display text position, can also be done with /movetext.',
    category: 'General',
    subcategory: 'Customization',
    placeholder: 'Open GUI'
  })
  openGui = () => ChatLib.command('movetext', true)

  @ButtonProperty({
    name: 'Customize display',
    description: 'Customize the bounty hunting display, can also be done with /movehuntingtext.',
    category: 'TNT Tag',
    subcategory: 'Features',
    placeholder: 'Open GUI'
  })
  openHuntingGui = () => ChatLib.command('movehuntingtext', true)


  @SwitchProperty({
    name: 'Bounty Hunting',
    description: 'Enables bounty hunting', 
    category: 'TNT Tag'
  })
  bountyHunting = true

  @ButtonProperty({
    name: 'Video',
    description: 'This is a complicated feature, watch my video for help!',
    category: 'TNT Tag',
    placeholder: 'Open video'
  })
  watchVideo = () => {
    if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
      Desktop.getDesktop().browse(video)
    }
  }

  @SwitchProperty({
    name: 'Highlight target and show distance',
    description: 'Distance is displayed above their nametag, corresponding to their rank color.', 
    category: 'TNT Tag',
    subcategory: 'Features'
  })
  display = true

  @SwitchProperty({
    name: 'Play sounds for target selections and kills',
    description: 'Use the buttons below to test these sounds.',
    category: 'TNT Tag',
    subcategory: 'Features'
  })
  sounds = true

  @ButtonProperty({
    name: 'Target selection sound',
    description: 'Sound: random.successful_hit at 10 volume and 0.8 pitch.',
    category: 'TNT Tag',
    subcategory: 'Features',
    placeholder: 'Play sound'
  })
  playSelection = () => World.playSound('random.successful_hit', 10, 0.8)

  @ButtonProperty({
    name: 'Kill sound',
    description: 'Sound: random.successful_hit at 10 volume and 1.04 pitch.',
    category: 'TNT Tag',
    subcategory: 'Features',
    placeholder: 'Play sound'
  })
  playKill = () => World.playSound('random.successful_hit', 10, 1.04)

  @SwitchProperty({
    name: 'Give items to play again and leave the game',
    description: 'Mimics spectator items, useful if you have already lost.',
    category: 'TNT Tag',
    subcategory: 'Features'
  })
  clickables = true

  @TextProperty({
    name: 'Current nick',
    description: "If you're playing nicked, set your nick or you might become the target.",
    category: 'TNT Tag',
    subcategory: 'Features'
  })
  nick = 'Replace'

  @ButtonProperty({
    name: '&cReset stats',
    category: 'TNT Tag',
    placeholder: 'Reset'
  })
  reset = () => {} // For modifying in main

  

  @SwitchProperty({
    name: 'Hypixel Says helper',
    description: 'Enable Hypixel Says helper',
    category: 'Hypixel Says'
  })
  hypixelSaysHelper = true

  @ButtonProperty({
    name: 'Customization coming soon',
    description: 'its gonna take a very long time',
    category: 'Hypixel Says',
    placeholder: ':('
  })
  close = () => World.playSound('mob.cat.meow', 49, 0.8)



  @SwitchProperty({
    name: 'Auto welcome guild members',
    description: '&a[VIP] Yedelos &ejoined the guild!\n&2Guild > &b[MVP&8+&b] Yedel &6[Yedel]&f: Welcome, Yedelos!', 
    category: 'General',
    subcategory: 'Features',
  })
  guildWelcome = true

  @SwitchProperty({
    name: 'SkyWars strength indicators',
    description: "Shows people's strength above their nametags. Accounts for Apothecary.",
    category: 'General', 
    subcategory: 'Features'
  })
  strengthIndicators = true

  @SwitchProperty({
    name: 'Dropper AutoGG',
    description: "AutoGG for dropper, will be removed when it is added to Sk1er's AutoGG.\n&eNote: This only says gg at the end of the game, not when you finish.",
    category: 'General', 
    subcategory: 'Features'
  })
  dropperGG = getIsAutoGG()

  @SliderProperty({
    name: 'Delay',
    description: 'Delay for AutoGG, measured in seconds',
    category: 'General',
    subcategory: 'Features',
    min: 0,
    max: 5
  })
  dropperGGDelay = getAutoGGDelay()

  @SwitchProperty({
    name: 'Kuudra sacrifice display', 
    description: 'Shows the coins needed to get the Kuudra Follower Helmet from the Kuudra Believer.',
    category: 'General',
    subcategory: 'Features'
  })
  sacrificeDisplay = true

  @SwitchProperty({
    name: 'Limbo creative mode',
    description: 'Gives creative mode in limbo, not bannable because the server does not listen to anything happening.',
    category: 'General',
    subcategory: 'Features',
  })
  limboCreative = false

  @TextProperty({
    name: 'Random placeholder',
    description: 'When this is typed in chat, it will be replaced with a random string.',
    category: 'General',
    subcategory: 'Customization',
    placeholder: '//r',
  })
  randomString = '//r'
  
  @SelectorProperty({
    name: 'Ping method',
    description: "&9Ping: &7Does /ping command. Works on very few servers.\n&9Command: &7Enters a random command and waits for the unknown command response. Works on almost all servers.\n&9Tab: &7Sends a tab completion packet and waits for the response. Works on all servers.\n&9Stats: &7Sends a statistics packet and waits for the response. Works on all servers.\n&9Server list (default): &7Gets the ping displayed previously on the server list. Doesn't work on singleplayer and if you used Direct Connect.",
    category: 'General',
    subcategory: 'Customization',
    options: ['Ping', 'Command', 'Tab', 'Stats', 'Server list (default)']
  })
  pingMethod = 4



  constructor() {
    this.initialize(this)

    this.setCategoryDescription('General', 
      `&9&lYedelUtils &r&l2.3.0\nDiscord: &9yedel\n\nCommands:\n\n&9/formatting: &7Shows all text formatting codes\n&9/settext: &7Adds custom display text, move with &9/movetext &7and remove with &9/cleartext \n&9/yedelplaytime (/ypt, /yedelpt): &7Shows your playtime in hours and minutes\n&9/yedelli (/yli, /li): &7Sends you to the lobby/limbo for an invalid character (disconnects on most other servers)\n&9/yping (/yp): &7Shows an estimation of your ping using your selected method (customize below)\n\nKeybinds:\n\n&9Search the auction house for your currently held item: &7Bound to &9K &7by default\n&9Search the bazaar for your currently held item: &7Bound to &9L &7by default`); // All commands and keybinds

    this.addDependency('Show type of task in task message', 'Hypixel Says helper')

    this.addDependency('Delay', 'Dropper AutoGG') 
 
    this.addDependency('Customize display', 'Bounty Hunting')
    this.addDependency('&cReset stats', 'Bounty Hunting')
    this.addDependency('Current nick', 'Bounty Hunting')
    this.addDependency('Highlight target and show distance', 'Bounty Hunting')
    this.addDependency('Play sounds for target selections and kills', 'Bounty Hunting')
    this.addDependency('Target selection sound', 'Bounty Hunting')
    this.addDependency('Kill sound', 'Bounty Hunting')

    this.addDependency('Customization coming soon', 'Hypixel Says helper')
  }
}

export default new Yettings


