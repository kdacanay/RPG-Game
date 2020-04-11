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
    image: "assets/images/alexander.jpg",
    didYouKnowArray: ["In 15 years, Alexander never lost a battle", "Alexander named 70 cities after himself", "Alexander was buried in a vat of honey"]
},
    "Caesar" : {
    name: "Julius Caesar",
    hitPoints: 110,
    attackPower: 14,
    image: "assets/images/caesar.jpg",
    didYouKnowArray: ["Caesar had a son with Cleopatra named Ptolemy Caesar", "Caesar is considered as the father of the leap year"]
},
    "Edison" : {
    name: "Thomas Edison",
    hitPoints: 100,
    attackPower: 10,
    image: "assets/images/edison.jpg",
    didYouKnowArray: ["Edison had almost 1100 patents before he died, which is still a record", "Among Edison's inventions were the alkaline battery, wax paper, and the precursor of the tattoo gun"]
},  
    "Gandhi" : {
    name: "Mahatma Gandhi",
    hitPoints: 90,
    attackPower: 13,
    image: "assets/images/gandhi.jpg",
    didYouKnowArray: ["Gandhi was engaged at the age of 7, and married at 13 in an arranged marriage", "Gandhi is widely known as a man of peace, but never won the Nobel Peace Prize"]
},
    "Lincoln" : {
    name: "Abraham Lincoln",
    hitPoints: 105,
    attackPower: 12,
    image: "assets/images/lincoln.jpg",
    didYouKnowArray: ["Lincoln created the Secret Service hours before his assassination", "John Wilkes Booth’s brother, Edwin saved the life of Lincoln’s son, Robert Todd Lincoln", "Lincoln's mother died from drinking poisonous milk"]
},
    "Teresa" : {
    name: "Mother Teresa",
    hitPoints: 85,
    attackPower: 14,
    image: "assets/images/motherteresa.jpg",
    didYouKnowArray: ["Mother Teresa's birth name was Agnes Gonxha Bojaxhiu and was born in Macedonia", "Mother Teresa was canonized as a saint in 2016"]
},
    "Napoleon" : {
    name: "Napoleon Bonaparte",
    hitPoints: 115,
    attackPower: 13,
    image: "assets/images/napoleon.jpg",
    didYouKnowArray: ["Napoleon was actually 5'7' , which is considered an average height for males. His shortness was made famous by the British", "Napoleon's family was more Italian than French", "Napoleon's army was decimated in Russia without losing a single battle"]
},
    "Pope John" : {
    name: "Pope John Paul II",
    hitPoints: 95,
    attackPower: 12,
    image: "assets/images/popejohn.jpg",
    didYouKnowArray: ["Pope John Paul II was an avid skiier until he was 73 years old", "Pope John Paul II was the first pope to ever visit the White House and Cuba and is known as the most widely traveled pope in history"]
},
    "Washington" :{
    name: "George Washington",
    hitPoints: 110,
    attackPower: 12,
    image: "assets/images/washington.jpg",
    didYouKnowArray: ["George Washington's hair was real and was white because he powdered it", "In 1976, Washington was awarded posthumously the highest rank ever of any American officer and will never be outranked: General of the Armies of the United States"]
}
};

//character Array
// var combatants = [];
// var cpuCharacter;

// var playerCharacter;
// //-----track turns-------------
// var turnCounter = 1;
// //-----track defeated opponents--------------
// var defeats = 0;


//-------------Build Character Cards------------------

var renderCharacter = function(character) {
    var charDiv = $("<div class='card' style='width: 16rem; margin: 10px'>");
    var charImage = $("<img alt-'image' style= 'height: 16rem;' class='card-img-top'>").attr("src", character.image);
    var charBody = $("<div class='card-body'>");
    var charName = $("<h6 class='card-title'>").html(character.name);  
    var charhitPoints = $("<p class='card-text'>").html(character.hitPoints);
    var charButton = $("<a href='#' class='btn btn-primary'>Did You Know?</a>");
    charDiv.append(charImage).append(charName).append(charhitPoints).append(charButton);
    $((charName.append(charhitPoints).append(charButton)).wrap(charBody));
    $("#characterRow").append(charDiv);
};

var startGame = function() {

    for (var keys in characters) {
        keys[Math.floor(Math.random() * characters.length)];
        renderCharacter(characters[keys], "#characterRow");
    }
};
startGame();









})
