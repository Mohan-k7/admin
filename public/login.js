$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/admin/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                // Handle successful login
            },
            error: function(error) {
                // Handle login error
            }
        });
    });
});
