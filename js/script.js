function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function setColorForRandomTwoBoxes(gridarr) {
  var listOfRandomNumbers = shuffle(gridarr);
  while(listOfRandomNumbers.length > 0){
  var cuted = listOfRandomNumbers.splice(0, 2);
  var color = getRandomColor();
  var PairOne = $('.back')[cuted[0]];
  var PairTwo = $('.back')[cuted[1]];
  $('.row').find(PairOne).css('background-color', color);
  $('.row').find(PairTwo).css('background-color', color);
  }
}

var gridLinks = ['grid/2x2.html', 'grid/3x3.html', 'grid/4x4.html', 'grid/5x5.html', 'grid/6x6.html'];
var gridArrays = ['0,1,2,3','0,1,2,3,4,5','0,1,2,3,4,5,6,7','0,1,2,3,4,5,6,7,8,9','0,1,2,3,4,5,6,7,8,9,10,11'];
var gridCounter = 2;

var round = 0;
var roundTimer = '';
var pairCheck = [];
var linkPairCheck = [];
var clickCounter = 0;
var winStatus = '';


function setGrid(gridSystem){
    var jqXHR = $.get(gridSystem);
  jqXHR.complete(function(response) {
    var html = response.responseText;
    $(".container").html(html);
    var nextGridArr = gridArrays[round].split(',');
    setColorForRandomTwoBoxes(nextGridArr);
  });
}


 function onClickEventHandler(card) {
      if(clickCounter < 2){
        card.toggleClass('flipped');
        card.closest('.box').removeClass('hvr-pulse-grow');
        var color = card.children('.back').css('background-color');

        if(pairCheck.length >= 2){
          pairCheck= [];
          linkPairCheck = [];
          clickCounter = 0;
          winStatus = ''
        }

        pairCheck.push(color);
        linkPairCheck.push('#'+ card.attr('id'));

        $(linkPairCheck[0]).attr('onclick','');
        $(linkPairCheck[1]).attr('onclick','');


        if(pairCheck.length > 1){
          setTimeout(function(){
            if (pairCheck[0] !== pairCheck[1]) {
              $(linkPairCheck[0]).removeClass('flipped');
              $(linkPairCheck[1]).removeClass('flipped');
              $(linkPairCheck[0]).closest('.box').addClass('hvr-pulse-grow');
              $(linkPairCheck[1]).closest('.box').addClass('hvr-pulse-grow');
              $(linkPairCheck[0]).attr('onclick','onClickEventHandler($(this))');
              $(linkPairCheck[1]).attr('onclick','onClickEventHandler($(this))');
              pairCheck = [];
              linkPairCheck = [];
              clickCounter = 0;
            }
            else if(pairCheck[0] === pairCheck[1]){
              $(linkPairCheck[0]).removeClass('card flipped').empty();
              $(linkPairCheck[1]).removeClass('card flipped').empty();
              pairCheck= [];
              linkPairCheck = [];
              clickCounter = 0;
              winStatus += 1;
              if(winStatus.length === gridCounter){
                pairCheck= [];
                linkPairCheck = [];
                clickCounter = 0;
                winStatus = ''
                roundTimer+=1;
                $('#status span').html(Number($('#status span').html()) -1);
                setGrid(gridLinks[round]);
                if(roundTimer.length === 4){
                  roundTimer='';
                  round++;
                  gridCounter++;
                  if(round > 4){
                    alert('You Won!');
                     gridCounter = 2;
                     round = 0;
                     roundTimer = '';
                     pairCheck = [];
                     linkPairCheck = [];
                     clickCounter = 0;
                     winStatus = '';
                    setGrid(gridLinks[round]);
                  }else{
                    alert('Next round!');
                    setGrid(gridLinks[round]);
                  }
                }
              }
            }
          }, 800);
        }
      clickCounter++;
      }
  }

setGrid(gridLinks[round]);