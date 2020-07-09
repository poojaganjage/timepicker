/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal) {
  var indentedComments = document.querySelectorAll('.js-comments .js-indented');

  document.querySelectorAll('.js-comment').forEach(function (comment) {
    if (comment.nextElementSibling != null && comment.nextElementSibling.matches('.js-indented')) {
      comment.classList.add('has-children');
    }
  });

  indentedComments.forEach(function (commentGroup) {
    var showHideWrapper = document.createElement('div');
    showHideWrapper.setAttribute('class', 'show-hide-wrapper');

    var toggleCommentsBtn = document.createElement('button');
    toggleCommentsBtn.setAttribute('type', 'button');
    toggleCommentsBtn.setAttribute('aria-expanded', 'true');
    toggleCommentsBtn.setAttribute('class', 'show-hide-btn');
    toggleCommentsBtn.innerText = Drupal.t('Replies');

    commentGroup.parentNode.insertBefore(showHideWrapper, commentGroup);
    showHideWrapper.appendChild(toggleCommentsBtn);

    toggleCommentsBtn.addEventListener('click', function (e) {
      commentGroup.classList.toggle('hidden');
      e.currentTarget.setAttribute('aria-expanded', commentGroup.classList.contains('hidden') ? 'false' : 'true');
    });
  });
})(Drupal);