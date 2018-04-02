
$(document).ready(function () {
    // var nene = $("#neneL");
    // var kim = $("#kimZ");
    // var sheree = $("#shereeW");
    // var kenya = $("#kenyaMD");


    var selectedPlayerDiv = $("#holder");
    var fightDiv = $("#fight");
    var attackbtn = $("button");
    var defenderDiv = $("#available-defenders");
    var startDiv = $("#game-start");
    var fighter;
    var selectedPlayer;
    var defenders= [];
    var kills = 0;
    var turn = 1;
    // var currentFighterBool = false;
    // var currentOpponentBool = false;
    

    var player = {
        "NeNe Leakes": {
            name: "NeNe Leakes",
            health: 200,
            attack: 3,
            counterAttack: 7,
            imageUrl: ("assets/images/nene.png")
    
        }, 
        "Kim Zolciak": {
            name: "Kim Zolciak",
            health: 150,
            attack: 2,
            counterAttack: 10,
            imageUrl: ("assets/images/kim.png" )
    
        }, 
        "Shereè Whitfiled": {
            name: "Shereè Whitfiled",
            health: 170,
            attack:4,
            counterAttack: 11,
            imageUrl: ("assets/images/sheree.png")
    
        }, 
        "Kenya Moore-Daly": {
            name: "Kenya Moore-Daly",
            health: 160,
            attack: 5,
            counterAttack: 12,
            imageUrl: ("assets/images/kenya.png")
        }
    };




  // FUNCTIONS
  // ===================================================================


    var renderPlayer = function(player, startDiv) {
    var playerDiv = $("<div class='player' data-name='" + player.name + "'>");
    var playerName = $("<div class='player-name'>").text(player.name);
    var playerImage = $("<img alt='image' class='player-img'>").attr("src", player.imageUrl);
    var playerHealth = $("<div class='player-health'>").text(player.health);
    var label = $("<div class='player-health-label'>").text("Health Points");
    playerDiv.append(playerName).append(playerImage).append(playerHealth).append(label);
    $(startDiv).append(playerDiv);
  };

  var initializeGame = function() {
    
    for (var key in player) {
      renderPlayer(player[key], startDiv);
      console.log("renderplayer: DONE");
    }
  };

  initializeGame();

  var updatePlayer = function(playerObj,startDiv) {
    $(startDiv).empty();
    renderPlayer(playerObj, startDiv);
    console.log("updateplayer: DONE");
  };


    // This function will render the available-to-attack enemies. This should be run once after a character has been selected
    var renderEnemies = function(enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
          renderPlayer(enemyArr[i], defenderDiv);
          console.log("renderEnemies: DONE");
        }
      };
    
      // Function to handle rendering game messages.
      var renderMessage = function(message) {
        // Builds the message and appends it to the page.
        var gameMessageSet = $("#a-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
      };
    
      // Function which handles restarting the game after victory or defeat.
      var restartGame = function(resultMessage) {
        // When the 'Restart' button is clicked, reload the page.
        var restart = $("<button>Restart</button>").click(function() {
          location.reload();
        });
    
    //     // Build div that will display the victory/defeat message.
        var gameState = $("<div>").text(resultMessage);
    
    //     // Render the restart button and victory/defeat message to the page.
        $("body").append(gameState);
        $("body").append(restart);
      };
    
      // Function to clear the game message section
      var clearMessage = function() {
        var gameMessage = $("#a-message");
    
        gameMessage.text("");
      };
    

  $(startDiv).on("click", ".player", function() {
    var name = $(this).attr("data-name");


    if (!selectedPlayer) {
      
      selectedPlayer = player[name];
      for (var key in player) {
        if (key !== name) {
          defenders.push(player[key]);
          console.log("defenders.push: DONE");
        }
      }

      $(startDiv).hide();
      updatePlayer(selectedPlayer, selectedPlayerDiv);
      renderEnemies(defenders);
    }
  });


   
    $(defenderDiv).on("click", ".player", function() {
        var name = $(this).attr("data-name");
    
     
        if ($("#defender").children().length === 0) {
          defender = player[name];
          updatePlayer(defender, "#defender");
    
  
          $(this).remove();
          clearMessage();
        }
      });

  // When you click the attack button, run the following game logic...
  $(attackbtn).on("click", function() {

    if ($("#defender").children().length !== 0) {
      // Creates messages for our attack and our opponents counter attack.
      var attackMessage = "You attacked " + defender.name + " for " + selectedPlayer.attack * turn + " damage.";
      var counterAttackMessage = defender.name + " attacked you back for " + defender.counterAttack + " damage.";
      clearMessage();

      // Reduce defender's health by your attack value.
      defender.health -= selectedPlayer.attack * turn;

      // If the enemy still has health..
      if (defender.health > 0) {
        // Render the enemy's updated character card.
        updatePlayer(defender, "#defender");

        // Render the combat messages.
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        // Reduce your health by the opponent's attack value.
        selectedPlayer.health -= defender.counterAttack;

        // Render the player's updated character card.
        updatePlayer(selectedPlayer, selectedPlayerDiv);

        // If you have less than zero health the game ends.
        // We call the restartGame function to allow the user to restart the game and play again.
        if (selectedPlayer.health <= 0) {
            console.log("DEAD");
          clearMessage();
          restartGame("You have been defeated...GAME OVER!!!");
          $(attackbtn).off("click");
        }
      }
      else {
        // If the enemy has less than zero health they are defeated.
        // Remove your opponent's character card.
        $("#defender").empty();

        var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
        renderMessage(gameStateMessage);

        // Increment your kill count.
        kills++;

        // If you have killed all of your opponents you win.
        // Call the restartGame function to allow the user to restart the game and play again.
        if (kills >= defenders.length) {
          clearMessage();
          $(attackbtn).off("click");
          restartGame("You Won!!!! GAME OVER!!!");
        }
      }
      // Increment turn counter. This is used for determining how much damage the player does.
      turn++;
    }
    else {
      // If there is no defender, render an error message.
      clearMessage();
      renderMessage("No enemy here.");
    }
  });



















































});




    
    // $( ".player" ).click(function(player) {
    //     console.log(player);
    // $( player ).map(function() {
    //         return this.id;
    //     })
    //     console.log(this.id)
    //     if (this.id === player.id){
    //         console.log(player.name)
    //     }
    //     else{
    //         console.log("ERR");
    //     }
  

//     function selectedPlayer (){
//         if(!currentFighterBool){
//         document.getElementById("holder").append(this);
//         var index = -1;
//         var val = this.id;
//         currentFighter = player.fighters.find(function(item,j){
//             if(item.id === val){
//                 index = j;
//                 return j;
//             }
//         });
//         for (var i = 0; i< player.fighters.length; i++) {
//             if(!i === index){
//                 document.getElementById("defender").append(player.fighters[i].id);
//             }
//        }  
//         currentFighterBool = true;
//     }
//     // window.alert(currentFighter.id + " "+ index);
//     }

//     // var selects = [nene, kim, sheree, kenya];
   
//     var i;

//         for (var i = 0; i< player.fighters.length; i++) {
//              document.getElementById(player.fighters[i].id).addEventListener("click", selectedPlayer);
//         }   
//         console.log(player);
          




