const EssentialAPI = Java.type('gg.essential.api.EssentialAPI') // Useful later maybe



let devEnvironment
if (Client.getMinecraft().mojangLogo) devEnvironment = true
else devEnvironment = false

export const YedelCheck = Java.type('at.yedel.yedelmod.YedelCheck') // YedelCheck class of YedelMod
export const isYedelModActive = typeof YedelCheck == 'function' // if YedelCheck is a class (exists) as opposed to package (doesn't)

export const logo = "&9&l< Yedel&7&lUtils &9&l>"
export const version = JSON.parse(FileLib.read('YedelUtils', 'metadata.json')).version // Welcome message and config menu

export const mc = Client.getMinecraft()

export const notifications = EssentialAPI.getNotifications() // Used for resetting stats

export const formattingGuide = [ // /formatting
  ChatLib.getCenteredText('&9&l------------ Formatting Guide ------------'),
  ChatLib.getCenteredText('&8Black: &80     &4Dark Red: &44     &2Dark Green: &22     &1Dark Blue: &11'),
  ChatLib.getCenteredText('&3Dark Aqua: &33     &5Dark Purple: &55     &6Gold: &66     &7Gray: &77'),
  ChatLib.getCenteredText('&8Dark Gray: &88     &9Blue: &99     &aGreen: &aa     &bAqua: &bb'),
  ChatLib.getCenteredText('&cRed: &cc     &dLight Purple: &dd     &eYellow: &ee     &fWhite: &ff'),
  ChatLib.getCenteredText('Obfuscated: k     &r&lBold: &ll     &r&mStrikethrough: &mm'),
  ChatLib.getCenteredText('&nUnderline: &nn&r     &r&oItalic: &oo    &rReset: &rr'),
  ChatLib.getCenteredText('&9&l-----------------------------------------')
]

export const items = { // Names of items for custom resource packs and languages (?)
  hayBale: new Item('minecraft:hay_block').getName(),
  waterBucket: new Item('minecraft:water_bucket').getName(),
  milkBucket: new Item('minecraft:milk_bucket').getName(),

  steak: new Item('minecraft:beef').getName(),
  cookedPorkchop: new Item('minecraft:cooked_porkchop').getName(),
  bakedPotato: new Item('minecraft:baked_potato').getName(),

  wheat: new Item('minecraft:wheat').getName(),
  musicDiscMall: new Item('minecraft:record_mall').getName(),
  // potionOfLeaping: new Item('minecraft: ') // can't find how to do this

  // slap items placeholder 

  spiderEye: new Item('minecraft:spider_eye').getName(),
  glisteningMelon: new Item('minecraft:speckled_melon').getName(),
  magmaCream: new Item('minecraft:magma_cream').getName(),
  goldenCarrot: new Item('minecraft:golden_carrot').getName(),
  sugar: new Item('minecraft:sugar').getName(),
  ghastTear: new Item('minecraft:ghast_tear').getName(),
  blazePowder: new Item('minecraft:blaze_powder').getName(),

  // potions placeholder, can't find how to do this

  goldOre: new Item('minecraft:gold_ore').getName(),
  redstoneOre: new Item('minecraft:redstone_ore').getName(),
  ironOre: new Item('minecraft:iron_ore').getName(),
  lapisOre: new Item('minecraft:lapis_ore').getName(),
  diamondOre: new Item('minecraft:diamond_ore').getName(),
  emeraldOre: new Item('minecraft:emerald_ore').getName(),

  goldIngot: new Item('minecraft:gold_ingot').getName(),
  ironIngot: new Item('minecraft:iron_ingot').getName(),
  diamond: new Item('minecraft:diamond').getName(),

  woodenSword: new Item('minecraft:wooden_sword').getName(),
  stoneSword: new Item('minecraft:stone_sword').getName(),
  goldenSword: new Item('minecraft:golden_sword').getName(),
  ironSword: new Item('minecraft:iron_sword').getName(),
  diamondSword: new Item('minecraft:diamond_sword').getName(),
  enchantedBook: new Item('minecraft:enchanted_book').getName(),
  
  cookie: new Item('minecraft:cookie').getName(),
  coal: new Item('minecraft:coal').getName()
}


