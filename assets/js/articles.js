document.addEventListener("DOMContentLoaded", function () {

    const tocBox = document.querySelector(".article-toc-box");
    const tocToggle = document.querySelector(".article-toc-toggle");

    if (!tocBox || !tocToggle) {
        return;
    }

    tocToggle.addEventListener("click", function () {

        const isOpen = tocBox.classList.toggle("active");

        tocToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

	
    /*==================================
    SMOOTH SCROLL
    ==================================*/

    document.querySelectorAll(".article-toc-content a").forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerOffset =
                window.innerWidth <= 480 ? 82 :
                window.innerWidth <= 768 ? 90 :
                110;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerOffset;

			    window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            /* بستن فهرست بعد از انتخاب */
            tocBox.classList.remove("active");

            tocToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            history.replaceState(
                null,
                "",
                targetId
            );

        });

    });

});