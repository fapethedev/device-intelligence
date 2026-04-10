import { JetBrains_Mono, Space_Grotesk } from "next/font/google"

const spaceGroteskHeading = Space_Grotesk({
  subsets:['latin'],
  variable:'--font-heading',
  preload: false
});


const jetbrainsMono = JetBrains_Mono({
  subsets:['latin'],
  variable:'--font-mono',
  preload: false
})


export {
  spaceGroteskHeading,
  jetbrainsMono
}