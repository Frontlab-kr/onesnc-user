$(document).ready(function () {
	//header
	$("#menuToggle").on("change", function () {
		if ($(this).is(":checked")) {
			$("html").addClass("scrollNone");
			$(".kcraedu").addClass("kcraedu--menu");
		} else {
			$("html").removeClass("scrollNone");
			$(".kcraedu").removeClass("kcraedu--menu");
		}
	});

	$(document).on("click", ".header__gnb-item > a", function () {
		if ($(this).parents(".header__gnb-item").hasClass("active")) {
			$(".header__gnb-item").removeClass("active");
		} else {
			$(".header__gnb-item").removeClass("active");
			$(this).parents(".header__gnb-item").toggleClass("active");
		}
		//$(this).parents(".header__gnb-item.active").sibling(".header__gnb-item").removeClass("active");

		if ($(".header__navbar").css("display") == "flex") {
			return false;
		}
	});
	// $(".header__gnb-item").hover(
	// 	function () {
	// 		// over
	// 		$("header").addClass("active");
	// 	},
	// 	function () {
	// 		// out
	// 	}
	// );
	// $("header").hover(
	// 	function () {
	// 		// over
	// 	},
	// 	function () {
	// 		// out
	// 		$("header").removeClass("active");
	// 	}
	// );

	//toggle
	$(document).on("click", ".btn-toggle", function () {
		var target = $(this).attr("href");
		$(target).toggleClass("d-none");
	});

	//modal
	$(document).on("click", ".kcraedu-modal__title button", function () {
		$(this).parents(".kcraedu-modal").remove();
		if ($(".kcraedu-modal").length === 0) {
			$(".kcraedu-modal__area").remove();
		}
	});

	//학습창
	$(".btn-toggle-close").on("click", function () {
		$(".education").toggleClass("fold");
	});
	$(".education-nav__toggle, .btn-toggle-open").on("click", function () {
		$(".education").removeClass("fold");
	});
});

//print
function printModal(t) {
	const section = $("body");
	const modalBody = $(t).clone();

	const content = $(".kcraedu").detach();
	section.append(modalBody);
	window.print();
	section.empty();
	section.append(content);
	$(".modal").modal("hide");
	//$(t).append(modalBody);
}
