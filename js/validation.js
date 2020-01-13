$(document).ready(function() {

    $('#first_form').submit(function(e) {
        e.preventDefault();
        var first_name = $('#first_name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        var isValidForm = validate(first_name, email, message);
        if (isValidForm) {
            $.post("https://locastic.com/api/v1/fe-dev", {
                    name: first_name,
                    email: email,
                    message: message
                })
                .done(function() {
                    alert("second success");
                })
                .fail(function(error) {
                    $('#first_form').after(`<span class='error'>404 ERROR  </span>`);

                });
        }

    });

    function validate(first_name, email, message) {
        $(".error").remove();
        var isValid = true;
        if (first_name.length < 1) {
            $('#first_name').after('<span class="error">This field is required</span>');
            isValid = false;
        }
        if (email === "") {
            $('#email').after('<span class="error">This field is required</span>');
            isValid = false;
        }
        if (message.length < 1) {
            $('#message').after('<span class="error">This field is required</span>');
            isValid = false;
        } else {

            if (!isValidEmailAddress(email)) {
                $('#email').after('<span class="error">Enter a valid email</span>');
                isValid = false;
            }
        }
        return isValid;
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }
});