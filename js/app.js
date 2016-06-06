$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
  $('.box').hide();
  $('#player1AttackBox').show();
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

// Function to sort and reverse array of dice results
var sortArray = function(array) {
  return array.sort().reverse();
};

// If statement to create drop down menu of valid attack-from territories

// var effectiveTroops = attTerritory.troops - 1;
// if (effectiveTroops > 0) {
//   // add to dropdown menu as valid attack-from option
// };


/* =============== Click Event Delegation Declaration ============= */


// ------- Deploying Troops --------

// Upon beginning game, shows P1 Deploy Box, populates selectbox with # of troop options
$('#beginGame').click(function() {
    $('.box').hide();
    var troopsToDeploy = 3;
    for (var i = 0; i < troopsToDeploy; i++) {
      var j = i + 1;
      $('.deployTroopSelectBox').append("<option>" + j + "</option>");
    }
    $('#player1DeployBox').show();
  })

// Does the same as the above function, but upon end of the last players turn
$('.endTurn').click(function() {
    $('.box').hide();
    var troopsToDeploy = 3;
    for (var i = 0; i < troopsToDeploy; i++) {
      var j = i + 1;
      $('.deployTroopSelectBox').append("<option>" + j + "</option>");
    }
    $('#player1DeployBox').show();
  })

$('.deployButton').click(function() {
  // Code to push troops to selected territory
  for (var i = 0; i < territories.length; i++) {
    if ($('#p1DeployTerritorySelectBox').val === territories[i].name) {
      territories[i].troops = territories[i].troops + $('p1DeployTroopSelectBox').val;
    }
  }
  // Code to clear selectbox
  // Decrement troopsToDeploy
  if (troopsToDeploy < 1) {
    $('.box').hide();
    $('#player1AttackBox').show();
  }
});

// --------- Attacking Troops ----------

$('.attackButton').click(function() {
  for (var i = 0; i < territories.length; i ++) {
    if ($('#p1AttackFrom').val === territories[i].name) {
      var attacker = territories[i];
    }
    if ($('#p1AttackTo').val === territories[i].name) {
      var defender = territories[i];
    }
  }
  attack(attacker, defender);
});


/* ================ Main Function - Attack =============== */
// This function lets you input the attacking & defending territories,
// defined as indices in array territories, and changes values
// for territories' troops based on how the dice fell. There is a
// check for win conditions (attacker successfully takes a territory),
// and then will allow the attacker to advance troops.

var attack = function(attTerritory, defTerritory) {
  var effectiveTroops = attTerritory.troops - 1;
  // Attackers Dice Count
  if (effectiveTroops < 2) {
    attackerDiceCount = 1;
  } else if (effectiveTroops < 3) {
    attackerDiceCount = 2;
  } else {
    attackerDiceCount = 3;
  }
  // Defenders Dice Count
  if (defTerritory.troops > 1) {
    defenderDiceCount = 2;
  } else {
    defenderDiceCount = 1;
  }
  // Rolling Dice for each player, pushing into their Array
  for (var i = attackerDiceCount; i > 0; i--) {
    attackerDiceResults.push(diceRoll());
  }
  for (var j = defenderDiceCount; j > 0; j--) {
    defenderDiceResults.push(diceRoll());
  }

  // Comparing dice results of two sorted, reversed arrays (of possibly different lengths)
  var sortedAttackerArray = sortArray(attackerDiceResults);
  var sortedDefenderArray = sortArray(defenderDiceResults);
  var k = 0;
  while(k < sortedAttackerArray.length && k < sortedDefenderArray.length) {
    if (sortedAttackerArray[k] > sortedDefenderArray[k]) {
      defTerritory.troops --;
    } else {
      attTerritory.troops --;
    }
    k++;
    // Conquering a territory
    if (defTerritory.troops === 0) {
      attTerritory.troops --;
      defTerritory.troops = 1;
      defTerritory.player = attacker;
      attTerritories.push(defTerritory);
      // defTerritories.splice(/* index of defTerritory */ , 1);
      /* Create drop-down menu function with choices for (attTerritory.troops - 1) */
      return alert(/* Good-looking pop-up to choose how many troops to advance */)
    };
  };
  // jQuery to update the values of changed territories, refocus on attackBox,
  // display message (alert?) stating result, including showing dice rolls.
};
