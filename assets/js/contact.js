/*==================================================
BARGIIN
CONTACT.JS
EITAA FORM
==================================================*/

(function () {

    "use strict";


    const form =
        document.querySelector("#contactForm");


    if (!form) {
        return;
    }


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    const status =
        document.querySelector(
            "#contactStatus"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.classList.add(
                    "loading"
                );

            }


            if (status) {

                status.textContent =
                    "در حال ارسال پیام...";

                status.className =
                    "contact-status";

            }


            try {

                const formData =
                    new FormData(form);


                const response =
                    await fetch(
                        "api/send-message.php",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok || !result.success) {

                    throw new Error(
                        result.message ||
                        "ارسال پیام انجام نشد."
                    );

                }


                if (status) {

                    status.textContent =
                        "پیام شما با موفقیت ارسال شد 🌿";

                    status.className =
                        "contact-status success";

                }


                form.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (status) {

                    status.textContent =
                        error.message ||
                        "خطایی در ارسال پیام رخ داد.";

                    status.className =
                        "contact-status error";

                }

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.classList.remove(
                        "loading"
                    );

                }

            }

        }
    );

})();