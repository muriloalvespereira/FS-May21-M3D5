let artistObject = {}

window.onload = () => {

    fetchArtist("13177249")
    

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
       

       let songNames = document.querySelectorAll(".album-names")
       for (i = 0; i < songNames.length; i++) {
           songNames[i].insertAdjacentHTML("beforeend", `<small class="py-0 my-0 text-white artist-name"><u>${artistObject.name}</u></small>`)
       }
       
        let artistNames = document.querySelectorAll(".artist-name")
        console.log(artistNames)
        artistNames.forEach(artistName => {
        return artistName.addEventListener("click", function() {
        window.location.assign("./artist.html")
        }) 
            
        })
                
    })
    .catch((error) => {
        console.log("error");
    })
}