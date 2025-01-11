
$(document).ready(function() {
    const allImages = [
        'pic/ananas.png', 'pic/orange.png', 'pic/passion.png', 'pic/banane.png',
        'pic/amande.png', 'pic/cerise.png', 'pic/fraise.png', 'pic/bartlett.png',
        'pic/melon.png', 'pic/poire.png', 'pic/kiwi.png', 'pic/pasteque.png',
        'pic/raisin.png', 'pic/pomme.png', 'pic/mangue.png', 'pic/citron.png'
    ];
    

    let cards = [];
    let flippedCards = [];
    let matchedCards = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initGame() {
        const difficulty = $('input[name="difficulty"]:checked').val();
        let pairsCount;
    
        if (difficulty === 'easy') pairsCount = 8;
        else if (difficulty === 'medium') pairsCount = 12;
        else pairsCount = 16;
    
        cards = allImages.slice(0, pairsCount).concat(allImages.slice(0, pairsCount));
        shuffle(cards);
    
        matchedCards = 0;
        flippedCards = [];
    
        $('#memoryBoard').empty();
        cards.forEach((img, index) => {
            const cardElement = $('<div class="memory-card"></div>')
                .data('index', index)
                .appendTo('#memoryBoard');
            cardElement.append('<img src="' + img + '" alt="memory image" style="display:none;">');
            cardElement.on('click', flipCard);
        });
    
        adjustBoardSize(pairsCount);
    }
    
   
    

    function adjustBoardSize(pairsCount) {
        const boardSize = pairsCount > 8 ? '600px' : '400px';
        $('#memoryBoard').css('width', boardSize);
    }

    function flipCard() {
        const card = $(this);
        const img = card.find('img');

        if (flippedCards.length < 2 && !card.hasClass('flipped') && flippedCards.indexOf(card[0]) === -1) {
            card.addClass('flipped');
            img.show();

            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.find('img').attr('src');
        const img2 = card2.find('img').attr('src');

        if (img1 === img2) {
            matchedCards += 2;
            if (matchedCards === cards.length) {
                alert('Vous avez gagné !');
                setTimeout(initGame, 1000);
            }
        } else {
            setTimeout(() => {
                card1.removeClass('flipped').find('img').hide();
                card2.removeClass('flipped').find('img').hide();
            }, 1000);
        }

        flippedCards = [];
    }

    $('#startGame').on('click', initGame);
});
