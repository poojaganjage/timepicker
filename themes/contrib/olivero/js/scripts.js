/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  window.drupalSettings = window.drupalSettings || {};
  window.drupalSettings.olivero = window.drupalSettings.olivero || {};

  document.documentElement.classList.add('js');

  function isDesktopNav() {
    var navButtons = document.querySelector('.js-mobile-buttons');
    return window.getComputedStyle(navButtons).getPropertyValue('display') === 'none';
  }

  drupalSettings.olivero.isDesktopNav = isDesktopNav;

  var wideNavButton = document.querySelector('.js-nav-primary__button');
  var siteHeaderFixable = document.querySelector('.js-site-header__fixable');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-expanded') === 'true';
  }

  function showWideNav() {
    if (isDesktopNav()) {
      wideNavButton.setAttribute('aria-expanded', 'true');
      siteHeaderFixable.classList.add('is-expanded');
    }
  }

  function hideWideNav() {
    if (isDesktopNav()) {
      wideNavButton.setAttribute('aria-expanded', 'false');
      siteHeaderFixable.classList.remove('is-expanded');
    }
  }

  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    var fixables = document.querySelectorAll('.js-fixable');

    function toggleDesktopNavVisibility(entries) {
      if (!isDesktopNav()) return;

      entries.forEach(function (entry) {
        if (entry.intersectionRatio < 1) {
          fixables.forEach(function (el) {
            return el.classList.add('js-fixed');
          });
        } else {
          fixables.forEach(function (el) {
            return el.classList.remove('js-fixed');
          });
        }
      });
    }

    function getRootMargin() {
      var rootMarginTop = 72;
      var _document = document,
          body = _document.body;


      if (body.classList.contains('toolbar-fixed')) {
        rootMarginTop -= 39;
      }

      if (body.classList.contains('toolbar-horizontal') && body.classList.contains('toolbar-tray-open')) {
        rootMarginTop -= 40;
      }

      return rootMarginTop + 'px 0px 0px 0px';
    }

    function monitorNavPosition() {
      var primaryNav = document.querySelector('.js-site-header');
      var options = {
        rootMargin: getRootMargin(),
        threshold: [0.999, 1]
      };

      var observer = new IntersectionObserver(toggleDesktopNavVisibility, options);
      observer.observe(primaryNav);
    }

    wideNavButton.addEventListener('click', function () {
      if (!wideNavIsOpen()) {
        showWideNav();
      } else {
        hideWideNav();
      }
    });

    siteHeaderFixable.querySelector('.js-site-header__inner').addEventListener('focusin', showWideNav);

    document.querySelector('.js-skip-link').addEventListener('click', hideWideNav);

    monitorNavPosition();
  }

  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      if ('toggleSearchVisibility' in drupalSettings.olivero && 'searchIsVisible' in drupalSettings.olivero && drupalSettings.olivero.searchIsVisible()) {
        drupalSettings.olivero.toggleSearchVisibility(false);
      } else {
          hideWideNav();
        }
    }
  });
})();