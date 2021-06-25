let click = 0
function addPlaylist(){
    let ul = document.getElementById('add-list')
    let list = document.createElement('li')
    click++
    list.textContent = `My Playlist #${click}`
    
    ul.appendChild(list)
   
}