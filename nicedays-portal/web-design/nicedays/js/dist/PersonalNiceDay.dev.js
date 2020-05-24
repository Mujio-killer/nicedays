"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Source Themes Academic v4.2.5 | https://sourcethemes.com/academic/ */
(function ($) {
  var $navbar = $(".navbar");
  var navbar_offset = $navbar.innerHeight();

  function scrollToAnchor(target) {
    target = typeof target === "undefined" || _typeof(target) === "object" ? window.location.hash : target;
    target = target.replace(/:/g, "\\:");

    if ($(target).length) {
      $("body").addClass("scrolling");
      $("html, body").animate({
        scrollTop: $(target).offset().top - navbar_offset
      }, 600, function () {
        $("body").removeClass("scrolling");
      });
    }
  }

  function fixScrollspy() {
    var $body = $("body");
    var data = $body.data("bs.scrollspy");

    if (data) {
      data._config.offset = navbar_offset;
      $body.data("bs.scrollspy", data);
      $body.scrollspy("refresh");
    }
  }

  window.addEventListener("hashchange", scrollToAnchor); // 点击切换页面跳转

  $("#navbar-main li.nav-item a.nav-link").on("click", function (event) {
    var hash = this.hash;

    if (hash && $(hash).length && $("#homepage").length > 0) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $(hash).offset().top - navbar_offset
      }, 800);
    }
  });
  $("#back_to_top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 800, function () {
      window.location.hash = "";
    });
  });
  $(document).on("click", ".navbar-collapse.show", function (e) {
    var targetElement = $(e.target).is("a") ? $(e.target) : $(e.target).parent();

    if (targetElement.is("a") && targetElement.attr("class") != "dropdown-toggle") {
      $(this).collapse("hide");
    }
  });
  var pubFilters = {};
  var searchRegex;
  var filterValues;
  var $grid_pubs = $("#container-publications");
  $grid_pubs.isotope({
    itemSelector: ".isotope-item",
    percentPosition: true,
    masonry: {
      columnWidth: ".grid-sizer"
    },
    filter: function filter() {
      var $this = $(this);
      var searchResults = searchRegex ? $this.text().match(searchRegex) : true;
      var filterResults = filterValues ? $this.is(filterValues) : true;
      return searchResults && filterResults;
    }
  });
  var $quickSearch = $(".filter-search").keyup(debounce(function () {
    searchRegex = new RegExp($quickSearch.val(), "gi");
    $grid_pubs.isotope();
  }));

  function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
      clearTimeout(timeout);
      var args = arguments;

      var _this = this;

      function delayed() {
        fn.apply(_this, args);
      }

      timeout = setTimeout(delayed, threshold);
    };
  }

  function concatValues(obj) {
    var value = "";

    for (var prop in obj) {
      value += obj[prop];
    }

    return value;
  }

  $(".pub-filters").on("change", function () {
    var $this = $(this);
    var filterGroup = $this[0].getAttribute("data-filter-group");
    pubFilters[filterGroup] = this.value;
    filterValues = concatValues(pubFilters);
    $grid_pubs.isotope();

    if (filterGroup == "pubtype") {
      var url = $(this).val();

      if (url.substr(0, 9) == ".pubtype-") {
        window.location.hash = url.substr(9);
      } else {
        window.location.hash = "";
      }
    }
  });

  function filter_publications() {
    var urlHash = window.location.hash.replace("#", "");
    var filterValue = "*";

    if (urlHash != "" && !isNaN(urlHash)) {
      filterValue = ".pubtype-" + urlHash;
    }

    var filterGroup = "pubtype";
    pubFilters[filterGroup] = filterValue;
    filterValues = concatValues(pubFilters);
    $grid_pubs.isotope();
    $(".pubtype-select").val(filterValue);
  }

  function initMap() {
    if ($("#map").length) {
      var map_provider = $("#map-provider").val();
      var lat = $("#map-lat").val();
      var lng = $("#map-lng").val();
      var zoom = parseInt($("#map-zoom").val());
      var address = $("#map-dir").val();
      var api_key = $("#map-api-key").val();

      if (map_provider == 1) {
        var map = new GMaps({
          div: "#map",
          lat: lat,
          lng: lng,
          zoom: zoom,
          zoomControl: true,
          zoomControlOpt: {
            style: "SMALL",
            position: "TOP_LEFT"
          },
          panControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          overviewMapControl: false,
          scrollwheel: true,
          draggable: true
        });
        map.addMarker({
          lat: lat,
          lng: lng,
          click: function click(e) {
            var url = "https://www.google.com/maps/place/" + encodeURIComponent(address) + "/@" + lat + "," + lng + "/";
            window.open(url, "_blank");
          },
          title: address
        });
      } else {
        var _map = new L.map("map").setView([lat, lng], zoom);

        if (map_provider == 3 && api_key.length) {
          L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: api_key
          }).addTo(_map);
        } else {
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(_map);
        }

        var marker = L.marker([lat, lng]).addTo(_map);
        var url = lat + "," + lng + "#map=" + zoom + "/" + lat + "/" + lng + "&layers=N";
        marker.bindPopup(address + '<p><a href="https://www.openstreetmap.org/directions?engine=osrm_car&route=' + url + '">Routing via OpenStreetMap</a></p>');
      }
    }
  }

  function printLatestRelease(selector, repo) {
    $.getJSON("https://api.github.com/repos/" + repo + "/tags").done(function (json) {
      var release = json[0];
      $(selector).append(release.name);
    }).fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
  }

  function toggleSearchDialog() {
    if ($("body").hasClass("searching")) {
      $("[id=search-query]").blur();
      $("body").removeClass("searching");
    } else {
      $("body").addClass("searching");
      $(".search-results").css({
        opacity: 0,
        visibility: "visible"
      }).animate({
        opacity: 1
      }, 200);
      $("#search-query").focus();
    }
  }

  function toggleDarkMode(codeHlEnabled, codeHlLight, codeHlDark) {
    if ($("body").hasClass("dark")) {
      $("body").css({
        opacity: 0,
        visibility: "visible"
      }).animate({
        opacity: 1
      }, 500);
      $("body").removeClass("dark");

      if (codeHlEnabled) {
        codeHlLight.disabled = false;
        codeHlDark.disabled = true;
      }

      $(".js-dark-toggle i").removeClass("fa-sun").addClass("fa-moon");
      localStorage.setItem("dark_mode", "0");
    } else {
      $("body").css({
        opacity: 0,
        visibility: "visible"
      }).animate({
        opacity: 1
      }, 500);
      $("body").addClass("dark");

      if (codeHlEnabled) {
        codeHlLight.disabled = true;
        codeHlDark.disabled = false;
      }

      $(".js-dark-toggle i").removeClass("fa-moon").addClass("fa-sun");
      localStorage.setItem("dark_mode", "1");
    }
  }

  $(document).ready(function () {
    var default_mode = 0;

    if ($("body").hasClass("dark")) {
      default_mode = 1;
    }

    var dark_mode = parseInt(localStorage.getItem("dark_mode") || default_mode);
    var codeHlEnabled = $("link[title=hl-light]").length > 0;
    var codeHlLight = $("link[title=hl-light]")[0];
    var codeHlDark = $("link[title=hl-dark]")[0];

    if (dark_mode) {
      $("body").addClass("dark");

      if (codeHlEnabled) {
        codeHlLight.disabled = true;
        codeHlDark.disabled = false;
      }

      $(".js-dark-toggle i").removeClass("fa-moon").addClass("fa-sun");
    } else {
      $("body").removeClass("dark");

      if (codeHlEnabled) {
        codeHlLight.disabled = false;
        codeHlDark.disabled = true;
      }

      $(".js-dark-toggle i").removeClass("fa-sun").addClass("fa-moon");
    }

    $(".js-dark-toggle").click(function (e) {
      e.preventDefault();
      toggleDarkMode(codeHlEnabled, codeHlLight, codeHlDark);
    });
  });
  $(window).on("load", function () {
    if (window.location.hash) {
      if (window.location.hash == "#top") {
        window.location.hash = "";
      } else if (!$(".projects-container").length) {
        scrollToAnchor();
      }
    }

    var $body = $("body");
    $body.scrollspy({
      offset: navbar_offset
    });
    var resizeTimer;
    $(window).resize(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixScrollspy, 200);
    });
    $(".projects-container").each(function (index, container) {
      var $container = $(container);
      var $section = $container.closest("section");
      var layout;

      if ($section.find(".isotope").hasClass("js-layout-row")) {
        layout = "fitRows";
      } else {
        layout = "masonry";
      }

      $container.imagesLoaded(function () {
        $container.isotope({
          itemSelector: ".isotope-item",
          layoutMode: layout,
          masonry: {
            gutter: 20
          },
          filter: $section.find(".default-project-filter").text()
        });
        $section.find(".project-filters a").click(function () {
          var selector = $(this).attr("data-filter");
          $container.isotope({
            filter: selector
          });
          $(this).removeClass("active").addClass("active").siblings().removeClass("active all");
          return false;
        });

        if (window.location.hash) {
          scrollToAnchor();
        }
      });
    });

    if ($(".pub-filters-select")) {
      filter_publications();
    }

    $(".js-cite-modal").click(function (e) {
      e.preventDefault();
      var filename = $(this).attr("data-filename");
      var modal = $("#modal");
      modal.find(".modal-body code").load(filename, function (response, status, xhr) {
        if (status == "error") {
          var msg = "Error: ";
          $("#modal-error").html(msg + xhr.status + " " + xhr.statusText);
        } else {
          $(".js-download-cite").attr("href", filename);
        }
      });
      modal.modal("show");
    });
    $(".js-copy-cite").click(function (e) {
      e.preventDefault();
      var range = document.createRange();
      var code_node = document.querySelector("#modal .modal-body");
      range.selectNode(code_node);
      window.getSelection().addRange(range);

      try {
        document.execCommand("copy");
      } catch (e) {
        console.log("Error: citation copy failed.");
      }

      window.getSelection().removeRange(range);
    });
    initMap();
    $("#TableOfContents > ul > li > ul").unwrap().unwrap();
    if ($("#academic-release").length > 0) printLatestRelease("#academic-release", $("#academic-release").data("repo"));
    $(".js-search").click(function (e) {
      e.preventDefault();
      toggleSearchDialog();
    });
    $(document).on("keydown", function (e) {
      if (e.which == 27) {
        if ($("body").hasClass("searching")) {
          toggleSearchDialog();
        }
      } else if (e.which == 191 && e.shiftKey == false && !$("input,textarea").is(":focus")) {
        e.preventDefault();
        toggleSearchDialog();
      }
    });
  });
})(jQuery);

