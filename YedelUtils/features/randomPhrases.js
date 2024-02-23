import Yettings from '../yettings'

import {randomUuid} from '../stuff/functions'



register('messageSent', (message, event) => { // Random message blocks
  if (message.includes(Yettings.randomString)) {
    cancel(event)
    ChatLib.say(message.replace(Yettings.randomString, `@${randomUuid()}`))
  }
})