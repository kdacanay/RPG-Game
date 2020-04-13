//pseudocode
//game begins with base screen, title up top in jumbotron, instructions "choose your character"
//as soon as game loads, cpu randomly chooses from ***characterArray*** 4 characters (this happens at reset as well)
//4 character cards placed in ***characterRow***
//each character card has name of character, picture, and available ***hitPoints at bottom and ***didYouKnow button for random fact
//each character has base ***hitPoints and ***attackPower.  ***counterAttackPower slightly higher 

$(document).ready(function() {

//variables and objects

var characters = {
    "Alex" : {
    name: "Alexander the Great",
    hitPoints: 130,
    attackPower: 12,
    enemyAttackBack: 20,
    image: "assets/images/alexander.jpg",
    didYouKnowArray: ["In 15 years, Alexander never lost a battle", "Alexander named 70 cities after himself", "Alexander was buried in a vat of honey"]
},
    "Caesar" : {
    name: "Julius Caesar",
    hitPoints: 110,
    attackPower: 14,
    enemyAttackBack: 14,
    image: "assets/images/caesar.jpg",
    didYouKnowArray: ["Caesar had a son with Cleopatra named Ptolemy Caesar", "Caesar is considered as the father of the leap year"]
},
    "Edison" : {
    name: "Thomas Edison",
    hitPoints: 100,
    attackPower: 10,
    enemyAttackBack: 12,
    image: "assets/images/edison.jpg",
    didYouKnowArray: ["Edison had almost 1100 patents before he died, which is still a record", "Among Edison's inventions were the alkaline battery, wax paper, and the precursor of the tattoo gun"]
},  
    "Gandhi" : {
    name: "Mahatma Gandhi",
    hitPoints: 90,
    attackPower: 13,
    enemyAttackBack: 19,
    image: "assets/images/gandhi.jpg",
    didYouKnowArray: ["Gandhi was engaged at the age of 7, and married at 13 in an arranged marriage", "Gandhi is widely known as a man of peace, but never won the Nobel Peace Prize"]
},
    "Lincoln" : {
    name: "Abraham Lincoln",
    hitPoints: 105,
    attackPower: 12,
    enemyAttackBack: 17,
    image: "assets/images/lincoln.jpg",
    didYouKnowArray: ["Lincoln created the Secret Service hours before his assassination", "John Wilkes Booth’s brother, Edwin saved the life of Lincoln’s son, Robert Todd Lincoln", "Lincoln's mother died from drinking poisonous milk"]
},
    "Teresa" : {
    name: "Mother Teresa",
    hitPoints: 85,
    attackPower: 14,
    enemyAttackBack: 20,
    image: "assets/images/motherteresa.jpg",
    didYouKnowArray: ["Mother Teresa's birth name was Agnes Gonxha Bojaxhiu and was born in Macedonia", "Mother Teresa was canonized as a saint in 2016"]
},
    "Napoleon" : {
    name: "Napoleon Bonaparte",
    hitPoints: 115,
    attackPower: 13,
    enemyAttackBack: 13,
    image: "assets/images/napoleon.jpg",
    didYouKnowArray: ["Napoleon was actually 5'7' , which is considered an average height for males. His shortness was made famous by the British", "Napoleon's family was more Italian than French", "Napoleon's army was decimated in Russia without losing a single battle"]
},
    "Pope John" : {
    name: "Pope John Paul II",
    hitPoints: 95,
    attackPower: 12,
    enemyAttackBack: 18,
    image: "assets/images/popejohn.jpg",
    didYouKnowArray: ["Pope John Paul II was an avid skiier until he was 73 years old", "Pope John Paul II was the first pope to ever visit the White House and Cuba and is known as the most widely traveled pope in history"]
},
    "Washington" :{
    name: "George Washington",
    hitPoints: 110,
    attackPower: 12,
    enemyAttackBack: 13,
    image: "assets/images/washington.jpg",
    didYouKnowArray: ["George Washington's hair was real and was white because he powdered it", "In 1976, Washington was awarded posthumously the highest rank ever of any American officer and will never be outranked: General of the Armies of the United States"]
}
};

//character Array
var combatants = [];
var cpuCharacter;

var playerCharacter;
// //-----track turns-------------
var turnCounter = 1;
// //-----track defeated opponents--------------
var defeats = 0;


//-------------Build Character Cards------------------

var renderCharacter = function(character, renderArea) {
    console.log(character.name);
    var charDiv = $("<div class='character' style='width: 16rem; margin: 10px' data-name='" + character.name + "'>");
    var charImage = $("<img alt-'image' style= 'height: 16rem;' class='character-image card-img-top'>").attr("src", character.image);
    var charBody = $("<div class='character card-body'>");
    var charName = $("<h6 class='character-name card-title'>").html(character.name);  
    var charhitPoints = $("<p class='character-hitPoints card-text'>").html(character.hitPoints);
    var charButton = $("<a href='#' class='btn btn-primary'>Did You Know?</a>");
    charDiv.append(charImage).append(charName).append(charhitPoints).append(charButton);
    $((charName.append(charhitPoints).append(charButton)).wrap(charBody));
    $(renderArea).append(charDiv);
};

var startGame = function() {

    for (var keys in characters) {
        renderCharacter(characters[keys], "#characterRow");
    }
};
startGame();

var updateCharacter = function(charObj, areaRender) {
    $(areaRender).empty();
    renderCharacter(charObj, areaRender);
};

var renderEnemies = function(enemyArr) {
    for (var i=0; i< enemyArr.length; i++) {
        renderCharacter(enemyArr[i], "#characterEnemyRow");
    }
};

var renderMessage = function(message) {
    // Builds the message and appends it to the page.
    var gameMessageSet = $("#message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
  };

  // Function which handles restarting the game after victory or defeat.
  var restartGame = function(resultMessage) {
    // When the 'Restart' button is clicked, reload the page.
    $("#restartButton").click(function() {
      location.reload();
    });

    // Build div that will display the victory/defeat message.
    var gameState = $("<div>").text(resultMessage);

    // Render the restart button and victory/defeat message to the page.
    $("body").append(gameState);
  };

  // Function to clear the game message section
  var clearMessage = function() {
    var gameMessage = $("#message");

    gameMessage.text("");
  };

  // ===================================================================

  // On click event for selecting our character.
  $("#characterRow").on("click", ".character", function() {
    // Saving the clicked character's name.
    var name = $(this).attr("data-name");

    // If a player character has not yet been chosen...
    if (!playerCharacter) {
      // We populate playerCharacter with the selected character's information.
      playerCharacter = characters[name];
      // We then loop through the remaining characters and push them to the combatants array.
      for (var key in characters) {
        if (key !== name) {
          combatants.push(characters[key]);
        }
      }

      $("#characterRow").hide();
      // Then render our selected character and our combatants.
      updateCharacter(playerCharacter, "#playerSelection");
      renderEnemies(combatants);
    }
  });

  // Creates an on click event for each enemy.
  $("#characterEnemyRow").on("click", ".character", function() {
    // Saving the opponent's name.
    var name = $(this).attr("data-name");

    // If there is no cpuCharacter, the clicked enemy will become the cpuCharacter.
    if ($("#cpuSelection").children().length === 0) {
      cpuCharacter = characters[name];
      updateCharacter(cpuCharacter, "#cpuSelection");

      // remove element as it will now be a new cpuCharacter
      $(this).remove();
      clearMessage();
    }
  });

  // When you click the attack button, run the following game logic...
  $("#attackButton").on("click", function() {
    // If there is a cpuCharacter, combat will occur.
    if ($("#cpuSelection").children().length !== 0) {
      // Creates messages for our attack and our opponents counter attack.
      var attackMessage = "You attacked " + cpuCharacter.name + " for " + playerCharacter.attackPower * turnCounter + " damage.";
      var counterAttackMessage = cpuCharacter.name + " attacked you back for " + cpuCharacter.enemyAttackBack + " damage.";
      clearMessage();

      // Reduce cpuCharacter's hitPoints by your attack value.
      cpuCharacter.hitPoints -= playerCharacter.attackPower * turnCounter;

      // If the enemy still has hitPoints..
      if (cpuCharacter.hitPoints > 0) {
        // Render the enemy's updated character card.
        updateCharacter(cpuCharacter, "#cpuSelection");

        // Render the combat messages.
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        // Reduce your hitPoints by the opponent's attack value.
        playerCharacter.hitPoints -= cpuCharacter.enemyAttackBack;

        // Render the player's updated character card.
        updateCharacter(playerCharacter, "#playerSelection");

        // If you have less than zero hitPoints the game ends.
        // We call the restartGame function to allow the user to restart the game and play again.
        if (playerCharacter.hitPoints <= 0) {
          clearMessage();
          restartGame("You have been defeated...GAME OVER!!!");
          $("#attackButton").off("click");
        }
      }
      else {
        // If the enemy has less than zero hitPoints they are defeated.
        // Remove your opponent's character card.
        $("#cpuCharacter").empty();

        var gameStateMessage = "You have defeated " + cpuCharacter.name + ", you can choose to fight another enemy.";
        renderMessage(gameStateMessage);

        // Increment your kill count.
        defeats++;

        // If you have killed all of your opponents you win.
        // Call the restartGame function to allow the user to restart the game and play again.
        if (defeats >= combatants.length) {
          clearMessage();
          $("#attackButton").off("click");
          restartGame("You are THE GREATEST EVER! GAME OVER!");
        }
      }
      // Increment turn counter. This is used for determining how much damage the player does.
      turnCounter++;
    }
    else {
      // If there is no cpuCharacter, render an error message.
      clearMessage();
      renderMessage("No enemy here.");
    }
  });
})