var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  tokenize: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [{
    name: "title",
    weight: 0.99
  }, {
    name: "summary",
    weight: 0.6
  }, {
    name: "authors",
    weight: 0.5
  }, {
    name: "content",
    weight: 0.2
  }, {
    name: "tags",
    weight: 0.5
  }, {
    name: "categories",
    weight: 0.5
  }]
};
var summaryLength = 60;

function getSearchQuery(name) {
  return decodeURIComponent((location.search.split(name + "=")[1] || "").split("&")[0]).replace(/\+/g, " ");
}

function updateURL(url) {
  if (history.pushState) {
    window.history.pushState({
      path: url
    }, "", url);
  }
}

function initSearch(force, fuse) {
  var query = $("#search-query").val();

  if (query.length < 1) {
    $("#search-hits").empty();
  }

  if (!force && query.length < fuseOptions.minMatchCharLength) return;
  $("#search-hits").empty();
  searchAcademic(query, fuse);
  var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(query) + window.location.hash;
  updateURL(newURL);
}

function searchAcademic(query, fuse) {
  var results = fuse.search(query);

  if (results.length > 0) {
    $("#search-hits").append('<h3 class="mt-0">' + results.length + " " + i18n.results + "</h3>");
    parseResults(query, results);
  } else {
    $("#search-hits").append('<div class="search-no-results">' + i18n.no_results + "</div>");
  }
}

