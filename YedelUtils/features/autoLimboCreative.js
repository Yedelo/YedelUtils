import checkLimboCreative from './checkLimboCreative'



register('chat', checkLimboCreative).setCriteria('You were spawned in ${fromChat}') // Auto limbo creative.
// fromChat as an argument makes the variable true, telling the function that it was triggered from chat instead of the command.
// From there, the setting is checked