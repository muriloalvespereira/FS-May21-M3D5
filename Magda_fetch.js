
let albumList ;

/* Murino methode 

function firstBtn() {
    fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen",
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then(({ data }) => {
        let displaySongs = document.querySelector(".main-container-two");
        data.forEach((titles) => {
          console.log("dentro foreach");
          displaySongs.insertAdjacentHTML(
            "beforeend",
            
            <div class="col d-none d-sm-block">
              <div class="card h-100">
                <div class="position-relative">
                  <img
                    src="${titles.album.cover_medium}"
                    class="card-img-top img-fluid rounded py-3 px-2"
                    alt="..."
                  />

                  <div class="play"></div>
                </div>

                <div class="card-body px-2 pt-0">
                  <h5 class="card-title mb-1 text-white">
                   ${titles.artist.name}
                  </h5>
                  <p class="card-text text-white-50">
                    Artist
                  </p>
                </div>
              </div>
            </div>
          
          );
        });
      });
  }

  firstBtn()

*/

window.onload =  () => {
    fetchQueen()
    fetchAlbum("75621062")
    
    }

//fetch deadEnd for Queen and display in console

    const fetchQueen = function () {
        fetch ("https://striveschool-api.herokuapp.com/api/deezer/album/75621062 ",  {
            method:"GET"
        })
        .then(resp => { 
            return resp.json()
        })
        .then(artist => console.log(artist))
    }

//--------------------------------------------fetch albums  and display in console
const fetchAlbum = function () {
    fetch ("https://striveschool-api.herokuapp.com/api/deezer/album/75621062 " ,  {
        method:"GET"
    })
    .then((resp) => { 
        return resp.json()
        
    })
    .then(({ artist} )  =>  {
        console.log(artist.name);

        let displayAlbum = document.querySelector(".row-display");
        
          //  data.forEach((titles) => {
            
            displayAlbum.insertAdjacentHTML("beforeend",   
            `                
            
            
            
            <div class="col pl-0">
                  <div class="card h-100">
                    <div class="position-relative">
                      <img
                        src="${artist.picture}"
                        class="card-img-top img-fluid rounded py-3 px-2"
                        alt="..."           />
                      <div class="play">${artist.title}
                      </div>
                    </div>
                    <div class="card-body px-2 pt-0">
                      <h5 class="card-title mb-1 text-white">
                        ${artist.name}
                      </h5>
                      <p class="card-text text-white-50">${artist.id}</p>
                    </div>
                  </div>
                </div> `
           )
//}

    }
    )


}