export const killMessages = [ // All skywars kill messages for strength indicators
  '${killed} was killed by ${killer}.',
  '${killed} was thrown into the void by ${killer}.',
  '${killed} was thrown off a cliff by ${killer}.',
  '${killed} was shot by ${killer}.',
  '${killed} got rekt by ${killer}.',
  '${killed} took the L to ${killer}.',
  '${killed} got dabbed on by ${killer}.',
  '${killed} got bamboozled by ${killer}.',
  '${killed} was trampled by ${killer}.',
  '${killed} was back kicked into the void by ${killer}.',
  '${killed} was headbutted off a cliff by ${killer}.',
  '${killed} was impaled from a distance by ${killer}.',
  '${killed} was struck down by ${killer}.',
  '${killed} was turned to dust by ${killer}.',
  '${killed} was turned to ash by ${killer}.',
  '${killed} was melted by ${killer}.',
  '${killed} was filled full of lead by ${killer}.',
  '${killed} met their end by ${killer}.',
  '${killed} lost a drinking contest with ${killer}.',
  '${killed} lost the draw to ${killer}.',
  '${killed} was given the cold shoulder by ${killer}.',
  '${killed} was out of the league of ${killer}.',
  "${killed}'s heart was broken by ${killer}.",
  "${killed} was struck with Cupid's arrow by ${killer}.",
  "${killed} be sent to Davy Jones' locker by ${killer}.",
  '${killed} be cannonballed to death by ${killer}.',
  '${killed} be voodooed by ${killer}.',
  '${killed} was turned into space dust by ${killer}.',
  '${killed} was sent into orbit by ${killer}.',
  '${killed} was retrograded by ${killer}.',
  '${killed} was hit by an asteroid from ${killer}.',
  '${killed} was deleted by ${killer}.',
  "${killed} was ALT+F4'd by ${killer}.",
  '${killed} was crashed by ${killer}.',
  '${killed} was rm -rf by ${killer}.',
  '${killed} died in close combat to ${killer}.',
  '${killed} fought to the edge with ${killer}.',
  '${killed} stumbled off a ledge with help by ${killer}.',
  '${killed} fell to the great marksmanship of ${killer}.', 
  '${killed} was glazed in BBQ sauce by ${killer}.',
  '${killed} slipped in BBQ sauce of the edge spilled by ${killer}.',
  '${killed} was not spicy enough for ${killer}.',
  '${killed} was thrown chili powder at by ${killer}.',
  '${killed} was exterminated by ${killer}.',
  '${killed} was squashed by ${killer}.',
  '${killed} was tranquilized by ${killer}.',
  '${killed} was mushed by ${killer}.',
  '${killed} was peeled by ${killer}.',
  "${killed} slipped on ${killer}'s banana peel off a cliff.",
  "${killed} got banana pistol'd by ${killer}.",
  '${killed} was chewed up by ${killer}.',
  '${killed} was squeaked off the edge by ${killer}.',
  '${killed} was distracted by a rat draggging pizza from ${killer}.',
  '${killed} was squeaked from a distance by ${killer}.',
  '${killed} was oinked up by ${killer}.',
  '${killed} slipped into void for ${killer}.',
  '${killed} was distracted by a piglet from ${killer}.',
  '${killed} got attacked by a carrot from ${killer}.',
  '${killed} was buzzed to death by ${killer}.',
  "${killed} was bzzz'd off the edge by ${killer}.",
  '${killed} was stung by ${killer}.',
  '${killed} was startled from a distance by ${killer}.',
  '${killed} was socked by ${killer}.',
  "${killed} was KO'd by ${killer}.",
  '${killed} took an uppercut from ${killer}.',
  '${killed} was sent into a daze by ${killer}.',
  '${killed} was crusaded by the knight ${killer}.',
  '${killed} was jousted by ${killer}.',
  '${killed} was capapulted by ${killer}.',
  '${killed} was shot to the knee by ${killer}.',
  '${killed} was bit by ${killer}.',
  "${killed} got WOOF'D by ${killer}.",
  '${killed} was growled off an edge by ${killer}.',
  '${killed} was thrown a frisbee by ${killer}.',
  '${killed} got rekt by ${killer}.',
  '${killed} took the L to ${killer}.',
  '${killed} got dabbed on by ${killer}.',
  '${killed} got bamboozled by ${killer}.',
  '${killed} was backstabbed by ${killer}.',
  '${killed} was pushed into the abyss by ${killer}.',
  '${killed} was thrown into a ravine by ${killer}.',
  '${killed} was brutally shot by ${killer}.',
  '${killed} was locked outside during a snow storm by ${killer}.',
  '${killed} was shoved down an icy slope by ${killer}.',
  '${killed} was made into a snowman by ${killer}.',
  '${killed} was hit with a snowball from ${killer}.',
  '${killed} was painted pretty by ${killer}.',
  '${killed} was flipped off the edge by ${killer}.',
  '${killed} was deviled by ${killer}.',
  '${killed} was made sunny side up by ${killer}.',
  '${killed} was whacked with a party balloon by ${killer}.',
  '${killed} was popped into the void by ${killer}.',
  '${killed} was launched like a firework by ${killer}.',
  '${killed} was shot with a roman candle by ${killer}.',
  '${killed} was wrapped up by ${killer}.',
  '${killed} was tied into a bow by ${killer}.',
  '${killed} tripped over a present placed by ${killer}.',
  '${killed} was glued up by ${killer}.',
  '${killed} was crushed into moon dust by ${killer}.',
  '${killed} was sent the wrong way by ${killer}.',
  '${killed} was blasted to the moon by ${killer}.',
  '${killed} was smothered in holiday cheer by ${killer}.',
  "${killed} was banished into the ether by ${killer}'s holiday spirit.",
  "${killed} was pushed by ${killer}'s holiday spirit.",
  '${killed} was sniped by a missle of festivity by ${killer}.',
  '${killed} became victim ${num} of ${killer}.',
  '${killed} was bow kill ${num} of ${killer}.',
  '${killed} was void victim ${num} of ${killer}.', 
]