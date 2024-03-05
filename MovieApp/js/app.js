const moviesHTML = document.querySelector('.movies')

movies.forEach((item, index) => {
    moviesHTML.insertAdjacentHTML('beforeend', `
    <div class="movie">
        <div class="movie__cover-inner">
            <img src="img/${item.image}" class="movie__cover" alt="" />
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${item.name}</div>
            <div class="movie__category">${item.category}</div>
            <div class="movie__average movie__average--red">${item.rating/10}</div>
        </div>
    </div>
    `);
});
