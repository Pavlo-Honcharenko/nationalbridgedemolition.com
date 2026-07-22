var nextImgSrc = "none",
  prevImgSrc = "none",
  nextImgType = "none",
  prevImgType = "none",
  currentImgIndex = null;

galleryPopupClose = function () {
  $(".gallery__overlay").removeClass("active");
  $(".gallery__big-img").attr("src", "");
  currentImgIndex = null;
};

var setPopupType = function (type) {
  $(".gallery__popup").removeClass("before after");
  if ("before" === type) {
    $(".gallery__popup").addClass("before");
  } else if ("after" === type) {
    $(".gallery__popup").addClass("after");
  }
};

getSrc = function (index) {
  currentImgIndex = index;

  var nextImg = document.querySelector(`img[data-img="${index + 1}"]`);
  var prevImg = document.querySelector(`img[data-img="${index - 1}"]`);

  if (nextImg) {
    nextImgSrc = nextImg.getAttribute("src");
    nextImgType = nextImg.parentElement.classList.contains("before")
      ? "before"
      : nextImg.parentElement.classList.contains("after")
      ? "after"
      : "none";
  } else {
    nextImgSrc = "none";
    nextImgType = "none";
  }

  if (prevImg) {
    prevImgSrc = prevImg.getAttribute("src");
    prevImgType = prevImg.parentElement.classList.contains("before")
      ? "before"
      : prevImg.parentElement.classList.contains("after")
      ? "after"
      : "none";
  } else {
    prevImgSrc = "none";
    prevImgType = "none";
  }

  nextImg ? $(".gallery__next").show() : $(".gallery__next").hide();
  prevImg ? $(".gallery__prev").show() : $(".gallery__prev").hide();

  return prevImgType;
};

$(document).ready(function () {
  if (window.innerWidth >= 480) {
    $(".gallery img").on("click", function (e) {
      var imgEl = e.target;
      var imgIndex = Number(imgEl.getAttribute("data-img"));
      var type = imgEl.parentElement.classList.contains("before")
        ? "before"
        : imgEl.parentElement.classList.contains("after")
        ? "after"
        : "none";

      setPopupType(type);
      $(".gallery__overlay").addClass("active");
      $(".gallery__big-img").attr("src", imgEl.src);
      getSrc(imgIndex);
    });

    $(".gallery__next").on("click", function () {
      if ("none" != nextImgSrc && null !== currentImgIndex) {
        $(".gallery__big-img").attr("src", nextImgSrc);
        setPopupType(nextImgType);
        getSrc(currentImgIndex + 1);
      }
    });

    $(".gallery__prev").on("click", function () {
      if ("none" != prevImgSrc && null !== currentImgIndex) {
        $(".gallery__big-img").attr("src", prevImgSrc);
        setPopupType(prevImgType);
        getSrc(currentImgIndex - 1);
      }
    });

    $(document).on("keydown", function (e) {
      if (27 === e.keyCode) {
        galleryPopupClose();
      } else if (39 === e.keyCode && "none" != nextImgSrc && null !== currentImgIndex) {
        $(".gallery__big-img").attr("src", nextImgSrc);
        setPopupType(nextImgType);
        getSrc(currentImgIndex + 1);
      } else if (37 === e.keyCode && "none" != prevImgSrc && null !== currentImgIndex) {
        $(".gallery__big-img").attr("src", prevImgSrc);
        setPopupType(prevImgType);
        getSrc(currentImgIndex - 1);
      }
    });

    $(".gallery__close").on("click", galleryPopupClose);
    $(".gallery__overlay").on("click", function (e) {
      "DIV" === e.target.nodeName && galleryPopupClose();
    });
  }
});
