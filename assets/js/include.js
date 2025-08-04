(function () {
  function includeHTML(callback) {
    const elements = document.querySelectorAll('[include-html]');
    let remaining = elements.length;

    if (remaining === 0) {
      callback?.();
      return;
    }

    elements.forEach((elmnt) => {
      const file = elmnt.getAttribute('include-html');
      if (!file) {
        if (--remaining === 0) callback?.();
        return;
      }

      fetch(file)
        .then((response) => (response.ok ? response.text() : 'Page not found.'))
        .then((data) => {
          if (
            elmnt.parentNode.tagName === 'HEAD' ||
            document.head.contains(elmnt)
          ) {
            const temp = document.createElement('div');
            temp.innerHTML = data;
            [...temp.children].forEach((child) => {
              document.head.appendChild(child);
            });
            elmnt.remove();
          } else {
            elmnt.innerHTML = data;
            elmnt.removeAttribute('include-html');
          }
        })
        .finally(() => {
          // 모든 include 완료 후 다시 검사
          if (--remaining === 0) {
            // 포함된 파일에 또 include-html이 있는지 다시 확인
            // 잠시 defer하여 DOM 반영 기다림
            setTimeout(() => {
              if (document.querySelector('[include-html]')) {
                includeHTML(callback); // 재귀 호출
              } else {
                callback?.(); // 최종 콜백
              }
            }, 0);
          }
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    includeHTML(function () {
      $(document).on('click', '.one-header-menu__toggle', function () {
        $('html').toggleClass('active-menu');
      });
    });
  });
})();
