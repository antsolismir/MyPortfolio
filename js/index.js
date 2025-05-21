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
    const $modal = $("#modal");
    const $checkbox = $(".invisible-checkbox");
    const $closeModal = $(".modal .close");

    // Abre el modal cuando el checkbox se marca
    $checkbox.on("change", function () {
        if ($(this).is(":checked")) {
            $modal.addClass("show"); // Agrega la clase para mostrar el modal con animación
        } else {
            $modal.removeClass("show"); // Elimina la clase para ocultar el modal
        }
    });

    // Cierra el modal al hacer clic en el botón de cierre
    $closeModal.on("click", function () {
        $modal.removeClass("show"); // Oculta el modal
        $checkbox.prop("checked", false); // Desmarca el checkbox
    });

    // Cierra el modal al hacer clic fuera del contenido
    $(window).on("click", function (e) {
        if ($(e.target).is($modal)) {
            $modal.removeClass("show"); // Oculta el modal
            $checkbox.prop("checked", false); // Desmarca el checkbox
        }
    });
});

$(document).ready(function () {
    function isRightColumnScrolledToEnd() {
        const $rightColumn = $('.right-column');
        // scrollTop: desplazamiento actual
        // innerHeight: altura visible
        // scrollHeight: altura total del contenido
        return Math.ceil($rightColumn.scrollTop() + $rightColumn.innerHeight()) >= $rightColumn[0].scrollHeight;
    }
    
    // Ejemplo de uso:
    $('.right-column').on('scroll', function() {
        if (isRightColumnScrolledToEnd()) {
            console.log('¡Has llegado al final de right-column!');
            // Aquí puedes ejecutar la acción que desees
        }
    });
});
