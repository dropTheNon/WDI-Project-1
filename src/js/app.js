$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
  $('.box').hide();
  // $('#player1AttackBox').show();
});


/* =============== Declaring some variables =============== */


var p1;
var p2;
var attacker;
var turnCount = 0;
var troopsToDeploy;
var attackerDiceCount;
var defenderDiceCount;
var advancingTerritory;
var advanceableTroops;
var receivingTerritory;
var attackerDiceResults = [];
var defenderDiceResults = [];
var attTerritories = [];
var p1Territories = [];
var p2Territories = [];
var territories = [
  {
    // Example territory as object in array
    'name': 'Classroom1',
    'player': 'p1',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      "Classroom2",
      "Classroom3",
      "Teachers Lounge",
      "Office"
    ]
  },
  {
    'name': 'Classroom2',
    'player': 'p2',
    'troops': 1,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      "Classroom1",
      "Classroom3",
      "Teachers Lounge",
      "Office"
    ]
  },
  {
    'name': 'Classroom3',
    'player': 'p2',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      "Classroom2",
      "Classroom1",
      "Teachers Lounge"
    ]
  },
  {
    'name': 'Teachers Lounge',
    'player': 'p1',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      "Classroom2",
      "Classroom3",
      "Classroom1",
      "Office"
    ]
  },
  {
    'name': 'Office',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      "Classroom2",
      "Classroom1",
      "Teachers Lounge"
    ]
  }
];


/* ================ Declaring some functions =============== */

