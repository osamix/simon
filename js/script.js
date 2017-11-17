$(document).ready(function() {
  var strict = false;
  var power = false;
  var pushable = false;
  var soundUrl = "https://s3.amazonaws.com/freecodecamp/simonSound";
  var combination = [];
  var click = 0;

  // functions
  
  // creating combination of buttons to press
  function createCombination() {
    var randomNumber = Math.floor(Math.random() * 4 + 1);
    combination.push(randomNumber);
    }

  //showing the combination
  function showCombination(i) {
    if (combination.length < 10) {
    $(".counter").html("0" + combination.length);
    }
    else {
    $(".counter").html(combination.length);  
    }
    click = 0;
    new Audio(soundUrl + combination[i] + ".mp3").play();
      var autoId = "#" + combination[i];
      $(autoId).addClass("push-active");
      setTimeout(function() {
        $(autoId).removeClass("push-active");
        i++;
        if (i < combination.length) {
          showCombination(i);
        }
        else {
          pushable = true;
        }
      }, 1000);
    }

  // checking the clicks
  function checkClick(cl, id) {
    if (id === combination[cl - 1]) {
      return true;
    }
    else {
      return false;
    }
  }
  
  //restart game
  
  function gameRestart() {
   click = 0;
      combination = [];
      createCombination();
      showCombination(0); 
  }
  
  // victory
  function victory(e) {
    var gratz = ["Y", "O", "U", "-","W", "I", "N", "!"];
    var msg = gratz[e] + gratz[e + 1];
     setTimeout(function() {
    if (e < 7) {
    $(".counter").html(msg);
      e++;
      victory(e);
    }
       else {
         gameRestart();
       }
     }, 600); 
    }
    
  // on-off
  $(".pwr-but").click(function() {
    power = !power;
    if (power) {
      $(".pwr-but").addClass("pb-pushed");
      $(".counter").html("00");
     } else {
      $(".pwr-but").removeClass("pb-pushed");
      $(".counter").html("");
      strict = false;
      pushable = false;
      click = 0;
      combination = [];
      $("#lamp-light").removeClass("lamp-on");
    }
  });

  //game start
  $(".start").click(function() {
    if (power) {
      gameRestart();
    } // if power
  });

  //strict mode
  $(".strict").click(function() {
    if (power) {
      strict = !strict;
      if (strict) {
        $("#lamp-light").addClass("lamp-on");
      } else {
        $("#lamp-light").removeClass("lamp-on");
      }
    } // if power
  });

  // your button pressing

  $(".push").mousedown(function(e) {
    if (power && pushable) {
    click++;
    pushable = false;
    var yourId = Number(e.target.id);
    if (checkClick(click, yourId)) {
      new Audio(soundUrl + yourId + ".mp3").play();
      if (click === combination.length) {
        if (click === 20) {
          new Audio("http://osamix.ct8.pl/victory.mp3").play();
          victory(0);
        }
        else {
        createCombination();
        setTimeout(function() {
        showCombination(0);
        }, 1200);
        }
      }
      else {
        pushable = true;
      }
      }
      else {
      $(".counter").html("!!");
        new Audio("http://osamix.ct8.pl/error.mp3").play();
        if (!strict) {
        setTimeout(function() {
        showCombination(0);
        }, 2000);
      }
      else {
      setTimeout(function() {
      $(".counter").html("00");
      gameRestart();
      }, 2000);
      }
      }
    }
  });
});
