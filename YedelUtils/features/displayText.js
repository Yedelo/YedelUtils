import vals from '../stuff/vals'



export const displayText = new Display().setRenderLoc(vals.displayX, vals.displayY)
if (vals.displayedText != 'Display text&e&n&l&r') displayText.setLine(0, new DisplayLine(vals.displayedText).setShadow(true))