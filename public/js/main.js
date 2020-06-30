(function () {
  setTimeout(function () {
    var btn = document.querySelectorAll('.btn.lang');

    btn.forEach(function (x) {
      x.addEventListener('click', function(y) {
        var target = y.target;
        var name = target.textContent.toLowerCase();

        btn.forEach(function(n) { n.classList.remove('active') });
        target.classList.add('active');

        // Toggle Ablums
        document.querySelectorAll('.album.py-5').forEach(function(m) {
          m.classList.add('hidden');
        });
        var el = document.querySelector('.album.block-' + name);
        if (el) {
          el.classList.remove('hidden');
        }
      });
    });

    // btn[2].click();
  }, 500);

})();
