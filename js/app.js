$(document).ready(function() {
  // $('#testButton').click(function() {
  //   alert('Testing button');
  // });
  $('.box').hide();
  // $('#player1AttackBox').show();
});

/* ================= Our Game Board ===================== */

var territories = [
  {
    'name': 'Classroom 1',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      'Classroom 2',
      'Factory',
      'Cunningham Conference Room'
    ]
  },
  {
    'name': 'Classroom 2',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      'Classroom 1',
      'Classroom 3',
      'Cunningham Conference Room'
    ]
  },
  {
    'name': 'Classroom 3',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      'Classroom 2',
      'Lounge',
      'Front Lines'
    ]
  },
  {
    'name': 'Lounge',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      'Work Area',
      'Classroom 3',
      'Kitchen'
    ]
  },
  {
    'name': 'Work Area',
    'player': 'neutral',
    'troops': 3,
    'borders': [/* Array of territory names this territory can attack or reinforce */
      'Kitchen',
      'Classroom 4',
      'Lounge',
      'Mens Loo'
    ]
  },
  {
    'name': 'Kitchen',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Front Lines',
      'Work Area'
    ]
  },
  {
    'name': 'Front Lines',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Kitchen',
      'Mens Loo',
      'Womens Loo',
      'Classroom 3',
      'Cunningham Conference Room',
      'Elevators'
    ]
  },
  {
    'name': 'Cunningham Conference Room',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Front Lines',
      'Classroom 2',
      'Classroom 1',
      'Factory',
      'Stairs 1',
      'Elevators'
    ]
  },
  {
    'name': 'Factory',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Classroom 1',
      'Cunningham Conference Room',
      'Stairs 1',
      'Elevators'
    ]
  },
  {
    'name': 'Stairs 1',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Factory',
      'Cunningham Conference Room',
      'Elevators'
    ]
  },
  {
    'name': 'Elevators',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Stairs 2',
      'Cunningham Conference Room',
      'Stairs 1',
      'Womens Loo',
      'Front Lines'
    ]
  },
  {
    'name': 'Womens Loo',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Solo Stall 2',
      'Elevators',
      'Stairs 2'
    ]
  },
  {
    'name': 'Solo Stall 2',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Solo Stall 1',
      'Womens Loo',
      'Stairs 2'
    ]
  },
  {
    'name': 'Stairs 2',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Solo Stall 2',
      'Elevators',
      'Womens Loo',
      'Mens Loo',
      'Classroom 4'
    ]
  },
  {
    'name': 'Solo Stall 1',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Solo Stall 2'
    ]
  },
  {
    'name': 'Classroom 4',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Mens Loo',
      'Work Area',
      'Stairs 2'
    ]
  },
  {
    'name': 'Mens Loo',
    'player': 'neutral',
    'troops': 3,
    'borders': [
      'Work Area',
      'Classroom 4',
      'Stairs 2'
    ]
  }
];

/* =============== Declaring some variables =============== */


var p1;
var p2;
var attacker;
var defender;
var turnCount = 0;
var troopsToDeploy;
var attackFromInput;
var attackerDiceCount;
var defenderDiceCount;
var advancingTerritory;
var advanceableTroops;
var troopsToAdvance;
var receivingTerritory;
var numTroopsToBeDeployed;
var terrToDeployOn;
var territoryAttacking;
var territoryDefending;
var numTerritories = territories.length;
var numPlayers = 2;
var totPlayers = numPlayers + 1;
var numToDrop;
var terrToPush1;
var terrToPush2;
var attackerDiceResults = [];
var defenderDiceResults = [];
var attTerritories = [];
var p1Territories = [];
var p2Territories = [];


/* ================ Declaring some functions =============== */

// Determines initial drop of territories
var dropFunction = function() {
  numToDrop = numTerritories / totPlayers;
  while (p1Territories.length < numToDrop) {
    terrToPush1 = territories[Math.floor(Math.random() * territories.length)];
    if (terrToPush1.player === 'neutral') {
      terrToPush1.player = 'p1';
      p1Territories.push(terrToPush1);
    }
  }
  while (p2Territories.length < numToDrop) {
    terrToPush2 = territories[Math.floor(Math.random() * territories.length)];
    if (terrToPush2.player === 'neutral') {
      terrToPush2.player = 'p2';
      p2Territories.push(terrToPush2);
    }
  }
};

