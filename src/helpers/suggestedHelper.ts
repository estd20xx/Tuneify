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
    randomGenerator = (initial: number, final: number): number => {
        const randomNumber = Math.floor(Math.random() * final) + initial;
        return randomNumber
    }
    getRelatedSongs = () => {
        const songsArray = ["fuck+love", "love+you", "sacrifice", "forever", "watch", "loyal", "east+side", "make+me+love", "angel", "worthit"]
        return songsArray[this.randomGenerator(0, 10)]
    }
    getSongs = async () => {
        const songs = `https://saavn.me/search/songs?query=love+you`
        return songs
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