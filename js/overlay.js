$(document).ready(function() {
    $('.square').on('click', function() {
        var gameType = $(this).data('game');
        $('#game-overlay').fadeIn();
        loadGame(gameType);
    });

    $('#close-game').on('click', function() {
        $('#game-overlay').fadeOut();
    });

    function loadGame(gameType) {
        $('.game-content').empty();
        var script = document.createElement('script');
        script.src = 'games/' + gameType + '.js';
        document.body.appendChild(script);
    }
});
