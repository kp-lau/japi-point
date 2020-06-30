(function () {
  setTimeout(function () {
    var btn = document.querySelectorAll('.btn.lang');

    btn.forEach(function (x) {
      x.addEventListener('click', function(y) {
        var target = y.target.textContent.toLowerCase();

        document.querySelectorAll('.album.py-5').forEach(function(m) {
          m.classList.add('hidden');
        });

        var el = document.querySelector('.album.block-' + target);

        if (el) {
          el.classList.remove('hidden');
        }
      });
    });
  }, 1000);

})();
