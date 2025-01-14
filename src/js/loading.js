$(window).on('load', function () {
    $('main').css('display', 'grid');
    fadeOutLoading();
    hideFade();

    function fadeOutLoading() {
          $('#loading').fadeOut();
    }

    const hideFade = async () => {
        const fadeOutLoading = await fadeOutLoading();

        $('#loading').css('display', 'none');
    }
}) 