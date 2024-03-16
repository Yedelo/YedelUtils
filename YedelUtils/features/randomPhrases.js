import Yettings from '../yettings'

import {randomUuid} from '../utils/functions'



register('messageSent', (message, event) => {
  if (message.includes(Yettings.randomString)) {
    cancel(event)
    ChatLib.say(message.replace(Yettings.randomString, `@${randomUuid().toString().substring(0, 8)}`))
  }
})