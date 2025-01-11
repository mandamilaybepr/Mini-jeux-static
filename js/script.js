
    document.addEventListener('DOMContentLoaded', function () {
        particleground(document.getElementById('particles'), {
          dotColor: '#5cbdaa',
          lineColor: '#5cbdaa'
        });
        var intro = document.getElementById('intro');
        intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
      }, false);
      
      


const diversifiedColors = [
    '#F8D7D5',
    '#F1E0D6',
    '#C7E1F4',
    '#A8D7E7',
    '#D3E4B8',
    '#F4E1A1',
    '#FFB3B3',
    '#E9C8F9',
    '#FFE2B5',
    '#D4F7B0',
    '#FFBBAE',
    '#B4D9B3',
    '#A5B9D9',
    '#D2B4DE',
    '#F2D9B3',
    '#FFE9A4'
];

let currentColorIndex = 0;

let shadowColor = diversifiedColors[currentColorIndex];

function changeShadowColor() {
    shadowColor = diversifiedColors[currentColorIndex];

    $('.square').each(function() {
        var $square = $(this);
        var shadow = $square.css('box-shadow');
        var newShadow = shadow.replace(/rgba\(0, 0, 0, 0.5\)/, shadowColor);
        $square.css({
            'box-shadow': newShadow,
            'transition': 'box-shadow 2s ease'
        });
    });

    currentColorIndex = (currentColorIndex + 1) % diversifiedColors.length;
}

setInterval(changeShadowColor, 4000);

changeShadowColor();

$(document).mousemove(function(event) {
    var x = event.clientX;
    var y = event.clientY;

    function updateShadows() {
        $('.square').each(function() {
            var $square = $(this);
            var rect = $square[0].getBoundingClientRect();
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;
            var deltaX = x - centerX;
            var deltaY = y - centerY;
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            var angle = Math.atan2(deltaY, deltaX);
            var shadowX = Math.cos(angle) * distance / 30;
            var shadowY = Math.sin(angle) * distance / 30;

            $square.css({
                'box-shadow': shadowX + 'px ' + shadowY + 'px 20px ' + shadowColor,
                'transition': 'box-shadow 0.1s ease'
            });
        });
    }

    requestAnimationFrame(updateShadows);
});

$('.square').click(function() {
    var game = $(this).data('game');
    $('#overlay').fadeIn(300);
    $('.container').css('filter', 'blur(30px)');
});

$('#closeOverlay').click(function() {
    $('.container').css('filter', 'none');
});

$(document).ready(function() {
    var gameIcons = {
        memory: 'pic/memory.png',
        hangman: 'pic/hangman.png',
        simon: 'pic/simon.png',
        game_2048: 'pic/2048.png',
        snake: 'pic/snake.png',
        tetris: 'pic/tetris.png'
    };

    $('.square').each(function(index) {
        var gameType = $(this).data('game');
        var iconUrl = gameIcons[gameType];
        $(this).append('<img src="' + iconUrl + '" alt="' + gameType + '">');
    });
});

$(document).ready(function() {
    $('.square').click(function() {
        var game = $(this).data('game');
        $('#overlay').fadeIn(300);
        loadGame(game);
    });

    $('#closeOverlay').click(function() {
        $('#overlay').fadeOut(300);
        $('#gameContainer').empty();

    });

    function loadGame(game) {
        switch (game) {
            case 'memory':
                $('#gameContainer').load('memory.html');
                break;
            case 'hangman':
                $('#gameContainer').load('hangman.html');
                break;
            case 'simon':
                $('#gameContainer').load('simon.html');
                break;
            case 'game_2048':
                $('#gameContainer').load('game_2048.html');
                break;
            case 'snake':
                $('#gameContainer').load("snake.html");
                break;
            case 'tetris':
                $('#gameContainer').load("js/tetris/tetris.html");
                 break;
                
               
            default:
                console.log('Jeu non pris en charge');
                break;
        }
    }
    
});
