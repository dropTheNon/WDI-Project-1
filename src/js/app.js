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
    'troops': 3,
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
  $('.deployHowMany').html('<option value="0" disabled selected hidden>Select number of troops...</option>');
  for (var i = 0; i < troopsToDeploy; i++) {
    var j = i + 1;
    $('.deployHowMany').append("<option value='" + j + "'>" + j + "</option>");
  }
};

// Function to create deployToTerritory select-box
var deployOntoLoop = function () {
  $('.deployToTerritory').html('<option value="0" disabled selected hidden>Select territory to deploy onto...</option>');
  for (var i = 0; i < attTerritories.length; i++) {
    $('.deployToTerritory').append("<option value='" + attTerritories[i].name + "'>" + attTerritories[i].name + "</option");
  }
};

// Function to create attackFromSelect box
var attackFrom = function() {
  for (var i = 0; i < attTerritories.length; i++) {
    if (attTerritories[i].troops > 1) {
      $('.attackFromSelect').append("<option value='" + attTerritories[i].name + "'>" + attTerritories[i].name + "</option>");
    }
  }
};

// Function to create attackToSelect box
var attackTo = function(attackFromInput) {
  $('.attackToSelect').html('');

  for (var i = 0; i < attTerritories.length; i++) {
    if (attackFromInput === attTerritories[i].name) {
      var tempArray = attTerritories[i].borders;
      console.log(tempArray);
      for (var j = 0; j < tempArray.length; j++) {
        if (tempArray[j].player !== attacker) {
          $('.attackToSelect').append("<option value='" + tempArray[j] + "'>" + tempArray[j] + "</option>");
        }
      }
    }
  }
  $('.attackButton').show();
};



// Function to Advance troops
var advanceTroops = function() {
  var advanceableTroops = attTerritory.troops - 1;
  if (advanceableTroops > 0) {
    for (var i = 0; i < advanceableTroops; i++) {
      var j = i + 1;
      $('.advanceTroopsSelect').append("<option value='" + j + "'>" + j + "</option>" )
    }
  }
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
  whoseTurn();
  $('.form').reset();
  $('.box').hide();
  deployTroopsLoop();
  deployOntoLoop();
  $('.deployBox').show();
  whoseBox();
});


$('.deployButton').click(function(e) {
  e.preventDefault();
  // Pushes troops to selected territory
  var numTroopsToBeDeployed = $('.deployHowMany option:selected').val();
  for (var i = 0; i < territories.length; i++) {
    var terrToDeployOn = $('.deployToTerritory option:selected').text();
    console.log(terrToDeployOn);
    if (terrToDeployOn === territories[i].name) {
      territories[i].troops = parseInt(numTroopsToBeDeployed) + parseInt(territories[i].troops);
    }
  }
  // Clears selectboxes (I hope!!!)
  $('.deployHowMany').val("0");
  $('.deployToTerritory').val("0");
  // Decrement troopsToDeploy
  troopsToDeploy = troopsToDeploy - numTroopsToBeDeployed;
  console.log(territories);
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
});

// Click event for Attack button, running our attack function
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

// Click event for Advance troops button
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

  /* !!!!! --------- Need to work on this bit below, perhaps? -------- !!!!!!!! */

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