function parseResults(query, results) {
  $.each(results, function (key, value) {
    var content = value.item.content;
    var snippet = "";
    var snippetHighlights = [];

    if (fuseOptions.tokenize) {
      snippetHighlights.push(query);
    } else {
      $.each(value.matches, function (matchKey, matchValue) {
        if (matchValue.key == "content") {
          var start = matchValue.indices[0][0] - summaryLength > 0 ? matchValue.indices[0][0] - summaryLength : 0;
          var end = matchValue.indices[0][1] + summaryLength < content.length ? matchValue.indices[0][1] + summaryLength : content.length;
          snippet += content.substring(start, end);
          snippetHighlights.push(matchValue.value.substring(matchValue.indices[0][0], matchValue.indices[0][1] - matchValue.indices[0][0] + 1));
        }
      });
    }

    if (snippet.length < 1) {
      snippet += content.substring(0, summaryLength * 2);
    }

    var template = $("#search-hit-fuse-template").html();
    var content_key = value.item.section;

    if (content_key in content_type) {
      content_key = content_type[content_key];
    }

    var templateData = {
      key: key,
      title: value.item.title,
      type: content_key,
      relpermalink: value.item.relpermalink,
      snippet: snippet
    };
    var output = render(template, templateData);
    $("#search-hits").append(output);
    $.each(snippetHighlights, function (hlKey, hlValue) {
      $("#summary-" + key).mark(hlValue);
    });
  });
}

function render(template, data) {
  var key, find, re;

  for (key in data) {
    find = "\\{\\{\\s*" + key + "\\s*\\}\\}";
    re = new RegExp(find, "g");
    template = template.replace(re, data[key]);
  }

  return template;
}

if (typeof Fuse === "function") {
  $.getJSON(search_index_filename, function (search_index) {
    var fuse = new Fuse(search_index, fuseOptions);

    if (query = getSearchQuery("q")) {
      $("body").addClass("searching");
      $(".search-results").css({
        opacity: 0,
        visibility: "visible"
      }).animate({
        opacity: 1
      }, 200);
      $("#search-query").val(query);
      $("#search-query").focus();
      initSearch(true, fuse);
    }

    $("#search-query").keyup(function (e) {
      clearTimeout($.data(this, "searchTimer"));

      if (e.keyCode == 13) {
        initSearch(true, fuse);
      } else {
        $(this).data("searchTimer", setTimeout(function () {
          initSearch(false, fuse);
        }, 250));
      }
    });
  });
}