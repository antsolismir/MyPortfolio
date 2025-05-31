$(document).ready(function () {
    var lastId,
        topMenu = $("#mainNav"),
        topMenuHeight = topMenu.outerHeight() + 1,
        menuItems = topMenu.find("a"),
        scrollItems;

    function updateScrollItems() {
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
    }

    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // Inicializa scrollItems
    updateScrollItems();

    // Recalcula scrollItems al redimensionar la ventana
    $(window).resize(function () {
        topMenuHeight = topMenu.outerHeight() + 1; // Recalcula la altura del menú
        updateScrollItems();
    });

    $(".right-column").scroll(function () {
        var fromTop = $(this).scrollTop();

        var cur = scrollItems.map(function () {
            var sectionTop = $(this)[0].getBoundingClientRect().top;
            if (sectionTop < topMenuHeight && sectionTop + $(this).outerHeight() > 0) return this;
        });

        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

});

$(document).ready(function () {
    // Universidad de Sevilla
    const $modalUS = $("#modal");
    const $checkboxUS = $("#invisible-checkbox-us");
    const $closeModalUS = $("#modal .close");

    $checkboxUS.on("change", function () {
        if ($(this).is(":checked")) {
            $modalUS.addClass("show");
        } else {
            $modalUS.removeClass("show");
        }
    });

    $closeModalUS.on("click", function () {
        $modalUS.removeClass("show");
        $checkboxUS.prop("checked", false);
    });

    $(window).on("click", function (e) {
        if ($(e.target).is($modalUS)) {
            $modalUS.removeClass("show");
            $checkboxUS.prop("checked", false);
        }
    });
});

$(document).ready(function () {
    const $modalHarvard = $("#modal-harvard");
    const $checkboxHarvard = $("#invisible-checkbox-harvard");
    const $closeModalHarvard = $("#modal-harvard .close");

    $checkboxHarvard.on("change", function () {
        if ($(this).is(":checked")) {
            $modalHarvard.addClass("show");
        } else {
            $modalHarvard.removeClass("show");
        }
    });

    $closeModalHarvard.on("click", function () {
        $modalHarvard.removeClass("show");
        $checkboxHarvard.prop("checked", false);
    });

    $(window).on("click", function (e) {
        if ($(e.target).is($modalHarvard)) {
            $modalHarvard.removeClass("show");
            $checkboxHarvard.prop("checked", false);
        }
    });
});