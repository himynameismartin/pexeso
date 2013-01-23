$(function() {
	var cards = new Array();
	var cardsTotal = 16;
	for(var i = 0; i < cardsTotal; i++) {
		cards[i] = i;
	}

	cards = cards.sort(function() {return 0.5 - Math.random()});
	$.getJSON('pexeso.json', function(data) {
		$.each(data.sort(function() {return 0.5 - Math.random()}).slice(0, 8), function(index, entry) {
			$('#' + (cards.pop() + 1)).data('card', {num: entry.num, type: 'transcript', transcript: entry.transcript});
			$('#' + (cards.pop() + 1)).data('card', {num: entry.num, type: 'img', img: entry.img});
		});
	});

	var cardsFlipped = 0;
	var pairsRevealed = 0;
	var pairsTotal = cardsTotal/2;
	var card1Id;
	var card2Id;
	var card1Num;
	var card2Num;

	$('#action').css('visibility', 'hidden');

	$('.card').click(function() {
		if(cardsFlipped < 2) {
			$(this).addClass('card-flipped');
			cardsFlipped++;
			if($(this).data('card').type == 'transcript') {
				$('#card-' + cardsFlipped).html($(this).data('card').transcript);
			} else if($(this).data('card').type == 'img') {
				$('#card-' + cardsFlipped).html("<img src=\"" + $(this).data('card').img + "\">");
			} else {
				$('#card-' + cardsFlipped).html('error');
			}
			if(cardsFlipped == 1) {
				card1Id = $(this).attr('id');
				card1Num = $(this).data('card').num;
			}
			if(cardsFlipped == 2) {
				card2Id = $(this).attr('id');
				card2Num = $(this).data('card').num;
				if(card1Num == card2Num) {
					$('#' + card1Id).css('visibility', 'hidden');
					$('#' + card2Id).css('visibility', 'hidden');
					$('#response').html('match');
					$('#action').html('continue');
					pairsRevealed++;
				} else {
					$('#response').html('no match');
					$('#action').html('flip the cards back');
				}
				if(pairsRevealed == pairsTotal) {
					$('#response').html('you won!');
				} else {
					$('#action').css('visibility', 'visible');
				}
			}
		}
	});

	$('#action').click(function() {
		$(this).css('visibility', 'hidden');
		$.each(['#card-1', '#card-2', '#response'], function(index, selector) {
			$(selector).html('');
		});
		$('td').removeClass('card-flipped');
		cardsFlipped = 0;
	});
});