// Determine who the attacker is
var whoseTurn = function() {
  if (turnCount % 2 === 0) {
    attacker = "p1";
  } else {
    attacker = "p2";
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
  $('.deployHowMany').html('<option value="0" disabled selected hidden>Select number of troops...</option>');
  for (var i = 0; i < troopsToDeploy; i++) {
    var j = i + 1;
    $('.deployHowMany').append('<option value="' + j + '">' + j + '</option>');
  }
};

// Function to create deployToTerritory select-box
var deployOntoLoop = function () {
  $('.deployToTerritory').html('<option value="0" disabled selected hidden>Select territory to deploy onto...</option>');
  for (var i = 0; i < attTerritories.length; i++) {
    $('.deployToTerritory').append('<option value="' + attTerritories[i].name + '">' + attTerritories[i].name + '</option>');
  }
};

// Function to create attackFromSelect box
var attackFrom = function() {
  $('.attackFromSelect').html('<option value="0" disabled selected hidden>Attack with</option>');
  whoseTurn();
  for (var i = 0; i < attTerritories.length; i++) {
    if (attTerritories[i].troops > 1) {
      $('.attackFromSelect').append("<option value='" + attTerritories[i].name + "'>" + attTerritories[i].name + "</option>");
    }
  }
};

// Function to create attackToSelect box
var attackTo = function(attackFromInput) {
  $('.attackToSelect').html('<option value="0" disabled selected hidden>Attack to</option>');
  // Looping through attacker's territories to get the territory names (arrAttNames) and
  // territories that our selected attackFrom territory can attack (tempArray)
  var arrAttNames = [];
  for (var i = 0; i < attTerritories.length; i++) {
    arrAttNames.push(attTerritories[i].name);
    if (attTerritories[i].name === attackFromInput) {
      var tempArray = attTerritories[i].borders;
    }
  }
  // Creating final array of attackable territories to use in populating the dropdown
  var finalAttArr = [];
  // Using
  for (var j = 0; j < tempArray.length; j++) {
    if (arrAttNames.indexOf(tempArray[j]) === -1) {
      finalAttArr.push(tempArray[j]);
    }
  }
  for (var k = 0; k < finalAttArr.length; k++) {
    $('.attackToSelect').append("<option value='" + finalAttArr[k] + "'>" + finalAttArr[k] + "</option>");
  }
  $('.attackButton').show();
};



// Function to create dropdowns to advance troops
var advanceTroops = function(attTerritory, defTerritory) {
  $('.advanceTroopsSelect').html('<option value="0" disabled selected hidden>How many troops to advance?</option>')
  advanceableTroops = parseInt(attTerritory.troops) - 1;
  if (advanceableTroops > 0) {
    for (var i = 0; i <= advanceableTroops; i++) {
      $('.advanceTroopsSelect').append("<option value='" + i + "'>" + i + "</option>" )
    }
  }
  advancingTerritory = attTerritory;
  receivingTerritory = defTerritory;
  attackFrom();
};

// Function to actually advance the troops!
var advanceTheTroops = function(advancingTerritory, receivingTerritory, advanceableTroops) {
  advancingTerritory.troops = parseInt(advancingTerritory.troops) - parseInt(advanceableTroops);
  receivingTerritory.troops = parseInt(receivingTerritory.troops) + parseInt(advanceableTroops);
};

/* =============== Click Event Delegation Declaration ============= */


// ------- Deploying Troops --------

// Upon beginning game, shows P1 Deploy Box, populates selectbox with # of troop options
$('#beginGame').click(function() {
  $('#beginGame').hide();

  /* !!!!!!!! ~~~~~~~~~~~   Code function for Territory Drop ~~~~~~~~~~~ !!!!!!! */

  // Hide all .box divs
  $('.box').hide();
  // Run function whoseTurn to set var attacker, populate attTerritory array
  whoseTurn();
  // Run functions to create dropdown menus for deploying
  troopsToDeploy = 3;
  deployTroopsLoop();
  deployOntoLoop();
  // Show deploybox
  $('.deployBox').show();
  // Hide non-playing player's box
  whoseBox();
  // Console-logging to test functionality
  console.log(territories);
  console.log("Player 1's territories are: " + attTerritories);
});

// Does the same as the above function, but upon end of the last players turn
$('.endTurnButton').click(function() {
  turnCount ++;
  attTerritories = [];
  troopsToDeploy = 3;
  whoseTurn();
  // $('.form').reset();
  $('.box').hide();
  deployTroopsLoop();
  deployOntoLoop();
  $('.deployBox').show();
  whoseBox();
  console.log(turnCount);
  console.log(attTerritories);
});


$('.deployButton').click(function(e) {
  e.preventDefault();
  // Pushes troops to selected territory
  var numTroopsToBeDeployed = $('.deployHowMany').val();
  console.log(numTroopsToBeDeployed);
  var terrToDeployOn = $('.deployToTerritory').val();
  console.log(terrToDeployOn);
  for (var i = 0; i < territories.length; i++) {
    if (terrToDeployOn === territories[i].name) {
      territories[i].troops = parseInt(numTroopsToBeDeployed) + parseInt(territories[i].troops);
      console.log(territories);
      console.log(numTroopsToBeDeployed);
    }
  }
  // Clears selectboxes (I hope!!!)
  $('.deployHowMany').val("0");
  $('.deployToTerritory').val("0");
  // Decrement troopsToDeploy
  troopsToDeploy = troopsToDeploy - numTroopsToBeDeployed;
  // console.log(territories);
  console.log(troopsToDeploy);
  // Checking to see if deployment still ongoing
  if (troopsToDeploy < 1) {
    $('.box').hide();
    // $('.form').reset();
    $('.attackButton').hide();
    attackFrom();
    $('.attackBox').show();
    whoseBox();
  } else {
    deployTroopsLoop();
    deployOntoLoop();
  }
});

// --------- Attacking ----------

// Event listener to create attackTo select-box upon selection of attackFrom select-box
$('.attackFromSelect').on("change", function() {
  var attackFromInput = $('.attackFromSelect').val();
  attackTo(attackFromInput);
  $('.attackButton').show();
});

// Click event for Attack button, running our attack function
$('.attackButton').click(function() {
  $('.dialogueBox').html('');
  attackerDiceCount = [];
  attackerDiceResults = [];
  defenderDiceCount = [];
  defenderDiceResults = [];
  var attacker;
  var defender;
  for (var i = 0; i < territories.length; i ++) {
    if ($('.attackFromSelect option:selected').val() === territories[i].name) {
      attacker = territories[i];
    }
    if ($('.attackToSelect option:selected').val() === territories[i].name) {
      // console.log(i);
      defender = territories[i];
      // console.log(territories[i]);
    }
  }
  attack(attacker, defender);
  $('.attackButton').hide();
  attackFrom();
});

/* ------------ Advancing Troops ----------------- */

// Click event for Advance troops button
$('.advanceButton').click(function() {
  var troopsToAdvance = $('.advanceButton').val();
  $('.advanceBox').hide();
  // $('.attackFromSelect').val("0");
  // $('.attackToSelect').val("0");
  console.log(territories);
  console.log(attTerritories);
  advanceTheTroops(advancingTerritory, receivingTerritory, advanceableTroops);
  attackFrom();
  $('.attackBox').show();
  whoseBox();
});


/* ================ Main Function - Attack =============== */
// This function lets you input the attacking & defending territories,
// defined as indices in array territories, and changes values
// for territories' troops based on how the dice fell. There is a
// check for win conditions (attacker successfully takes a territory),
// and then will allow the attacker to advance troops.

var attack = function(attTerritory, defTerritory) {

  var effectiveTroops = parseInt(attTerritory.troops) - 1;
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
  $('.dialogueBox').append('<p>' + sortedAttackerArray + '</p>');
  var sortedDefenderArray = sortArray(defenderDiceResults);
  $('.dialogueBox').append('<p>' + sortedDefenderArray + '</p>');
  var k = 0;
  while(k < sortedAttackerArray.length && k < sortedDefenderArray.length) {
    if (sortedAttackerArray[k] > sortedDefenderArray[k]) {
      defTerritory.troops --;
    } else {
      attTerritory.troops --;
    }
    k++;
  };
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
      advanceTroops(attTerritory, defTerritory);
      $('.box').hide();
      $('.advanceBox').show();
      whoseBox();
    }
  };
  // jQuery to update the values of changed territories, refocus on attackBox,
  // display message (alert?) stating result, including showing dice rolls.
  $('.dialogueBox').append('<p>' + attacker + ' attacked ' + defTerritory.name + ' with ' + attTerritory.name + ', which left ' + defTerritory.name + ' with ' + defTerritory.troops + ' troops, and ' + attTerritory.name + ' with ' + attTerritory.troops + ' troops.</p>');
};
