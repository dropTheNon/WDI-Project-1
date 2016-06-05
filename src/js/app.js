$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
});

// Declaring some variables
var turnCount = 0;
var attackerDiceCount;
var defenderDiceCount;
var attackerDiceResults = [];
var defenderDiceResults = [];
var fromTerritories = [];
var toTerritories = [];
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

// Declaring some functions

// Dice roll function
var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
}

// Pushing dice roll results into arrays
for (i = attackerDiceCount; i > 0; i--) {
  attackerDiceResults.push(diceRoll());
}

for (i = defenderDiceCount; i > 0; i--) {
  defenderDiceResults.push(diceRoll());
}

// Declaring function to sort and reverse array of dice results
var sortArray = function(array) {
  return array.sort().reverse();
}

// Comparing dice results of two sorted, reversed arrays (of possibly different lengths)
// Plugging in the to/from territories makes it easier to change troop #s w/o having to find index in our while loop.
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
    if (defTerritory.troops === 0) {
      /* attacker */.troops --;
      defTerritory.troops = 1;
      defTerritory.player = /* attacker */
      /* p1 or p2 */Territories.push(defTerritory);
      /* p1 or pw */Territories.splice(/* index of defTerritory */ , 1);
    };
  }
}
