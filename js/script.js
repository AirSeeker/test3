function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setColorForRandomTwoBoxes() {
  var listOfRandomNumbers =[0,1,2,3].sort(function(){return .5 - Math.random()});
  while(listOfRandomNumbers.length > 0){
  var cuted = listOfRandomNumbers.splice(0, 2);
  var color = getRandomColor();
  var PairOne = $('.back')[cuted[0]];
  var PairTwo = $('.back')[cuted[1]];
  $('.row').find(PairOne).css('background-color', color);
  $('.row').find(PairTwo).css('background-color', color);
  }
}
setColorForRandomTwoBoxes();

var pairCheck = [];
var linkPairCheck = [];
var clickCounter = 0;
var winStatus = '';
$('.card').bind({
    click: function() {
      console.log(clickCounter);
      if(clickCounter < 2){
        $(this).toggleClass('flipped');
        $(this).closest('.box').removeClass('hvr-pulse-grow');
        var color = $(this).children('.back').css('background-color');

        if(pairCheck.length >= 2){
          pairCheck= [];
          linkPairCheck = [];
          clickCounter = 0;
        }

        pairCheck.push(color);
        linkPairCheck.push('#'+ $(this).attr('id'));


        if(pairCheck.length > 1){
          setTimeout(function(){
            if (pairCheck[0] !== pairCheck[1]) {
              $(linkPairCheck[0]).removeClass('flipped');
              $(linkPairCheck[1]).removeClass('flipped');
              $(linkPairCheck[0]).closest('.box').addClass('hvr-pulse-grow');
              $(linkPairCheck[1]).closest('.box').addClass('hvr-pulse-grow');
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
              if(winStatus.length === 2){
                alert('You won!');
              }
            }
          }, 800);
        }
      clickCounter++;
      }
    }
});
