const Favourites = (function () {
    const searchList = document.getElementById('search-results-list');

    function renderFavourites() {
        const favouritesData = Common.getFavouriteSuperheroes();

        // First empty the list
        searchList.innerHTML = '';

        //display when no result is available
        if (!favouritesData || favouritesData.length === 0) {
            searchList.innerHTML = '<li><div class="noresult">Plz .. Add your Favourite characters to Display here</div></li>';
        } else {
          //syntax of displayed result
            favouritesData.forEach((element) => {
            const li = document.createElement('li');
            li.classList.add('search-result');
            li.innerHTML = `
                    <div class="search-left">
                      <img src=${element.image.url} alt="" />
                    </div>
                    <div class="search-right">
                      <a href="superhero.html?id=${element.id}">
                        <div class="name">${element.name}</div>
                      </a>
                      <div class="full-name">${element.biography['full-name']}</div>
                      <div class="alter-egos">Alter Egos => ${element.biography['alter-egos']}</div>
                      <div class="aliases">Aliases => ${element.biography['aliases']}</div>
                      <div class="address">Address => ${element.biography['place-of-birth']}</div>
                      <div class="first-app">First Appearance => ${element.biography['first-appearance']}</div>
                      <div class="publisher">Publisher => ${element.biography['publisher']}</div>
                      <div class="alignment">Alignment =>${element.biography['alignment']}</div>
                      <button class="btn remove-from-fav" data-id=${element.id}>- Remove from favourites</button>
                    </div>`;
              searchList.appendChild(li);
            });
          }

          Common.hideLoad();
          return;
        }

  /* Handle search key down event and make an API all */
    function handleDocumentClick(e) {
        const target = e.target;

        if (target.classList.contains('remove-from-fav')) {
          // Find the hero data and store it in favourites and localstorage
            const searchResultClickedId = target.dataset.id;
            Common.removeHeroFromFavourites(searchResultClickedId);
            renderFavourites();
          }
        }

    function init() {
        Common.showLoad();
        renderFavourites();
        document.addEventListener('click', handleDocumentClick);
      }

      return {
        init,
      };
})();