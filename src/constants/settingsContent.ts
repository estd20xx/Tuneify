export interface InfoSection {
  heading: string
  body: string
}

export const APP_VERSION = "1.0.11"

export const ABOUT_CONTENT: InfoSection[] = [
  {
    heading: `Tuneify ${APP_VERSION}`,
    body: "A free music player for your device. Millions of songs, audio books and your own local music, all in one place."
  },
  {
    heading: "Free music, no account",
    body: "Search and play anything you like straight away. There is no sign up, no subscription and no listening limit."
  },
  {
    heading: "Listen offline",
    body: "Download any song for offline listening and play the music already stored on your device from the Folders tab."
  },
  {
    heading: "Your own playlists",
    body: "Build playlists on your device and share them with friends through a QR code. Sharing works without internet, and duplicate songs are filtered out automatically."
  },
  {
    heading: "Lyrics while you listen",
    body: "Tap the lyrics icon in the player to flip the artwork over and read along with the song."
  },
  {
    heading: "Audio books",
    body: "Thousands of free audio books, browsable by newest, most popular and trending this week."
  },
  {
    heading: "Made for listening",
    body: "Sleep timer, shuffle, repeat, background playback and lock screen controls come as standard."
  }
]

export const CHANGELOG_CONTENT: InfoSection[] = [
  {
    heading: "1.0.11",
    body: "Offline playlist sharing over QR codes. Duplicate songs are now blocked when adding and when importing. Downloaded songs keep their artwork and artist. Settings are functional. Status bar no longer covers screen content."
  },
  {
    heading: "1.0.10",
    body: "Audio books are playable and downloadable. Home data moved to TanStack Query."
  },
  {
    heading: "1.0.9",
    body: "Central queue management, lyrics view and custom playlists."
  }
]

export const PRIVACY_CONTENT: InfoSection[] = [
  {
    heading: "What stays on your device",
    body: "Your playlists, favourites, downloads and settings are stored only on this device. There is no account and no server holding your library."
  },
  {
    heading: "Sharing",
    body: "Playlist sharing works entirely offline through QR codes. Nothing is uploaded when you share or scan a playlist."
  },
  {
    heading: "Network use",
    body: "The app contacts music catalogue services only to search, stream and fetch lyrics or artwork."
  }
]

export const FAQ_CONTENT: InfoSection[] = [
  {
    heading: "How do I share a playlist?",
    body: "Open Playlists, tap the share icon on any playlist, then let the other person scan the QR code with the camera button on their Playlists screen. No internet needed."
  },
  {
    heading: "Why is a playlist too large to share?",
    body: "A QR code holds a limited amount of data. Around a hundred songs fit comfortably. Remove a few songs and try again."
  },
  {
    heading: "Can the same song appear twice in a playlist?",
    body: "No. Duplicates are filtered out when you add a song and when you import a shared playlist."
  },
  {
    heading: "Where do downloads go?",
    body: "Into the Music folder on your device. They show up under the Folders tab."
  },
  {
    heading: "Why do lyrics show a placeholder?",
    body: "Not every track has lyrics available. Tap the lyrics icon at the top of the player to flip the artwork over."
  }
]
