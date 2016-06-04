$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
});

// Declaring some variables
var attackerDiceCount;
var defenderDiceCount;
var attackerDiceResults = [];
var defenderDiceResults = [];
var territories = [
  {
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

// Sorting and reversing array of dice results
var sortedAttackerArray = attackerDiceResults.sort();
var finalAttackerArray = sortedAttackerArray.reverse();

// Comparing dice results of two sorted, reversed arrays (of possibly different lengths)
// Plugging in the to/from territories makes it easier to change troop #s w/o having to find index in our while loop.
var compareResults = function(finalAttArr, finalDefArr, fromTerritory, toTerritory) {
  var i = 0;
  while(i < finalAttArr.length && i < finalDefArr.length) {
    if (finalAttArr[i] > finalDefArr[i]) {
      toTerritory.troops --;
    } else {
      fromTerritory.troops --;
    }
    i++;
  } console.log(territories);
}
