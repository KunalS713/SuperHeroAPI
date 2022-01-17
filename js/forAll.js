const Common = (function () {
    const apiToken = '2825868034205585';
    const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
    const listContainer = document.getElementById('list');
    const FAVOURITES = 'favourites';
    const load = document.querySelector('.load');

  /*function to show load div*/
    function showLoad() {
        load.style.display = 'block';
        }

  /*function to hide load div*/
    function hideLoad() {
        load.style.display = 'none';
        }

  /* Notification handler */
    function showNotification(type, message) {
        if (type === 'error') {
            listContainer.classList.remove('list-success');
            listContainer.classList.add('list-error');
        }
        else if (type === 'success') {
            listContainer.classList.remove('list-error');
            listContainer.classList.add('list-success');
        }
        listContainer.style.display = 'block';
        listContainer.innerText = message;

        setTimeout(() => {
            listContainer.style.display = 'none';
            }, 3000);
        }

  /* Sending api requests */
    async function apiRequest(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

        return {data,success: true,};
        } catch (error) {
              console.log('error', error);
              return {error: error.message,success: false,
            };
        }
      }

  /* Add hero to localstorage */
    function addHeroToFavourites(hero) {
        if (!hero) return;

        const favouritesFromLocalStorage = getFavouriteSuperheroes();
        favouritesFromLocalStorage.push(hero);

    // Save in localstorage
        localStorage.setItem(FAVOURITES,JSON.stringify(favouritesFromLocalStorage)
      );

        showNotification('success', 'Added to favourites');
    }

  /* Remove hero from localstorage */
    function removeHeroFromFavourites(heroId) {
        if (!heroId) return;

        let favouritesFromLocalStorage = getFavouriteSuperheroes();

    // Remove hero from localstorage
        favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
              (item) => item.id !== heroId);

    // Save in localstorage
        localStorage.setItem(FAVOURITES,JSON.stringify(favouritesFromLocalStorage));

        showNotification('Removed', 'Removed from favourites');
      }

  /* Get fav superheroes from the local storage */
    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVOURITES)? JSON.parse(localStorage.getItem(FAVOURITES)): [];
      }

    function dehandle(func, delay) {
        let timeout;
        return function () {const context = this;const args = arguments;clearTimeout(timeout);
          timeout = setTimeout(function () {
              timeout = null;
              func.apply(context, args);
              // handleSearch(args);
              }, delay);
            };
          }


return {
    apiRequest,apiUrl,showNotification,addHeroToFavourites,
    removeHeroFromFavourites,getFavouriteSuperheroes,
    showLoad,hideLoad,dehandle,};
})();