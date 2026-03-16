$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);

    // Custom multi-level TOC init (replaces Toc.init which only supports 2 levels)
    // (function buildToc($nav) {
    //   $nav.attr("data-toggle", "toc");
    //   var $scope = $("#markdown-content").length ? $("#markdown-content") : $("body");

    //   // Find the top-most heading level present
    //   var topLevel = 6;
    //   for (var i = 1; i <= 6; i++) {
    //     if ($scope.find("h" + i).not("[data-toc-skip]").length > 0) {
    //       topLevel = i;
    //       break;
    //     }
    //   }

    //   // Collect all headings from topLevel down to h6
    //   var selectors = [];
    //   for (var i = topLevel; i <= 6; i++) selectors.push("h" + i);
    //   var $headings = $scope.find(selectors.join(",")).not("[data-toc-skip]");
    //   if ($headings.length === 0) return;

    //   var $rootList = $('<ul class="nav navbar-nav"></ul>');
    //   $nav.append($rootList);

    //   // Stack tracks nesting: [{level, $list}]
    //   var stack = [{ level: topLevel - 1, $list: $rootList }];

    //   $headings.each(function () {
    //     var $h = $(this);
    //     var level = parseInt(this.tagName[1], 10);

    //     // Ensure heading has an id for anchor links
    //     if (!this.id) {
    //       var base = $h.text().trim().toLowerCase()
    //         .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
    //         .substring(0, 64).replace(/^-+|-+$/g, "") || this.tagName.toLowerCase();
    //       var id = base, n = 1;
    //       while (document.getElementById(id)) id = base + "-" + n++;
    //       this.id = id;
    //     }

    //     // Pop stack until parent level is less than current level
    //     while (stack.length > 1 && stack[stack.length - 1].level >= level) {
    //       stack.pop();
    //     }

    //     var $a = $('<a class="nav-link"></a>')
    //       .attr("href", "#" + this.id)
    //       .text($h.data("toc-text") || $h.text());
    //     var $li = $("<li></li>").append($a);
    //     stack[stack.length - 1].$list.append($li);

    //     // Prepare a child list for potential sub-headings
    //     var $childList = $('<ul class="nav navbar-nav"></ul>');
    //     $li.append($childList);
    //     stack.push({ level: level, $list: $childList });
    //   });

    //   // Remove empty lists
    //   $nav.find("ul:empty").remove();
    // })($myNav);

    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
