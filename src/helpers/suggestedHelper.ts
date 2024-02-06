import axios from "axios"
class Homehelper {
    getData = async (url: string) => {
        try {
            const result = await axios.get(url)
            console.log(result.data.data.results)
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