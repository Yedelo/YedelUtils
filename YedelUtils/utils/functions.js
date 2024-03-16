const DecimalFormat = java.text.DecimalFormat
const formatter = new DecimalFormat("#,###") // Commafy formatter

const UUID = java.util.UUID

const more = ChatLib.getCenteredText('&7&n& more!')

/** 
* Returns a number with commas.
*
* @param number the number
* @returns the commafied number
**/

export function commafy (number) {
  return formatter.format(number)
}

/** 
* Returns a random UUID string.
* Useful for random strings.
* 
* @returns the random UUID string
**/

export function randomUuid () {
  return UUID.randomUUID()
}

/** 
* Returns a number based on a hash code.
* Taken from VolcAddons.
* note: the length property only somewhat works
* 
* @param length the desired length
* @returns a hashcode string
**/

export function randomHash (length) {
  return Math.random().toString(36).substring(2, length + 2)
}

/** 
* Returns a random number within a range.
*
* @param min minimum number
* @param max maximum number
* @returns the random number
**/

export function randomRange (min, max) {
  return Math.random() * (max - min) + min
}

/** 
* Returns a formatting code based on a ping value.
* This could also be used for any number where the greater it is, the worse it is
*
* @param number the number
* @returns the formatting rating
**/

export function color (ping) {
  if (ping < 50) return '&a'
  else if (ping < 100) return '&2'
  else if (ping < 150) return '&e'
  else if (ping < 200) return '&6'
  else if (ping < 250) return '&c'
  else if (ping < 300) return '&4'
  else if (ping < 350) return '&5'
  else if (ping < 400) return '&d'
  else if (ping < 450) return '&f'
  else if (ping < 450) return '&b'
  else if (ping < 500) return '&3'
  else if (ping < 550) return '&9'
  else if (ping < 600) return '&1'
  else if (ping < 650) return '&7'
  else if (ping < 700) return '&8'
  else return '&0'
}

/** 
* yedel
**/

export function yedel () {
  Client.showTitle('&9You just got &bYedeled!', '', 0, 1000, 0)
  setTimeout(() => {Client.showTitle('&3Y&9ou just got &bYedeled!', '', 0, 200, 0)}, 100)
  setTimeout(() => {Client.showTitle('&9Y&3o&9u just got &bYedeled!', '', 0, 200, 0)}, 200)
  setTimeout(() => {Client.showTitle('&9Yo&3u &9just got &bYedeled!', '', 0, 200, 0)}, 300)
  setTimeout(() => {Client.showTitle('&9You &3j&9ust got &bYedeled!', '', 0, 200, 0)}, 400)
  setTimeout(() => {Client.showTitle('&9You j&3u&9st got &bYedeled!', '', 0, 200, 0)}, 500)
  setTimeout(() => {Client.showTitle('&9You ju&3s&9t got &bYedeled!', '', 0, 200, 0)}, 600)
  setTimeout(() => {Client.showTitle('&9You jus&3t &9got &bYedeled!', '', 0, 200, 0)}, 700)
  setTimeout(() => {Client.showTitle('&9You just &3g&9ot &bYedeled!', '', 0, 200, 0)}, 800)
  setTimeout(() => {Client.showTitle('&9You just g&3o&9t &bYedeled!', '', 0, 200, 0)}, 900)
  setTimeout(() => {Client.showTitle('&9You just go&3t &bYedeled!', '', 0, 200, 0)}, 1000)
  setTimeout(() => {Client.showTitle('&9You just got &bYedeled!', '', 0, 200, 0)}, 1100)
  setTimeout(() => {Client.showTitle('&9You just got &fYedeled!', '', 0, 200, 0)}, 1112)
  setTimeout(() => {Client.showTitle('&9You just got &bYedeled!', '', 0, 200, 0)}, 1124)
  setTimeout(() => {Client.showTitle('&9You just got &fYedeled!', '', 0, 200, 0)}, 1136)
  setTimeout(() => {Client.showTitle('&9You just got &bYedeled!', '', 0, 200, 300)}, 1148)
  setTimeout(() => {Client.showTitle('', '', 0, 0, 0)}, 2148)
}