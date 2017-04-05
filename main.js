$(document).ready(function(){
  var stBtn = document.getElementById("startBtn");
  var strict = document.getElementById("strictBtn");
  var count = document.getElementById("countBtn");
  var countN = document.getElementById("countNum");
  var greenDiv = document.getElementById("green");
  var redDiv = document.getElementById("red");
  var yellowDiv = document.getElementById("yellow");
  var blueDiv = document.getElementById("blue");
  var greenSound = document.getElementById("audioGreen");
  var redSound = document.getElementById("audioRed");
  var yellowSound = document.getElementById("audioYellow");
  var blueSound = document.getElementById("audioBlue");

  stBtn.addEventListener("click", startGame);
  strict.addEventListener("click", selectStrict);
  greenDiv.addEventListener("click", insertGreen);
  redDiv.addEventListener("click", insertRed);
  yellowDiv.addEventListener("click", insertYellow);
  blueDiv.addEventListener("click", insertBlue);

  var ifStrict = false;
  var ifStart = false;
  var array = [];
  var arrayPlayer = [];
  var k = 0;
  var check = false;
  var countClick = 0;
  var idCheckStart;
  var idCheckClick;
  var greenLight = "#2fcf1c";
  var greenDark = "#1c880f";
  var redLight = "#f14f46";
  var redDark = "#9f0d04";
  var yellowLight = "#ffe059";
  var yellowDark = "#d4ab00";
  var blueLight = "#4f6ffb";
  var blueDark = "#0f299c";
  //function to set buttons' cursors
  function setCursor(cursorStyle, cursorEvent) {
    greenDiv.style.cursor = cursorStyle;
    redDiv.style.cursor = cursorStyle;
    yellowDiv.style.cursor = cursorStyle;
    blueDiv.style.cursor = cursorStyle;
    $("#green").css("pointer-events", cursorEvent);
    $("#red").css("pointer-events", cursorEvent);
    $("#yellow").css("pointer-events", cursorEvent);
    $("#blue").css("pointer-events", cursorEvent);
  }
  //function to check if player inserts the right click
  function checkClick() {
    if (arrayPlayer[countClick] !== array[countClick]) {
      setCursor("default", "none");
      arrayPlayer = [];
      countClick = 0;
      if (ifStrict == true) {
        countN.innerHTML = "New!";
        array = [];
        k = 0;
        check = false;
        idCheckClick = setTimeout(myGame, 1000);
        return;
      } else {
        countN.innerHTML = "Again!";
        idCheckClick = setTimeout(function() {
          if (k == 20) {
            countN.innerHTML = "Last!";
          } else {
            countN.innerHTML = k;
          }
          displaySequence();
        }, 1000);
        return;
      }
    } else {
      if (arrayPlayer.length === array.length) {
        setCursor("default", "none");
        if (k == 20) {
          countN.innerHTML = "Win!!!";
          ifStart = false;
          ifStrict = false;
          array = [];
          arrayPlayer = [];
          k = 0;
          check = false;
          countClick = 0;
          stBtn.style.backgroundColor = "#ffbe18";
          strict.style.backgroundColor = "#ffbe18";
          return;
        } else {
          idCheckClick = setTimeout(myGame, 2000);
          return;
        }
      } else {
        countClick++;
        return;
      }
    }
  }
  //general function to insert color in the player array
  function insertColor(colorType, numColor, colorHexLight, colorHexDark) {
    if (ifStart) {
      clearTimeout(idCheckStart);
      arrayPlayer.push(numColor);
      document.getElementById(colorType.toString()).style.backgroundColor = colorHexLight;
      var arrColorType = colorType.split("");
      var firstLetter = arrColorType[0].toUpperCase();
      arrColorType.shift();
      var remainingLetters = arrColorType.join("");
      var idColorAudio = "#audio"+firstLetter+remainingLetters
      document.getElementById("audio"+firstLetter+remainingLetters).play();
      setTimeout(function() {document.getElementById(colorType.toString()).style.backgroundColor = colorHexDark;$(idColorAudio).trigger('pause'); $(idColorAudio).prop("currentTime",0);}, 400);
      checkClick();
    } else {
      return;
    }
  }
  //functions on palyer click call to above general function
  function insertGreen() {
    insertColor("green", 0, greenLight, greenDark);
  }
  function insertRed() {
    insertColor("red", 1, redLight, redDark);
  }
  function insertYellow() {
    insertColor("yellow", 2, yellowLight, yellowDark);
  }
  function insertBlue() {
    insertColor("blue", 3, blueLight, blueDark);
  }
  //function to generate random number for sequence
  function generateRand() {
    var rnd = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    array.push(rnd);
  }
  //function to display the game sequence
  function displaySequence() {
    clearTimeout(idCheckStart);
    var time = 0;
    var incTime = 0.9;
    var interval = 500;
    if ((k>5) && (k<11)) {
      incTime = 0.8; //0.8
    } else if ((k>10) && (k<16)) {
      incTime = 0.7; //0.6
      interval = 400;
    } else if (k>15) {
      incTime = 0.6; //0.4
      interval = 350;
    }
    for (i=0; i<array.length; i++) {
        switch (array[i]) {
          case 0:
            setTimeout(function() {greenDiv.style.backgroundColor = greenLight; greenSound.play();}, time + interval);
            setTimeout(function() {greenDiv.style.backgroundColor = greenDark; $("#audioGreen").trigger('pause'); $("#audioGreen").prop("currentTime",0);}, time + interval*2);
            break;
          case 1:
            setTimeout(function() {redDiv.style.backgroundColor = redLight; redSound.play();}, time + interval);
            setTimeout(function() {redDiv.style.backgroundColor = redDark; $("#audioRed").trigger('pause'); $("#audioRed").prop("currentTime",0);}, time + interval*2);
            break;
          case 2:
            setTimeout(function() {yellowDiv.style.backgroundColor = yellowLight; yellowSound.play();}, time + interval);
            setTimeout(function() {yellowDiv.style.backgroundColor = yellowDark;$("#audioYellow").trigger('pause'); $("#audioYellow").prop("currentTime",0);}, time + interval*2);
            break;
          case 3:
            setTimeout(function() {blueDiv.style.backgroundColor = blueLight; blueSound.play();}, time + interval);
            setTimeout(function() {blueDiv.style.backgroundColor = blueDark; $("#audioBlue").trigger('pause'); $("#audioBlue").prop("currentTime",0);}, time + interval*2);
            break;
        }
        time += incTime*1000;
    }
    setTimeout(function() {
      setCursor("pointer", "auto");
    }, time);
  }
  //function to check if the player has started, if not the sequence is etiher repeated or restart from 0 depending is strict mode has been chosen
  function checkStart() {
    if (ifStrict === false) {
      if (arrayPlayer.length === 0) {
        countN.innerHTML = "Start!";
        setCursor("default", "none");
        setTimeout(function() {countN.innerHTML = k; arrayPlayer = [];
        countClick = 0; displaySequence();}, 1000);
        return;
      } else {clearTimeout(idCheckStart); return};
    } else {
      if (arrayPlayer.length === 0) {
        countN.innerHTML = "New!";
        setCursor("default", "none");
        setTimeout(function() {clearTimeout(idCheckStart); k=0; array = []; myGame()}, 1000);
        return;
      } else return;
    }
  }
  //function which call displaySequence and checkStart
  function myGame() {
    k++;
    arrayPlayer = [];
    countClick = 0;
    generateRand();
    if (k == 20) {
      countN.innerHTML = "Last!";
    } else {
      countN.innerHTML = k;
    }
    displaySequence();
    var incTime = 0.9;
    if ((k>5) && (k<11)) {
      incTime = 0.8; //0.8
    } else if ((k>10) && (k<16)) {
      incTime = 0.7; //0.6
    } else if (k>15) {
      incTime = 0.6; //0.4
    }
    idCheckStart = setTimeout(checkStart, 3000 + k*incTime*1000 + k*500);
  }
  //function which start the game on player click on start button
  function startGame() {
    if (ifStart === false) {
      stBtn.style.backgroundColor = "#46bf1b";
      $("#startBtn").html("<i class='fa fa-stop' aria-hidden='true'></i>");
      $("#strictBtn").css("cursor", "default");
      $("#strictBtn").css("pointer-events", "none");
      ifStart = true;
      myGame();
      return;
    } else {
      stBtn.style.backgroundColor = "#ffbe18";
      strict.style.backgroundColor = "#ffbe18";
      ifStrict = false;
      $("#startBtn").html("<i class='fa fa-play' aria-hidden='true'></i>");
      $("#strictBtn").css("cursor", "pointer");
      $("#strictBtn").css("pointer-events", "auto");
      clearTimeout(idCheckStart);
      clearTimeout(idCheckClick);
      setCursor("default", "none");
      countN.innerHTML = "#";
      array = [];
      arrayPlayer = [];
      k = 0;
      check = false;
      countClick = 0;
      ifStart = false;
      return;
    }
  }
  //toggle strict mode
  function selectStrict() {
    if (ifStrict === false) {
      strict.style.backgroundColor = "#46bf1b";
      ifStrict = true;
      return;
    } else {
      strict.style.backgroundColor = "#ffbe18";
      ifStrict = false;
      return;
    }
  }
});
