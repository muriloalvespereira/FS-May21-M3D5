
let albumList ;

window.onload =  () => {
    fetchQueen()
    fetchAlbum("75621062")
    getAlbum()
    }



const getAlbum = async () => {
        let data = await requestAlbum()    
        albumList = data
        displayAlbums()
}



//fetch deadEnd for Queen and display in console
    const fetchQueen = function () {
        fetch ("https://striveschool-api.herokuapp.com/api/deezer/album/75621062 ",  {
            method:"GET"
        })
        .then(resp => { 
            return resp.json()
        })
        .then(data => console.log(data))
    }



//--------------------------------------------fetch albums  and display in console
const fetchAlbum = function (id) {
    fetch ("https://striveschool-api.herokuapp.com/api/deezer/album/ " + id,  {
        method:"GET"
    })
    .then(resp => { 
        return resp.json()
    })
    .then(data => 

//replace card with albums data CREATE A GRIP inside of fetchAlbum function

        function AlbumHTML(id, cover_small, artist, title){
        return`
            <div class="col pl-0">
                  <div class="card h-100">
                    <div class="position-relative">
                      <img
                        src="${cover_small}"
                        class="card-img-top img-fluid rounded py-3 px-2"
                        alt="..."           />

                      <div class="play">${artist}
                      </div>
                    </div>

                    <div class="card-body px-2 pt-0">
                      <h5 class="card-title mb-1 text-white">
                        ${title}
                      </h5>
                      <p class="card-text text-white-50">${id}</p>
                    </div>
                  </div>
                </div> `
}
         )
}





/* const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));*/

function displayAlbums(){
    let section = document.querySelectorAll('.h-100')

    albumList.forEach(album => {
        section[0].insertAdjacentHTML('beforeend', `${AlbumHTML(album.title, album.artist, album.id, album.cover_small, )}`)
    });
 
}






    
