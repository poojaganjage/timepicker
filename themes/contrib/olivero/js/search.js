/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  var searchWideButton = document.querySelector('.js-header-nav__search-button');
  var searchWideWrapper = document.querySelector('.js-search-wide__wrapper');

  function searchIsVisible() {
    return searchWideWrapper.classList.contains('is-active');
  }
  drupalSettings.olivero.searchIsVisible = searchIsVisible;

  function handleFocus() {
    if (searchIsVisible()) {
      searchWideWrapper.querySelector('input[type="search"]').focus();
    } else {
      searchWideButton.focus();
    }
  }

  function toggleSearchVisibility(visibility) {
    searchWideButton.setAttribute('aria-expanded', visibility === true);
    searchWideWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });

    if (visibility === true) {
      searchWideWrapper.classList.add('is-active');
    } else {
      searchWideWrapper.classList.remove('is-active');
    }
  }

  drupalSettings.olivero.toggleSearchVisibility = toggleSearchVisibility;

  document.addEventListener('click', function (e) {
    if (e.target.matches('.js-header-nav__search-button, .js-header-nav__search-button *')) {
      toggleSearchVisibility(!searchIsVisible());
    } else if (searchIsVisible() && !e.target.matches('.js-search-wide__wrapper, .js-search-wide__wrapper *')) {
      toggleSearchVisibility(false);
    }
  });
})();