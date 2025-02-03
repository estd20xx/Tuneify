import { cipher, util } from "node-forge"
import { qualities } from "../base/constrants"
import { Artists } from "../interface/module.interface"

export interface Image {
  quality: string
  link: string
}
export interface Audio {
  quality: string
  link: string
}

export const createDownloadLinks = (encryptedMediaUrl: string): Audio[] => {
  // if (!encryptedMediaUrl) return false

  const key = "38346591"
  const iv = "00000000"

  const encrypted = util.decode64(encryptedMediaUrl)
  const decipher = cipher.createDecipher(
    "DES-ECB",
    util.createBuffer(key, "utf8")
  )

  decipher.start({ iv: util.createBuffer(iv, "utf8") })
  decipher.update(util.createBuffer(encrypted))
  decipher.finish()

  const decryptedLink = decipher.output.getBytes()

  const links = qualities.map((quality) => ({
    quality: quality.bitrate,
    link: decryptedLink.replace("_96", quality.id)
  }))
  return links
}

export const handleImageVariation = (link: string): Image[] => {
  const qualities = ["50x50", "150x150", "500x500"]
  const data = qualities.map((quality) => ({
    quality,
    link: link.includes("150x150")
      ? link.replace("150x150", quality)
      : link.replace("50x50", quality)
  }))
  return data
}

export const handleArtists = (artists: Artists[]): string => {
  let artis = ""
  artists.map((curret) => {
    artis += curret.name + ", "
  })
  return artis
}
