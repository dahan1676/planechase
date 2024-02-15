# About
Planechase is a multiplayer variant of Magic: the Gathering. Here are the [rules of the format](https://magic.wizards.com/en/formats/planechase) and here is the app [URL](https://planechase-2024.vercel.app/).

## How to Use
### Home Screen

When you open up the app, you will see the home screen with the prompt to enter a list of cards (Planes and Phenomena). When you click Search, it will make a [Scryfall](https://scryfall.com) query to collect the list of the planes and phenomena entered. This query will only find planes and phenomena, and if you put in a name that is not recognized as one of those it will be ignored.

If you want to just play with all of the planes, click "Give me all the planes!"

### Game Screen

After pulling the list of planes, a session code will be appended onto the end of the URL. Sharing the URL with other people will allow you all to have a synchronized game. Changing the plane and rolling the die will be reflected on other players' sessions. The sync happens on an interval of 2 seconds (A future update will have an update to have this happen in real-time using websockets).
