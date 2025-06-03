interface Endpoints {
  homeData: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
  }
  albumDetails: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
    cc: string
  }
  playlistDetails: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
    cc: string
  }
  lyrics: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
    // lyrics_id: string
  }
  searchedSongsDetails: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
    // p: number // page number can be increased in page scroll
    // q: string // search songs
    // n: number // total songs in a page
  }
  searchDynamic: {
    _format: string
    _marker: string
    ctx: string
    api_version: number
    __call: string
    // query: "chrish brown",
  }
  songDetails: {
    _format: string
    _marker: number
    api_version: number
    ctx: string
    __call: string
    // pids: "Xlp-JzPr",
  }
}

export const endPoints: Endpoints = {
  homeData: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "webapi.getLaunchData"
  },
  albumDetails: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "content.getAlbumDetails",
    cc: "in"
  },
  playlistDetails: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "playlist.getDetails",
    cc: "in"
    // listid: string
  },
  searchedSongsDetails: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "search.getResults"
  },
  lyrics: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "lyrics.getLyrics"
    // lyrics_id: "NFoGAX5r",
  },
  searchDynamic: {
    _format: "json",
    _marker: "0",
    ctx: "web6dot0",
    api_version: 4,
    __call: "autocomplete.get"
    // query: "chrish brown",
  },
  songDetails: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    __call: "song.getDetails"
    // pids: "Xlp-JzPr",
  }
}
export const headers = {
  cookie: "L=english; gdpr_acceptance=true; DL=english"
}

export const params = {
  _format: "json",
  _marker: 0,
  api_version: 4,
  ctx: "web6dot0",
  __call: "search.getResults",
  p: 1,
  q: "alka yagnik",
  n: 100
}
