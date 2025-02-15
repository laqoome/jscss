window.onload = function() {
    // ???? type="hidden" ? input ??
    document.querySelectorAll('input[type="hidden"]').forEach(function(element) {
        element.style.display = 'none';
    });

    // ????? 'form-group' ??? div ??
    document.querySelectorAll('.form-group').forEach(function(element) {
        element.style.display = 'none';
    });

    // ????
    document.querySelector('.btn').style.display = 'none';

    // ???? "SEARCH FOR A NEW DOMAIN NAME" ?????
    hideElementByText("SEARCH FOR A NEW DOMAIN NAME");
};