// Determine a winner
var winCheck = function() {
  if (p1Territories.length === 0 || p2Territories.length === 0)
    alert(attacker + ' wins!');
}

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
    if (turnCount % 2 === 0) {
      $('.deployHowMany.p1').append('<option value="' + j + '">' + j + '</option>');
    } else {
      $('.deployHowMany.p2').append('<option value="' + j + '">' + j + '</option>');
    }
  }
};

// Function to create deployToTerritory select-box
var deployOntoLoop = function () {
  $('.deployToTerritory').html('<option value="0" disabled selected hidden>Select territory to deploy onto...</option>');
  for (var i = 0; i < attTerritories.length; i++) {
    if (turnCount % 2 === 0) {
      $('.deployToTerritory.p1').append('<option value="' + attTerritories[i].name + '">' + attTerritories[i].name + '</option>');
    } else {
      $('.deployToTerritory.p2').append('<option value="' + attTerritories[i].name + '">' + attTerritories[i].name + '</option>');
    }
  }
};

// Function to create attackFromSelect box
var attackFrom = function() {
  $('.attackFromSelect').html('<option value="0" disabled selected hidden>Attack with</option>');
  whoseTurn();
  for (var i = 0; i < attTerritories.length; i++) {
    if (attTerritories[i].troops > 1) {
      if (turnCount % 2 === 0) {
        $('.attackFromSelect.p1').append("<option value='" + attTerritories[i].name + "'>" + attTerritories[i].name + "</option>");
      } else {
        $('.attackFromSelect.p2').append("<option value='" + attTerritories[i].name + "'>" + attTerritories[i].name + "</option>");
      }
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
    if (turnCount % 2 === 0) {
      $('.attackToSelect.p1').append("<option value='" + finalAttArr[k] + "'>" + finalAttArr[k] + "</option>");
    } else {
      $('.attackToSelect.p2').append("<option value='" + finalAttArr[k] + "'>" + finalAttArr[k] + "</option>");
    }
  }
  $('.attackButton').show();
};



// Function to create dropdowns to advance troops
var advanceTroops = function(attTerritory, defTerritory) {
  $('.advanceTroopsSelect').html('<option value="0" disabled selected hidden>How many troops to advance?</option>');
  advanceableTroops = parseInt(attTerritory.troops) - 1;
  if (advanceableTroops > 0) {
    for (var i = 0; i <= advanceableTroops; i++) {
      // var j = i - 1;
      if (turnCount % 2 === 0) {
        $('.advanceTroopsSelect.p1').append("<option value='" + i + "'>" + i + "</option>");
      } else {
        $('.advanceTroopsSelect.p2').append("<option value='" + i + "'>" + i + "</option>");
      }
    }
  }
  advancingTerritory = attTerritory;
  receivingTerritory = defTerritory;
  attackFrom();
};

// Function to actually advance the troops!
var advanceTheTroops = function(advancingTerritory, receivingTerritory, advanceableTroops) {
  console.log(advanceableTroops);
  advancingTerritory.troops = parseInt(advancingTerritory.troops) - parseInt(advanceableTroops);
  console.log(advancingTerritory.troops);
  receivingTerritory.troops = parseInt(receivingTerritory.troops) + parseInt(advanceableTroops);
  whoseTurn();
  console.log(attTerritories);
  console.log(territories);
};

/* =============== Click Event Delegation Declaration ============= */


// ------- Deploying Troops --------

// Upon beginning game, shows P1 Deploy Box, populates selectbox with # of troop options
$('#beginGame').click(function() {
  console.log(territories);
  dropFunction();
  console.log(p1Territories);
  console.log(p2Territories);
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
  // console.log(territories);
  // console.log("Player 1's territories are: " + attTerritories);
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
  $('.deployBox, .deployBox *').show();
  whoseBox();
  console.log(turnCount);
  console.log(attTerritories);
});


$('.deployButton').click(function(e) {
  e.preventDefault();
  // Pushes troops to selected territory
  if (turnCount % 2 === 0) {
    numTroopsToBeDeployed = $('.deployHowMany.p1').val();
    terrToDeployOn = $('.deployToTerritory.p1').val();
  } else {
    numTroopsToBeDeployed = $('.deployHowMany.p2').val();
    terrToDeployOn = $('.deployToTerritory.p2').val();
  }
  console.log(numTroopsToBeDeployed);
  console.log(terrToDeployOn);
  for (var i = 0; i < territories.length; i++) {
    if (terrToDeployOn === territories[i].name) {
      territories[i].troops = parseInt(numTroopsToBeDeployed) + parseInt(territories[i].troops);
      // console.log(territories);

      // console.log(numTroopsToBeDeployed);
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
    attackFrom();
    $('.attackBox, .attackBox *').show();
    whoseBox();
    $('.attackButton').hide();
  } else {
    deployTroopsLoop();
    deployOntoLoop();
  }
});

// --------- Attacking ----------

// Event listener to create attackTo select-box upon selection of attackFrom select-box
$('.attackFromSelect').on("change", function() {
  if (turnCount % 2 === 0) {
    attackFromInput = $('.attackFromSelect.p1').val();
  } else {
    attackFromInput = $('.attackFromSelect.p2').val();
  }
  attackTo(attackFromInput);
  $('.attackButton').show();
  whoseBox();
});

// Click event for Attack button, running our attack function
$('.attackButton').click(function() {
  $('.dialogueBox').html('');
  attackerDiceCount = [];
  attackerDiceResults = [];
  defenderDiceCount = [];
  defenderDiceResults = [];
  if (turnCount % 2 === 0) {
    territoryAttacking = $('.attackFromSelect.p1').val();
    territoryDefending = $('.attackToSelect.p1').val();
  } else {
    territoryAttacking = $('.attackFromSelect.p2').val();
    territoryDefending = $('.attackToSelect.p2').val();
  }
  for (var i = 0; i < territories.length; i ++) {
    if (territoryAttacking === territories[i].name) {
      attackingTerritory = territories[i];
    }
    if (territoryDefending === territories[i].name) {
      // console.log(i);
      defendingTerritory = territories[i];
      // console.log(territories[i]);
    }
  }
  attack(attackingTerritory, defendingTerritory);
  $('.attackButton').hide();
  attackFrom();
});

/* ------------ Advancing Troops ----------------- */

// Click event for Advance troops button
$('.advanceButton').click(function() {
  if (turnCount % 2 === 0) {
    troopsToAdvance = $('.advanceTroopsSelect.p1').val();
  } else {
    troopsToAdvance = $('.advanceTroopsSelect.p2').val();
  }
  $('.advanceBox').hide();
  // $('.attackFromSelect').val("0");
  // $('.attackToSelect').val("0");
  console.log(territories);
  console.log(attTerritories);
  advanceTheTroops(advancingTerritory, receivingTerritory, troopsToAdvance);
  console.log("advanceableTroops: " + advanceableTroops);
  console.log("advancingTerritory: " + advancingTerritory.name + " and receivingTerritory: " + receivingTerritory.name);
  attackFrom();
  $('.attackBox, .attackBox *').show();
  whoseBox();
});


/* ================ Main Function - Attack =============== */
// This function lets you input the attacking & defending territories,
// defined as indices in array territories, and changes values
// for territories' troops based on how the dice fell. There is a
// check for win conditions (attacker successfully takes a territory),
// and then will allow the attacker to advance troops.

var attack = function(attTerritory, defTerritory) {

  if (attTerritory.player === defTerritory.player) {
    alert('You can\'t attack yourself, dummy!');
  } else {
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
      attTerritory.troops = parseInt(attTerritory.troops) - 1;
      // Conserving that troop
      defTerritory.troops = 1;
      // Changing ownership of territory
      defTerritory.player = attacker;
      // Pushing territory into attTerritories array
      attTerritories.push(defTerritory);
      if (turnCount % 2 === 0) {
        p1Territories.push(defTerritory);
      } else {
        p2Territories.push(defTerritory);
      }
      winCheck();
      // Need to advance troops
      if (attTerritory.troops > 1) {
        advanceTroops(attTerritory, defTerritory);
        $('.box').hide();
        $('.advanceBox, .advanceBox *').show();
        whoseBox();
      }
    };
    // jQuery to update the values of changed territories, refocus on attackBox,
    // display message (alert?) stating result, including showing dice rolls.
    $('.dialogueBox').append('<p>' + attacker + ' attacked ' + defTerritory.name + ' with ' + attTerritory.name + ', which left ' + defTerritory.name + ' with ' + defTerritory.troops + ' troops, and ' + attTerritory.name + ' with ' + attTerritory.troops + ' troops.</p>');
  }
};
