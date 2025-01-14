document.addEventListener('DOMContentLoaded', function () {
    var hideFade;

    $('main').css('display', 'grid');

    hideFade = async () => {
        await checkParsingDone();
        await fadeOutLoading();

        $('#loading').css('display', 'none');
    }

    function fadeOutLoading() {
        return new Promise((resolve) => {
            $('#loading').fadeOut(resolve);
        });
    }

    function checkParsingDone() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (parsingDone) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200); // Check every 100ms
        });
    }

    hideFade();
})