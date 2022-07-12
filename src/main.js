const API_BASE = 'https://api.themoviedb.org/3';
// Trending
const trending_card = document.getElementById('contTrending_card'); 
const week_button = document.getElementById('trending-button-week');
const day_button = document.getElementById('trending-button-day');
//Searcher
const card_search_container = document.getElementById('contSearcher__box');
const form_search_button = document.getElementById('button__filtros-search');
const actors_input = document.getElementById('contSearcher__filtros-actors');
//more cards
let current_page = 1;

//Variables para dar estilos al CSS
const icon_menu_nav = document.getElementById('icon-menu-nav');

// //colocar fondo header peli top dia
async function backgroundTop() {

  const img_header = document.getElementById('header_container');
  const title_top_dia = document.getElementById('title-top-dia');
  const header_play_button = document.getElementById('header_play_link');

  const response = await fetch(API_BASE + `/trending/movie/day?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9`);
  const data = await response.json();

  img_header.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.results[0].backdrop_path})`;
  title_top_dia.innerHTML = data.results[0].title;

  //buscando el link para el boton play
  const response1 = await fetch(API_BASE + `/movie/${data.results[0].id}?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9&language=en-US`);
  const data1 = await response1.json();

  header_play_button.href = data1.homepage;
}

//fetch movie trending
async function fetchTrandingMovie(time) {
  
  const response = await fetch(API_BASE + `/trending/movie/${time}?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9`);
  const data = await response.json();

  let view = `
    ${data.results.map(item => `
      <article class="contTrending__card">
        <a href="#"><img data-peli_id="${item.id}" id="imgTrend" class="contTrending__card-img" src="https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}" alt=""></a>
        <a href="#"><h3 data-peli_id="${item.id}" id="h3Trend" class="h3Title heigth-h3-card">${item.title}</h3></a>        
        <div class="contTrending__card-details">
          <p id="yearTrend0">${item.release_date}</p>
          <div class="contTrending__card-popularity">
            <p id="voteAverage">${item.vote_average}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 trending-star" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </article>
    `).join('')}
    `;

    trending_card.innerHTML = "";
    trending_card.insertAdjacentHTML('afterbegin', view);

    if (time == 'week') {
      week_button.classList.add('contTrending__button-week-act');
      week_button.classList.remove('contTrending__button-week');
      day_button.classList.add('contTrending__button-day');
      day_button.classList.remove('contTrending__button-day-act');
    } else {
      day_button.classList.add('contTrending__button-day-act');
      day_button.classList.remove('contTrending__button-day');
      week_button.classList.add('contTrending__button-week');
      week_button.classList.remove('contTrending__button-week-act');
    }

  week_button.onclick = () => fetchTrandingMovie('week');
  day_button.onclick = () => fetchTrandingMovie('day');
}

//fetch movie search
async function fetchSearchMovie() {

  let view1;
  
  // Searcher
  const orden_select = document.getElementById('contSearcher__filtros-orden');
  const genres_select = document.getElementById('contSearcher__filtros-genres');
  const year_select = document.getElementById('contSearcher__filtros-year');
  const stars_select = document.getElementById('contSearcher__filtros-stars');
  const actor_select = document.getElementById('contSearcher__filtros-actors');
  const more_cards_search = document.getElementById('incr-search-icon');
  

//   //escuchar cambio texto input actor y autocompletar nombres
  actors_input.addEventListener('keydown', async function() {
  
    const datalist = document.getElementById('actor');
  
    const response = await fetch(API_BASE + `/search/person?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9&language=es-US&query=${actors_input.value}`);
    const data = await response.json();
  
    let view = `
      ${data.results.map(item => `
      <option value="${item.id}">${item.name}</option>
        `).join('')}
      `;
  
    datalist.innerHTML = "";
    datalist.insertAdjacentHTML('afterbegin', view);
  
  });

  const data_search = {
    orden: orden_select.value,
    genres: genres_select.value,
    year: year_select.value,
    stars: stars_select.value,
    actor: actor_select.value,
  };
  
  current_page = 1;

  const response = await fetch(API_BASE + `/discover/movie?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9&language=es-US&sort_by=${data_search.orden}&include_adult=false&include_video=false&page=${current_page}&primary_release_year=${data_search.year}&vote_average.gte=${data_search.stars}&with_people=${data_search.actor}&with_genres=${data_search.genres}&with_watch_monetization_types=flatrate`);
  const data = await response.json();

  view1 = "";
  view1 = `
    ${data.results.map(item => `
      <article class="contTrending__card">
        <a href="#"><img data-peli_id="${item.id}" id="imgTrend" class="contTrending__card-img" title="${item.original_title}" src="https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}" alt=""/></a>
        <a href="#"><h3 data-peli_id="${item.id}" id="h3Trend" title="${item.original_title}" class="h3Title heigth-h3-card">${item.original_title}</h3></a>        
        <div class="contTrending__card-details">
          <p id="yearTrend0">${item.release_date}</p>
          <div class="contTrending__card-popularity">
            <p id="voteAverage">${item.vote_average}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 trending-star" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p id="voteAverage">(${item.vote_count})</p>
          </div>
        </div>
        <div id=""></div>
      </article>
      `).join('')}
    `;

  card_search_container.innerHTML = "";
  
  card_search_container.insertAdjacentHTML('afterbegin', view1);

//   //escuchar click cargar mças cards del search (pagina 2,...)
  more_cards_search.addEventListener('click', async function() {
  
    current_page++;
    console.log(current_page);
    const response = await fetch(API_BASE + `/discover/movie?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9&language=es-US&sort_by=${data_search.orden}&include_adult=false&include_video=false&page=${current_page}&primary_release_year=${data_search.year}&vote_average.gte=${data_search.stars}&with_people=${data_search.actor}&with_genres=${data_search.genres}&with_watch_monetization_types=flatrate`);
    const data = await response.json();
  
    let view = `
    ${data.results.map(item => `
      <article class="contTrending__card">
        <a href="#"><img data-peli_id="${item.id}" id="imgTrend" class="contTrending__card-img" title="${item.original_title}" src="https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}" alt=""/></a>
        <a href="#"><h3 data-peli_id="${item.id}" id="h3Trend" title="${item.original_title}" class="h3Title heigth-h3-card">${item.original_title}</h3></a>        
        <div class="contTrending__card-details">
          <p id="yearTrend0">${item.release_date}</p>
          <div class="contTrending__card-popularity">
            <p id="voteAverage">${item.vote_average}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 trending-star" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p id="voteAverage">(${item.vote_count})</p>
          </div>
        </div>
      </article>
      `).join('')}
    `;
  
    card_search_container.insertAdjacentHTML('afterbegin', view);
  
    document.getElementById('searcher_link').click();
  
  });
}


//colocamos la info al popup
//------------------------------------------------------------------
setInterval(async function(){
  const movieDetails = document.getElementById('movieDetails');
  const icon_cerrar_popup = document.getElementById('icon_cerrar_popup');
  const cards = document.getElementsByClassName('contTrending__card');
  
  let ID_peli = "";
  // console.log('funcionando');

  for(const iterable of cards){
    iterable.onclick = fetchMovie_Info;
  }

  icon_cerrar_popup.onclick = cerrarPopup;

  // funciones del setINterval----------

  function cerrarPopup() {
    console.log('adios');
    movieDetails.style.left = '-100vw';
  }

  async function fetchMovie_Info(e) {
    //capturar click y guardar ID_peli
    let HaHechoClick;
    if (e == null) {
      // Si hac click un elemento, lo leemos
      HaHechoClick = e.srcElement;
    } else {
      // Si ha hecho click sobre un destino, lo leemos
      HaHechoClick = e.target;
    }
    // console.log(HaHechoClick.dataset.peli_id);
    ID_peli = HaHechoClick.dataset.peli_id;

    //variables de la peli
    const movieDetails_title = document.getElementById('movieDetails_title');
    const movieDetails_img = document.getElementById('movieDetails_img');
    const movieDetails_date = document.getElementById('movieDetails_date');
    const movieDetails_duration = document.getElementById('movieDetails_duration');
    const movieDetails_stars = document.getElementById('movieDetails_stars');
    const movieDetails_count = document.getElementById('movieDetails_count');
    const movieDetails_genres = document.getElementById('movieDetails_genres');
    const movieDetails_overview = document.getElementById('movieDetails_overview');
    const movieDetails_comp = document.getElementById('movieDetails_comp');
    const movieDetails_play = document.getElementById('movieDetails_play');
  
    const response = await fetch(API_BASE + `/movie/${ID_peli}?api_key=6b3aca2c2b68dc2a015ad5ccff3223f9&language=en-US`);
    const data = await response.json();
  
    movieDetails_title.innerHTML = data.original_title;
    movieDetails_img.src = `https://image.tmdb.org/t/p/w300_and_h450_face` + data.poster_path;
    movieDetails_date.innerHTML = data.release_date;
    movieDetails_duration.innerHTML = `${Math.round(data.runtime/60)}hr ${data.runtime%60}min`;
    movieDetails_stars.innerHTML = data.vote_average;
    movieDetails_count.innerHTML = `(${data.vote_count})`;
    movieDetails_genres.innerHTML = data.genres.map(item => `${item.name}`).join(', ');
    movieDetails_overview.innerHTML = data.overview;
    movieDetails_comp.innerHTML = data.production_companies.map(item => `
      <span>
        <p>${item.name}</p>
        <img width="150px" src="https://image.tmdb.org/t/p/w200${item.logo_path}" alt="">
      </span>
    `).join('');
    movieDetails_play.href = data.homepage;

    movieDetails.style.visibility = 'visible';
    movieDetails.style.left = '0vw';
  }
  
  
}, 5000);

//------------------------------------------------------------------

//Desplegando menu mobile
let toque = 1;

function desplegarMenu() {
  const nav_link_mobile = document.getElementById('nav_link-mobile');
  const nav_link_mobile_li = document.querySelectorAll('.nav_link-mobile-li');
  if (toque == 1) {
    nav_link_mobile.style.visibility = 'visible';
    nav_link_mobile_li.forEach(item => item.style.padding = '8px');
    toque++;
  } else {
    nav_link_mobile.style.visibility = 'hidden';
    nav_link_mobile_li.forEach(item => item.style.padding = '0px');
    toque = 1;
  }
  
}

icon_menu_nav.onclick = () => desplegarMenu();

// COLOCAR BACKGROUND HEADER  
backgroundTop();

form_search_button.onclick = () => fetchSearchMovie();

fetchTrandingMovie('week');
fetchSearchMovie();



