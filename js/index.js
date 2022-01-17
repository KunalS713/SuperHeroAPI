const Main = (function () {
    const searchBox = document.getElementById('search');
    const searchList = document.getElementById('search-results-list');
    let searchResults = [];
    const SEARCH_TEXT_LIMIT = 2;

    function renderSearchResults() {
        // If data is empty inform the user
        if (!searchResults || searchResults.length === 0) {
            searchList.innerHTML = '<li class="no-results">No Results found..!!</li>';
            return;
          }

        const favSuperHeroes = Common.getFavouriteSuperheroes();
        searchList.innerHTML = '';

    // Append each search result in the list
        searchResults.forEach((element) => {const li = document.createElement('li');
      // Find if superhero exists in favourites
        const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex((hero) => hero.id === element.id);
        li.classList.add('search-result');
        li.innerHTML = `
                    <div class="search-left">
                      <img src=${element.image.url} alt="" />
                    </div>
                    <div class="search-right">
                      <a href="details.html?id=${element.id}">
                        <div class="name">${element.name}</div>
                      </a>
                      <div class="full-name">${element.biography['full-name']}</div>
                      <div class="alter-egos">Alter Egos => ${element.biography['alter-egos']}</div>
                      <div class="aliases">Aliases => ${element.biography['aliases']}</div>
                      <div class="address">Address => ${element.biography['place-of-birth']}</div>
                      <div class="first-app">First Appearance => ${element.biography['first-appearance']}</div>
                      <div class="publisher">Publisher => ${element.biography['publisher']}</div>
                      <div class="alignment">Alignment =>${element.biography['alignment']}</div>
                      <button class="btn add-to-fav" data-id=${element.id} style="display: 
                      ${indexOfSuperHeroInFavourites === -1 ? 'block' : 'none' }">+ Add to favourites</button>
                      <button class="btn remove-from-fav" data-id=${element.id}
                        style="display: ${indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'}">- Remove from favourites</button>
                    </div>`;
          searchList.appendChild(li);
        });
      }

      /* Remove all search results from the UI */
    function emptySearchResults() {
        searchList.innerHTML = '';
        searchResults = [];
      }

      /* Handle search key down event and make an API all */
    async function handleSearch(e) {
        const searhTerm = e.target.value;
        const url = Common.apiUrl;

        if (searhTerm.length <= SEARCH_TEXT_LIMIT) {
            emptySearchResults();
            return;
        }

    // Show loader and remove existing search results
        Common.showLoad();
        emptySearchResults();

        try {
            const data = await Common.apiRequest(`${url}/search/${searhTerm}`);
            Common.hideLoad();

            if (data.success) {
                searchResults = data.data.results;
                renderSearchResults();
              }
          } catch (error) {
                console.log('error', error);
                Common.hideLoad();
          }
        }

  /* Handle user clicks (anywhere in the document) */
    function handleDocumentClick(e) {
        const target = e.target;

        if (target.classList.contains('add-to-fav')) {

        // Find the hero data and store it in favourites and localstorage
            const searchResultClickedId = target.dataset.id;
            const hero = searchResults.filter((hero) => hero.id === searchResultClickedId);
            Common.addHeroToFavourites(hero[0]);
            renderSearchResults();
        } else if (target.classList.contains('remove-from-fav')) {

          // Find the hero data and remove from local storage
            const searchResultClickedId = target.dataset.id;
            
          // Show add to fav button and hide the remove from fav button
            const addToFavBtn = document.querySelector(
            `button[data-id="${searchResultClickedId}"].add-to-fav`);
        if (addToFavBtn) addToFavBtn.style.display = 'block';
            const removeFromFavBtn = document.querySelector(
        `   button[data-id="${searchResultClickedId}"].remove-from-fav`
            );
        if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';

            Common.removeHeroFromFavourites(searchResultClickedId);
        }
      }

    function init() {
        searchBox.addEventListener('keyup', Common.dehandle(handleSearch, 500));
        document.addEventListener('click', handleDocumentClick);
      }

    return {
        init,
      };
})();