$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
});


/* =============== Declaring some variables =============== */


var p1;
var p2;
var attacker;
var defender;
var turnCount = 0;
var attackerDiceCount;
var defenderDiceCount;
var attackerDiceResults = [];
var defenderDiceResults = [];
var attTerritories = [];
var defTerritories = [];
var p1Territories = [];
var p2Territories = [];
var territories = [
  {
    // Example territory as object in array
    'name': 'Classroom2',
    'player': 'neutral',
    'troops': 3
  },
  {

  }
];


/* ================ Declaring some functions =============== */


// Dice roll function
var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
};

// Pushing dice roll results into arrays

// Function to sort and reverse array of dice results
var sortArray = function(array) {
  return array.sort().reverse();
};

// If statement to create drop down menu of valid attack-from territories

var effectiveTroops = attTerritory.troops - 1;
if (effectiveTroops > 0) {
  // add to dropdown menu as valid attack-from option
};

// Attackers Dice Count
if (effectiveTroops < 2) {
  attackerDiceCount = 1;
} else if (effectiveTroops < 3) {
  attackerDiceCount = 2;
} else {
  attackerDiceCount = 3;
};
// Defenders Dice Count
if (defTerritory.troops > 1) {
  defenderDiceCount = 2;
} else {
  defenderDiceCount = 1;
}
// Rolling Dice for each player
for (i = attackerDiceCount; i > 0; i--) {
  attackerDiceResults.push(diceRoll());
};
for (i = defenderDiceCount; i > 0; i--) {
  defenderDiceResults.push(diceRoll());
};


/* ================ CompareResults Function =============== */


// Comparing dice results of two sorted, reversed arrays (of possibly different lengths)
// Plugging in the to/from territories makes it easier to change troop #s w/o having to find index in our while loop.
// For attTerritory and defTerritory we can pass those in as attTerritories[x] and defTerritories[x]
var compareResults = function(attackerDiceResults, defenderDiceResults, attTerritory, defTerritory) {
  var sortedAttackerArray = sortArray(attackerDiceResults);
  var sortedDefenderArray = sortArray(defenderDiceResults);
  var i = 0;
  while(i < sortedAttackerArray.length && i < sortedDefenderArray.length) {
    if (sortedAttackerArray[i] > sortedDefenderArray[i]) {
      defTerritory.troops --;
    } else {
      attTerritory.troops --;
    }
    i++;

    // Conquering a territory
    if (defTerritory.troops === 0) {
      attTerritory.troops --;
      defTerritory.troops = 1;
      defTerritory.player = attacker;
      attTerritories.push(defTerritory);
      defTerritories.splice(/* index of defTerritory */ , 1);
      /* Create drop-down menu function with choices for (attTerritory.troops - 1) */
      return alert(/* Good-looking pop-up to choose how many troops to advance */)
    };
  }
}
