let started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
};

/**
* ? Zu Beginn wird überprüft, welcher Button vom Benutzer angeklickt wurde, und die ID dieses Buttons wird in einer Variablen gespeichert. Anschließend wird dieser Wert dem Array 'userClickedPattern' hinzugefügt.
*
* ? Danach werden die Funktionen 'playSound' und 'animatePress' mit dem Argument aufgerufen, das der Farbe des angeklickten Buttons entspricht. (hier nehmen wird 'red' als Beispiel)
*
* ? Schließlich wird die Funktion 'checkAnswer' aufgerufen, wobei als Argument der letzte Wert im 'userClickedPattern'-Array übergeben wird, um zu prüfen, ob die vom Benutzer ausgewählten Töne der Reihenfolge des Spiels entsprechen.
*/
let userClickedPattern = [];
$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1); 
});

let level = 0;
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
/**
* ?Zu Beginn wird ein leeres Array namens 'userClickedPattern' erstellt, in das später die vom Benutzer geklickten Buttons gespeichert werden.
*
* ? Danach wird die zuvor erstellte Variable 'level' um den Wert 1 erhöht und die Anzeige im Spiel entsprechend angepasst, um das aktuelle Level widerzuspiegeln.
*
* ?Anschließend wird eine zufällige Zahl zwischen 0 und 3 generiert und in der Variablen 'randomNumber' gespeichert. Dann wird der Variablen 'randomChosenColor' der Wert aus dem Array 'buttonColors' zugewiesen, der dem Wert in diesem Array an der Position entspricht, die der zufälligen Zahl 'randomNumber' entspricht. In unserem Beispiel wäre das der Wert an Position 0, also "rot".
*
* ?Schließlich wird dem entsprechenden Button eine Animation hinzugefügt und der zugehörige Ton wird wiedergegeben
 */
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};
/**
 * ? Diese Funktion 'playSound' nimmt als Argument einen Namen entgegen, der einem bestimmten Ton im Spiel entspricht. Sie erstellt dann ein neues Audio-Objekt und weist ihm die entsprechende Audiodatei aus dem Ordner "sounds" zu, die dem übergebenen Namen entspricht. In unserem Beispiel wird der wert von audio also 'sounds/red.mp3' sein.
* 
* ? Das Argument für die Methode 'name' kommt aus der '$(".btn").click(function()', de wird diese nämlich gecallt mit dem richtigen Argument "playSound(userChosenColor);"
*
* ? Anschließend wird die Methode 'play' auf dem Audio-Objekt aufgerufen, um den Ton abzuspielen. Dadurch wird der Ton wiedergegeben, der dem Namen entspricht, der der Funktion 'playSound' übergeben wurde.
 */
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};
/**
 * ? hier is der Vorgang der selbe wie bei der 'playSound' Funktion, nur das diese die Animation des gedrückten buttons beeinflusst.
 * 
 * ? Erst wird die Klasse 'pressed' zu dem gedrücktem button hinzugefügt, die nach 100 Millisekunden wieder entfernt wird.   
 */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
/**
 * ? Diese Funktion prüft die eingabe des Users und checkt ob diese korrekt (im Sinne des Spiels) ist. 
 * 
 * ? Die erste if Abfrage checkt ob die Inhalte (Werte das gerade angeklickt wurde) der 'gamePattern' und 'userClickedPattern' Arrays übereinstimmen. Wenn das der fall ist, wird in der zweiten if Abfrage gecheckt ob die beiden Arrays die selbe Länge haben. Sollte auch das der Fall sein wird die Funktion 'nextSequence' nach 1000 Millisekunden aufgerufen.
 * 
 * ? Wenn eine der if Abfragen False ist wird zum 'body' die Klasse 'geme-over' hinzugefügt, die nach 200 Millisekunden wieder entfernt wird. Un der Text der Überschrift wird zu 'Game Over, Press Any Key to Restart' geändert. Anschliessend wird die Funktion 'startOver' aufgerufen.
 */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    };
  } else {
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);
    let end = new Audio('sounds/wrong.mp3');
    end.play();
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
};

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // Auf einem mobilen Gerät
  document.addEventListener('touchstart', function(event) {
    let started = false;

    $(document).off('keypress').on('touchstart', function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    });
  });
} else {
  // Auf einem Desktop-Gerät
  $(document).off('touchstart').on('keypress', function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}
