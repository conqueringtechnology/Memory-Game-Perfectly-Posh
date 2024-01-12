$(document).ready(function () {
  const app = {
    cards: ['images/perfectlyposh0.jpg','images/perfectlyposh0.jpg','images/perfectlyposh1.jpg','images/perfectlyposh1.jpg','images/perfectlyposh2.jpg','images/perfectlyposh2.jpg','images/perfectlyposh3.jpg','images/perfectlyposh3.jpg','images/perfectlyposh4.jpg','images/perfectlyposh4.jpg','images/perfectlyposh5.jpg','images/perfectlyposh5.jpg','images/perfectlyposh6.jpg','images/perfectlyposh6.jpg','images/perfectlyposh7.jpg','images/perfectlyposh7.jpg','images/perfectlyposh8.jpg','images/perfectlyposh8.jpg'],
    //First alert before the game
    greetingModal: $('#greetingmodal'),
    //Section that contains the cards
    container: $('#container'),
    //Secection that contains the end game ad
    endGameAd: $('#endgamead'),
    //send form score container
    sendScore: $('#sendscore'),
    //Secection that contains the second end game ad
    secondEndGameAd: $('#secondendgamead'),
    //Greeting Window Start Button
    startGame: $('.startgame'),
    //Restart Button
    restartGame: $('.restartgame'),
    //Div holds the information
    yourScore: $('.yourscore'),
    //Div holds the information
    timer: $('.timer'),
    //End of the game. Images of the product container.
    productCardsContainer: $('.productcardscontainer'),
    //No thanks button on the first end of the game model.
    noThanks: $('.nothanks'),
    //Submit final score button
    submitScore: $('.submitscore'),
    //The actual form to submit score
    submitScoreForm: $('.submitscoreform'),
    //End game retry button
    replayGame: $('.replaygame'),
    //End game close ad button
    closeXAd: $('.closexad'),
    //Final Score and time displayed on form
    yourFinalScore: $('.yourfinalscore'),
    yourFinalTime: $('.yourfinaltime'),
    //Initial time
    time: 0,
    //Continuous updating the time
    interval: this,
    //Previous Time
    previousTime: this,
    // The time is formatted
    formattedTime: this,
    //Start of the score when click card
    score: 1,
    init: function () {
      app.greetingModelFunction();
      app.shuffle();
      app.facebook(document, 'script', 'facebook-jssdk');
      app.restartGameFunction();
      app.preloadImages();
    },
    //Greeting Window
    greetingModelFunction: function () {
      app.startGame.focus();
      app.startGame.click(function() {
        //Animation for the cards
        app.greetingModal.fadeOut('slow', function() {
          $('#container .containerimage').addClass('dealcard');
          $('#container .containerimage:nth-of-type(1)').animate({opacity: 1, top:0},250);
          $('#container .containerimage:nth-of-type(2)').animate({opacity: 1, top:0},500);
          $('#container .containerimage:nth-of-type(3)').animate({opacity: 1, top:0},750);
          $('#container .containerimage:nth-of-type(4)').animate({opacity: 1, top:0},1000);
          $('#container .containerimage:nth-of-type(5)').animate({opacity: 1, top:0},1250);
          $('#container .containerimage:nth-of-type(6)').animate({opacity: 1, top:0},1500);
          $('#container .containerimage:nth-of-type(7)').animate({opacity: 1, top:0},1750);
          $('#container .containerimage:nth-of-type(8)').animate({opacity: 1, top:0},2000);
          $('#container .containerimage:nth-of-type(9)').animate({opacity: 1, top:0},2250);
          $('#container .containerimage:nth-of-type(10)').animate({opacity: 1, top:0},2500);
          $('#container .containerimage:nth-of-type(11)').animate({opacity: 1, top:0},2750);
          $('#container .containerimage:nth-of-type(12)').animate({opacity: 1, top:0},3000);
          $('#container .containerimage:nth-of-type(13)').animate({opacity: 1, top:0},3250);
          $('#container .containerimage:nth-of-type(14)').animate({opacity: 1, top:0},3500);
          $('#container .containerimage:nth-of-type(15)').animate({opacity: 1, top:0},3750);
          $('#container .containerimage:nth-of-type(16)').animate({opacity: 1, top:0},4000);
          $('#container .containerimage:nth-of-type(17)').animate({opacity: 1, top:0},4250);
          $('#container .containerimage:nth-of-type(18)').animate({opacity: 1, top:0},4500);
        });
        app.startTimer();
      });
    },
    //Timer function
    startTimer: function() {
      app.interval = setInterval(app.updateTimer, 10);
      app.previousTime = Date.now();
    },
    //Calculates the time passed
    timeCalculation: function() {
      let now = Date.now();
      let timePassed = now - app.previousTime;
      app.previousTime = now;
      return timePassed;
    },
    //Format the Date.now()
    timeFormatted: function(timeInMilliseconds) {
      let time = new Date(timeInMilliseconds);
      //Convert to string because can not get length of a number
      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();
      let milliseconds = time.getMilliseconds().toString();
      if (minutes.length < 2) {
        minutes = '0' + minutes;
      }
      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }
      while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
      }
      return minutes + ' : ' + seconds + ' . ' + milliseconds;
    },
    //Time is updated and outputed
    updateTimer: function() {
      app.time += app.timeCalculation();
      formattedTime = app.timeFormatted(app.time);
      app.timer.html('Your Time: ' + formattedTime);
    },
    //Shuffle cards
    shuffle: function() {
      let random;
      let temp;
      for (let i = app.cards.length - 1; i > 0; i--) {
        random = Math.floor(Math.random() * i);
        temp = app.cards[random];
        app.cards[random] = app.cards[i];
        app.cards[i] = temp;
      }
      app.gameBoard();
    },
    //Set the div for cards
    gameBoard: function () {
      let divOutput = '';
      for(let i = 0; i < app.cards.length; i++) {
        divOutput += '<div class="containerimage"><div class="logofront"></div><div id="card'+i+'" class="card unmatached"></div></div>';
      }
      app.container.html(divOutput);
      //for each card adding data attribute
      $('.card').each(function (index) {
        $(this).attr('data-card-value', app.cards[index]);
      });
      app.clickHandler();
    },
    //Click function for cards
    clickHandler: function () {
      $('.logofront').click(function() {
        //Selected is when card is showing image
        $(this).next('.card').html('<img src='+$(this).next('.card').data('cardValue')+' alt="No image found.">').addClass('selected');
        //To make card flip 180 degrees
        $(this).parent().addClass('fliptile');
        app.checkMatch();
      });
    },
    //Check if cards are a match
    checkMatch: function() {
      let selected = $('.selected');
      if ($(selected).length == 2) {
        if ($(selected).first().data('cardValue') == $(selected).last().data('cardValue')) {
          $(selected).each(function() {
            score = app.score++;
            //unmatched all cards have the class. Its to check the win.
            $(this).removeClass('unmatached selected').addClass('dealcardafter');
          });
        app.yourScore.text('Your Score: ' + score);
        app.checkWin();
        } else {
          setTimeout (function() {
            $(selected).each(function () {
              score = app.score++;
              $(this).removeClass('selected');
              //Have the card flip 180deg
              $(selected).parent().removeClass('fliptile');
            });
            app.yourScore.text('Your Score: ' + score);
          }, 1000);
        }
      }
    },
    //Check if all cards have a match
    checkWin: function() {
      if ($('.unmatached').length === 0) {
        clearInterval(app.interval);
        app.endGameAdFunction();
      }
    },
    //End game ad Window
    endGameAdFunction: function() {
      app.endGameAd.fadeToggle('slow', function () {
        app.yourScore.html('Your Score: ' + score);
        app.timer.html('Your Time: ' + formattedTime);
      });
      app.noThanks.click(function() {
        app.endGameAd.fadeToggle('fast', function() {
          app.secondEndGameAdFunction();
        });
      });
      app.submitScore.click(function() {
        app.endGameAd.fadeToggle('slow', function () {
          app.submitScoreFormFunction();
        });
      });
    },
    //Submit score form
    submitScoreFormFunction: function() {
      app.sendScore.fadeToggle('slow');
      let finalScore = score;
      let finalTime = formattedTime;
      app.yourFinalScore.val(finalScore);
      app.yourFinalTime.val(finalTime);
      app.closeXAd.click(function() {
        app.sendScore.fadeOut('slow', function() {
          app.endGameAd.fadeIn('slow');
        });
      });
    },
    //Second end of the game function
    secondEndGameAdFunction: function() {
      app.secondEndGameAd.fadeToggle('slow');
      app.replayGame.click(function() {
        location.reload();
      });
      app.closeXAd.click(function() {
        app.secondEndGameAd.fadeOut('slow', function() {
          app.endGameAd.fadeIn('slow');
        });
      });
    },
    //Share and like Facebook
    facebook: function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
      fjs.parentNode.insertBefore(js, fjs);
    },
    //Restart Game
    restartGameFunction: function() {
      app.restartGame.click(function() {
        let warningAlert = confirm('You want to restart the game?');
        if(warningAlert) {
          location.reload();
        }
      });
    },
    //Preload Card Images
    preloadImages: function() {
      let img = [];
      for(i = 0; i < app.cards.length; i ++) {
        img[i] = new Image();
        img[i].src = '../images/perfectlyposh'+i+'.jpg';
      }
    }
  };
  //Initialize App
  app.init();
});
