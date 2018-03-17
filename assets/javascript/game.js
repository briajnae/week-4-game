
$(document).ready(function () {
    // var nene = $("#neneL");
    // var kim = $("#kimZ");
    // var sheree = $("#shereeW");
    // var kenya = $("#kenyaMD");


    var selectedPlayer = $("#holder");
    var fight = $("#fight");
    var attack = $("button");
    var enemies = $("#defender");
    var gameStart = $("#game-start");

    var player = {
        "nene": {
            name: "NeNe Leakes",
            health: 200,
            attack: 7,
            counterAttack: 14
    
        },
        "kim": {
            name: "Kim Zolciak",
            health: 130,
            attack: 6,
            counterAttack: 20
    
        },
        "sheree": {
            name: "Shereè Whitfiled",
            health: 170,
            attack: 9,
            counterAttack: 15
    
        },
        "kenya": {
            name: "Kenya Moore-Daly",
            health: 150,
            attack: 8,
            counterAttack: 18,
            image: '<img src="assets/images/kenya.png" id="kenya-pic" />'
    
        }
    }
    
    // var selects = [nene, kim, sheree, kenya];
    var selectsVal = {};
    var i;

        for (var i = 0; i< player.length; i++) {
            player[i].addEventListener("click", player(i));
            selectsVal += player();
        }   
        console.log(player);
            
});













