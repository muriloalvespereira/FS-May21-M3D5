let artistObject = {}

window.onload = () => {

    fetchArtist("412")
    fetchCover("412")
    

} 

const fetchArtist = function (id) { 

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`, {
        method: "GET"
    })
    .then(resp => {
        return resp.json()
    })
    .then((artistObject) => {   
       console.log(artistObject)

       let artistId = document.querySelector("h1")       
       artistId.innerHTML = `${artistObject.name}`
       
       let artistId2 = document.querySelectorAll(".name-top")[0]
       artistId2.innerHTML = `${artistObject.name}`
                
    })
    .catch((error) => {
        console.log("error");
    })
}

const fetchCover = function (id) {

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`, {
        method: "GET"
    })
    .then(resp => {
        return resp.json()
    })
    .then((artistObject) => {   
       console.log(artistObject)

       let bgdImage = document.querySelectorAll(".img-bgd")[0]
       bgdImage.style.backgroundImage = `url(${artistObject.picture_xl})`
                 
        
    })
    .catch((error) => {
        console.log("error");
    })
}

