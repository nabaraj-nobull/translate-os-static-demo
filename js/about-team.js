(function () {
  var grid = document.querySelector('[data-team-grid]');
  if (!grid) return;

  var cards = grid.querySelectorAll('[data-team-card]');
  if (!cards.length) return;

  function setActive(card) {
    cards.forEach(function (c) {
      c.classList.toggle('is-active', c === card);
    });
  }

  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      setActive(card);
    });
    card.addEventListener('click', function () {
      setActive(card);
    });
    card.addEventListener('focusin', function () {
      setActive(card);
    });
  });

  grid.addEventListener('mouseleave', function () {
    var featured = grid.querySelector('.team-card--featured');
    setActive(featured || cards[0]);
  });
})();
