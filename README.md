# Running locally

1. `npm i` to install dependencies
2. `npm run dev` to launch the demo

# Decisions

- Mute/unmute microphone feature, I chose this because I think privacy is important and this feature gives users more control over their privacy, this is the same reason I have a text based experience as a backup in case the user does not want to send their voice to ElevenLabs.
- Transcript view, there is a live-ish transcript view that shows both what you said and what the agent said. It is live-ish as I am not using text streams which would give a proper live experience.
- not using text streams, I chose not to use text streams because it was easier to implement quickly with the ElevenLabs SDK
- Accessibility improvements, I focused on having good contrast and well labeled inputs/states that anyone can understand. I chose to improve accessibility because I think accessibility is very important for the web.

# What I would do with more time

- Improve accessibility even more
- i18n would be a nice feature seeing as aheeva operates in so many countries
- text streams to have a better user experience.
- add a way to switch between the voice and text modes.
- implement a way possibility with a context that allows other components to open the widget

# Known Issues

- [x] if the widget is opened and closed and reopened the agent does not give first message again
- if the agent speaks it includes \[worried\] at the beginning indicating tone, although this could possibility be argued as an accessibility feature

# TODO

- [x] improve status to show connecting instead of offline at the start
- [x] request mic but fall back to text if mic access is not allowed
- [x] have a mute mic button
- [x] if in voice/call mode have a button to end call
- [x] add error handling
- [x] close the connection when the visibility is toggled
- [x] add a visible text regarding the use of ElevenLabs

- [ ] improve accessibility even more
