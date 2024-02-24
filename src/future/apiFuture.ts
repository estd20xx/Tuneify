/* ====================Home page api =============
1. link --> https://saavn.me/modules?language=hindi,english,nepali
-------- Types of data ----
# Albums []
    id ,name, year, type,playCount,language, explicitcontent,url

    ## primaryArtists
        id, name, url,

        ###images []
            quality, link -50x50, 150x150, 500x500
        
        type
        role
    featuredArtists:[]

    artists-[]
        id, name, url, images[], type, role

    image[]
        quality, link
    songs[]





    
#playlists[]
    id, userId, title, subtitle, type,image[same as above], url, songCount, firstname, followerCount
    lastUpdated, explicitcontent

#charts []
    id,title, subtitles, type, image[], firstname, explicitcontent,langauge

#trending

    songs[]
        id ,name, year, type,album[id,name], releaseData, duration, label, 
           ## primaryArtists [id,name, url ,image, type,role] , featuredArtists[], url, image[]
           playCount,language, explicitcontent,url

    albums[]
        id ,name, year, type,releaseDate, playCount,language, explicitcontent,url, primaryArtists[],
        featuredArtists, artists[id, name, url, images[], type, role], image[]

*/
