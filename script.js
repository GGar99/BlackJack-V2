$(document).ready(function() {
    let playerCards = [];
    let dealerCards = [];
    let playerScore = 0;
    let dealerScore = 0;
    let isPlayerTurn = false;
    let isGameInProgress = false;

function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    for (let card of cards) {
        if (card === 1) {
            aceCount++;
            score += 11;
        } else if (card > 10) {
            score += 10;
        } else {
            score += card;
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}


    function dealCard(hand, cards) {
        let card = Math.floor(Math.random() * 13) + 1;
        cards.push(card);
        hand.append(`<img src="cards/${card}.png" alt="Card">`);
        
        if (isPlayerTurn && card === 1) {
            $("#ace-value-buttons").show();
            isPlayerTurn = false;
        }
    }

    function startGame() {
        if (isGameInProgress) {
            return;
        }

        isGameInProgress = true;
        playerCards = [];
        dealerCards = [];
        playerScore = 0;
        dealerScore = 0;
        isPlayerTurn = true;

        $("#player-cards").html("");
        $("#dealer-cards").html("");
        $("#player-score").text("");
        $("#dealer-score").text("");
        $("#message").text("");

        dealCard($("#player-cards"), playerCards);
        dealCard($("#dealer-cards"), dealerCards);
        dealCard($("#player-cards"), playerCards);
        dealCard($("#dealer-cards"), dealerCards);

        if (playerCards.includes(1) && playerCards.includes(10)) {
            $("#ace-value-buttons").show();
            isPlayerTurn = false;

            playerScore = calculateScore(playerCards);
            dealerScore = calculateScore(dealerCards);
            $("#player-score").text(`Player Score: ${playerScore}`);
            $("#dealer-score").text(`Dealer Score: ${dealerScore}`);

            if (playerScore === 21) {
                isPlayerTurn = false;
                endGame();
            }
        }
    }

    function endGame() {
        isGameInProgress = false;

        if (playerScore > 21) {
            $("#message").text("Player Busts. Dealer Wins.");
        } else if (dealerScore > 21 || playerScore === 21 || playerScore > dealerScore) {
            $("#message").text("Player Wins!");
        } else if (playerScore < dealerScore) {
            $("#message").text("Dealer Wins.");
        } else {
            $("#message").text("It's a Draw!");
        }
    }

    $("#hit-button").click(function() {
        if (isPlayerTurn && isGameInProgress) {
            dealCard($("#player-cards"), playerCards);
            playerScore = calculateScore(playerCards);
            $("#player-score").text(`Player Score: ${playerScore}`);
            if (playerScore > 21) {
                isPlayerTurn = false;
                endGame();
            }
        }
    });

    $("#stand-button").click(function() {
        if (isPlayerTurn && isGameInProgress) {
            isPlayerTurn = false;
            while (dealerScore < 17) {
                dealCard($("#dealer-cards"), dealerCards);
                dealerScore = calculateScore(dealerCards);
                $("#dealer-score").text(`Dealer Score: ${dealerScore}`);
            }
            endGame();
        }
    });

    function chooseAceValue(value) {
        let aceIndex = playerCards.indexOf(1);

        if (aceIndex !== -1) {
            playerCards[aceIndex] = value;
            playerScore = calculateScore(playerCards);
            $("#player-score").text(`Player Score: ${playerScore}`);
            $("#ace-value-buttons").hide();
            isPlayerTurn = true;
        }
    }

    $("#ace-value-1").click(function() {
        chooseAceValue(1);
    });

    $("#ace-value-11").click(function() {
        chooseAceValue(11);
    });

    $("#start-button").click(startGame);
});


 
