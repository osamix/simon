$(document).ready(() => {
  let strict = false;
  let power = false;
  let pushable = false;
  const soundUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound';
  let combination = [];
  let click = 0;

  // functions  
  // creating combination of buttons to press
  function createCombination() {
    const randomNumber = Math.floor((Math.random() * 4) + 1);
    combination.push(randomNumber);
  }

  // showing the combination
  function showCombination(i) {
    if (combination.length < 10) {
      $('.counter').html(`0${combination.length}`);
    } else {
      $('.counter').html(combination.length);  
    }
    click = 0;
    new Audio(`${soundUrl}${combination[i]}.mp3`).play();
    const autoId = `#${combination[i]}`;
    $(autoId).addClass('push-active');
    setTimeout(() => {
      $(autoId).removeClass('push-active');
      i++;
      if (i < combination.length) {
        showCombination(i);
      } else {
        pushable = true;
      }
    }, 1000);
  }

  // checking the clicks
  function checkClick(cl, id) {
    if (id === combination[cl - 1]) {
      return true;
    } else {
      return false;
    }
  }

  // restart game  
  function gameRestart() {
    click = 0;
    combination = [];
    createCombination();
    showCombination(0);
  }

  // victory
  function victory(e) {
    const gratz = ['Y', 'O', 'U', '-', 'W', 'I', 'N', '!'];
    const msg = gratz[e] + gratz[e + 1];
    setTimeout(() => {
      if (e < 7) {
        $('.counter').html(msg);
        e++;
        victory(e);
      } else {
        gameRestart();
      }
    }, 600);
  }

  // on-off
  $('.pwr-but').click(() => {
    power = !power;
    if (power) {
      $('.pwr-but').addClass('pb-pushed');
      $('.counter').html('00');
     } else {
      $('.pwr-but').removeClass('pb-pushed');
      $('.counter').html('');
      strict = false;
      pushable = false;
      click = 0;
      combination = [];
      $('#lamp-light').removeClass('lamp-on');
    }
  });

  // game start
  $('.start').click(() => {
    if (power) {
      gameRestart();
    } // if power
  });

  // strict mode
  $('.strict').click(() => {
    if (power) {
      strict = !strict;
      if (strict) {
        $('#lamp-light').addClass('lamp-on');
      } else {
        $('#lamp-light').removeClass('lamp-on');
      }
    } // if power
  });

  // your button pressing

  $('.push').mousedown((e) => {
    if (power && pushable) {
      click++;
      pushable = false;
      const yourId = Number(e.target.id);
      if (checkClick(click, yourId)) {
        new Audio(`${soundUrl}${yourId}.mp3`).play();
        if (click === combination.length) {
          if (click === 20) {
            new Audio('http://osamix.ct8.pl/victory.mp3').play();
            victory(0);
          } else {
            createCombination();
            setTimeout(() => {
              showCombination(0);
            }, 1200);
          }
        } else {
          pushable = true;
        }
      } else {
        $('.counter').html('!!');
        new Audio('http://osamix.ct8.pl/error.mp3').play();
        if (!strict) {
          setTimeout(() => {
            showCombination(0);
          }, 2000);
        } else {
          setTimeout(() => {
            $('.counter').html('00');
            gameRestart();
          }, 2000);
        }
      }
    }
  });
});
