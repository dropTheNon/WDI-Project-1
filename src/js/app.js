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
var turnCount = 0;
var attackerDiceCount;
var defenderDiceCount;
var attackerDiceResults = [];
var defenderDiceResults = [];
var attTerritories = [];
var p1Territories = [];
var p2Territories = [];
var territories = [
  {
    // Example territory as object in array
    'name': 'Classroom2',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */]
  },
  {

  }
];


/* ================ Declaring some functions =============== */

// Function to use in filtering our array
// var attackerArray = function(obj) {
//   if (obj === attacker
// }

// Determine who the attacker is
var whoseTurn = function() {
  if (turnCount % 2 === 0) {
    attacker = p1;
  } else {
    attacker = p2;
    attTerritories = p2Territories;
  }
  attTerritories = territories.filter(function(array) {
    return(array.player === attacker)
  })
};

// Function to hide non-playing player's box
var whoseBox = function() {
  if (turnCount % 2 === 0) {
    $('.p2').hide();
  } else {
    $('.p1').hide();
  }
};

// Dice roll function
var diceRoll = function() {
  return Math.floor(Math.random() * 6) + 1;
};

// Function to sort and reverse array of dice results
var sortArray = function(array) {
  return array.sort().reverse();
};

// Function to create deployHowMany troops select-box
var deployTroopsLoop = function () {
  for (var i = 0; i < troopsToDeploy; i++) {
    var j = i + 1;
    $('.deployHowMany').append("<option value='" + j + "'>" + j + "</option>");
  }
};

// Function to create deployToTerritory select-box
var deployOntoLoop = function () {
  for (var i = 0; i < attTerritories.length; i++) {
    $('.deployToTerritory').append("<option value='" + i + "'>" + attTerritories[i].name + "</option");
  }
};

// Function to create attackFromSelect box
var attackFrom = function() {
  var j = i + 1;
  for (var i = 0; i < attTerritories.length; i++) {
    if (attTerritories[i].troops > 1) {
      $('.attackFromSelect').append("<option value='" + j + "'>" + attTerritories[i].name + "</option>");
    }
  }
};

// Function to create attackToSelect box
// var attackTo = function() {
//   for (var i = 0; i < attTerritories.length; i++) {
//     if (attTerritories[])
//   }
// }

// Function to Advance troops
var advanceTroops = function() {
  var advanceableTroops = attTerritory.troops - 1;
  var j = i + 1;
  if (advanceableTroops > 0) {
    for (var i = 0; i < advanceableTroops; i++) {
      $('.advanceTroopsSelect').append("<option value='" + j + "'>" + j + "</option>" )
    }
  }
};

/* =============== Click Event Delegation Declaration ============= */


// ------- Deploying Troops --------

// Upon beginning game, shows P1 Deploy Box, populates selectbox with # of troop options
$('#beginGame').click(function() {
  // Code function for Territory Drop
  // Hide all .box divs
  $('.box').hide();
  // Run function whoseTurn to set var attacker, populate attTerritory array
  whoseTurn();
  var troopsToDeploy = 3;
  deployTroopsLoop();
  deployOntoLoop();
  $('.deployBox').show();
  whoseBox();
});

// Does the same as the above function, but upon end of the last players turn
$('.endTurnButton').click(function() {
  turnCount ++;
  // Working on this bit below!
  p2Territories = territories.filter(territories)
  // This bit above!
  whoseTurn();
  $('.form').reset();
  $('.box').hide();
  var troopsToDeploy = 3;
  deployTroopsLoop();
  deployOntoLoop();
  $('.deployBox').show();
  whoseBox();
});


$('.deployButton').click(function() {
  // Pushes troops to selected territory
  var numTroopsToBeDeployed = $('.deployTroopSelectBox option:selected').text;
  for (var i = 0; i < territories.length; i++) {
    var terrToDeployOn = $('.deployToTerritorySelectBox option:selected').text
    if (terrToDeployOn === territories[i].name) {
      numTroopsToBeDeployed = parseInt(numTroopsToBeDeployed, 10);
      territories[i].troops = territories[i].troops + numTroopsToBeDeployed;
    }
  }
  // Clears selectboxes (I hope!!!)
  $('.deployTroopSelectBox').reset();
  // Decrement troopsToDeploy
  troopsToDeploy = troopsToDeploy - numTroopsToBeDeployed;
  // Checking to see if deployment still ongoing
  if (troopsToDeploy < 1) {
    $('.box').hide();
    $('.form').reset();
    $('.attackBox').show();
    whoseBox();
  } else {
    deployTroopsLoop();
  }
});

// --------- Attacking ----------

$('.attackButton').click(function() {
  for (var i = 0; i < territories.length; i ++) {
    if ($('.attackFromSelect option:selected').val === territories[i].name) {
      var attacker = territories[i];
    }
    if ($('.attackToSelect option:selected').val === territories[i].name) {
      var defender = territories[i];
    }
  }
  attack(attacker, defender);
});

/* ------------ Advancing Troops ----------------- */
// What happens when "Attack" is clicked AND attacker conquers a territory

$('.advanceButton').click(function() {
  $('.advanceBox').hide();
  $('.attackBox').show();
  whoseBox();
})


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
      // Decrement attackers troops (for placeholder of new territory)
      attTerritory.troops --;
      // Conserving that troop
      defTerritory.troops = 1;
      // Changing ownership of territory
      defTerritory.player = attacker;
      // Pushing territory into attTerritories array
      attTerritories.push(defTerritory);
      // Need to advance troops
      if (attTerritory.troops > 1) {
        advanceTroops();
        $('.box').hide();
        $('.advanceBox').show();
        whoseBox();
      }
    };
  };
  // jQuery to update the values of changed territories, refocus on attackBox,
  // display message (alert?) stating result, including showing dice rolls.
};
