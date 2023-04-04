// create a DOMContentLoaded event listener
document.addEventListener ('DOMContentLoaded', ()=> {
    displayMovie ();
})

//Create a function for GET fetch

function displayMovie () {
    fetch ('http://localhost:3000/films')
    .then ((response)=> response.json ())
    .then (favMovies)
}

// Create a function that iterates through the fetched data

function favMovies (movies) {
    movies.forEach (myMoviesList)
}

//Create a function that allows one to display movies on a list

function myMoviesList (movies) {
    const dispList = document.querySelector('.disp__list')
    const dispDiv = document.createElement('div')
    dispDiv.innerHTML = `
    
        <a id = 'list' href='#'>${movies.title}</a>
    
    `
    dispDiv.addEventListener('click', (e)=>{
        e.preventDefault()
        const dispPoster = document.querySelector('img#poster')
        dispPoster.src = movies.poster
        const title = document.querySelector('#title')
        title.innerHTML = movies.title
        const runTime = document.querySelector('#run__time')
        runTime.innerHTML = movies.runtime
        const viewTime = document.querySelector('#view__time')
        viewTime.innerHTML = movies.showtime
        const ticket = document.querySelector('#tickets')
        ticket.innerHTML = `
        '${movies.capacity - movies.tickets_sold}'
        `
        const btn = document.querySelector('#btn')
    btn.addEventListener('click', ()=>{
        fetch (`http://localhost:3000/films/${movies.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                tickets_sold: movies.tickets_sold + 1
            })
        })
        .then ((response)=> response.json ())
        .then (data=> {
            if(data < 1) {
                alert('tickets are sold out')
            }
        })
    }) 
    })
    dispList.appendChild(dispDiv)

}
