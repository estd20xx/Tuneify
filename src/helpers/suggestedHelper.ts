import axios from "axios"
class Homehelper {

    netWorkHandler = async (url: string) => {
        try {

        } catch (error) {
        }
    }
    getData = async (url: string) => {
        try {
            const result = await axios.get(url)
            return result.data
        } catch (error) {
            return error
        }
    }
    getRecentyPlayedSong = async () => {

    }
    getMoreArtists = async () => {

    }
    getMostPlayed = async () => {

    }
    getTrndingTopic = async () => {
    }
    getTrendingAlbums = async () => {
    }
    getHomeData = async (url: string) => {
        try {
            const result = await axios.get(url)
            return result.data
        } catch (error) {
            return error
        }
    }
}
const homeHelper = new Homehelper()
export default homeHelper