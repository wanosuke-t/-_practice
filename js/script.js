$(document).ready(function () {
  // ドロワーメニューの開閉
  const menuToggle = jQuery("#js-link-menu-drawer");
  const menuDrawer = jQuery("#js-menu-drawer");
  const header = jQuery(".header");

  // 📌 共通化した関数（メニューの位置を更新）
  function updateMenuPosition() {
    const rect = header[0].getBoundingClientRect();
    menuDrawer.css({
      top: rect.bottom + "px",
      left:
        menuToggle.offset().left -
        (menuDrawer.width() - menuToggle.width()) / 2 +
        "px",
    });
  }

  menuToggle.on("click", function (event) {
    event.stopPropagation(); // 他のクリックイベントを防ぐ

    updateMenuPosition(); // メニューの位置を設定
    menuDrawer.slideToggle();
  });

  // 外部クリックでメニューを閉じる
  $(document).on("click", function (event) {
    if (
      !menuDrawer.is(event.target) &&
      !menuToggle.is(event.target) &&
      !menuDrawer.has(event.target).length
    ) {
      menuDrawer.hide();
    }
  });

  // 📌 ウィンドウサイズ変更時に位置を更新
  $(window).on("resize", function () {
    if (menuDrawer.is(":visible")) {
      updateMenuPosition();
    }
  });

  // ページトップへ戻るボタン
  jQuery(".js-page-top").on("click", function () {
    jQuery("html, body").animate({ scrollTop: 0 }, 500);
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      jQuery(".js-page-top").fadeIn(300);
    } else {
      jQuery(".js-page-top").fadeOut(300);
    }
  });

  // モーダルで画像の拡大表示
  // 変数に要素を入れる
  const open = $(".js-menu-img");
  const container = $(".modal-container");

  //開くボタンをクリックしたらモーダルを表示する
  open.on("click", function () {
    const imgFile = $(this).attr("src");
    $(".modal-container img").attr("src", imgFile);
    container.addClass("active");
    $("body").addClass("is-fixed");

    return false;
  });

  //モーダルの外側をクリックしたらモーダルを閉じる
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".modal-body").length) {
      container.removeClass("active");
      $("body").removeClass("is-fixed");
    }
  });
});
