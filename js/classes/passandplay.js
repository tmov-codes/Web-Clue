function Game(arr,squareSize)
{
  // INITIALIZATION
  // card init
  this.deck = new Deck();
  //this.deck.buildDeck();
  
  this.tileSize = squareSize;
  
  // player init
  this.players = [];
  for(var i=0; i<arr.length; i++)
  {
    this.players.push(new Player(arr[i].playerName, arr[i].charName, i, 25/2));
  }
  
  // background init
  this.board = new Canvas('boardCanvas');
  this.knownBkg = new Canvas('knownCanvas');
  
  // spaces init
  this.spaces = new Graph();
  this.spaceCanvas = new Canvas('spaces');
  this.rooms = [];
  this.die = [1,2,3,4,5,6];
  
  this.lastPlayersActions = "";
  
  this.spaceSelection = false;
  this.activePlayer = 0;
  this.numSpaces = 0;
  var scope = this;
  
  
  // FUNCTION DEFININTIONS
  this.checkCrime = function(suspect, weapon, room)
  {
    if(this.deck.checkCrime(suspect, weapon, room))
    {
      // display "end game" screen
      return true;
    }
    {
      // display "you lost" screen
	  // show the number correct
	  // give user the option to see the crime
      // if this is a pass & play, provide the "pass" option
      return this.deck.getNumCorrect(suspect, weapon, room);
    }
  }
  
  this.getCrime = function()
  {
    return this.deck.crime;
  }
  
  // SET FUNCTIONS
  this.setRooms = function() // move this function to game.js
  {
    this.rooms.push(new Room());
	this.rooms[0].setBallroom();
	this.rooms.push(new Room());
	this.rooms[1].setCave();
	this.rooms.push(new Room());
	this.rooms[2].setCottage();
	this.rooms.push(new Room());
	this.rooms[3].setForest();
	this.rooms.push(new Room());
	this.rooms[4].setGarden();
	this.rooms.push(new Room());
	this.rooms[5].setGrotto();
	this.rooms.push(new Room());
	this.rooms[6].setKitchen();
	this.rooms.push(new Room());
	this.rooms[7].setTent();
	this.rooms.push(new Room());
	this.rooms[8].setTower();
  }
  
  this.setSpaces = function() // move this function to game.js
  {
    // x = 1
	this.spaces.addEdge(new Point(1,6), new Point(2,6));
	this.spaces.addEdge(new Point(1,19), new Point(2,19));
	
	// x = 2
	this.spaces.addEdge(new Point(2,6), new Point(3,6));
	this.spaces.addEdge(new Point(2,6), new Point(2,5));
	this.spaces.addEdge(new Point(2,5), new Point(3,5));
	
	this.spaces.addEdge(new Point(2,12), new Point(3,12));
	
	this.spaces.addEdge(new Point(2,19), new Point(3,19));
	this.spaces.addEdge(new Point(2,19), new Point(2,18));
	this.spaces.addEdge(new Point(2,18), new Point(3,18));
	
	// x = 3
	this.spaces.addEdge(new Point(3,5), new Point(4,5));
	this.spaces.addEdge(new Point(3,5), new Point(3,6));
	this.spaces.addEdge(new Point(3,6), new Point(4,6));
	
	this.spaces.addEdge(new Point(3,12), new Point(4,12));
	
	this.spaces.addEdge(new Point(3,19), new Point(4,19));
	this.spaces.addEdge(new Point(3,19), new Point(3,18));
	this.spaces.addEdge(new Point(3,18), new Point(4,18));
	
	// x = 4
	this.spaces.addEdge(new Point(4,5), new Point(5,5));
	this.spaces.addEdge(new Point(4,5), new Point(4,6));
	this.spaces.addEdge(new Point(4,6), new Point(5,6));
	
	this.spaces.addEdge(new Point(4,12), new Point(5,12));
	
	this.spaces.addEdge(new Point(4,18), new Point(5,18));
	this.spaces.addEdge(new Point(4,18), new Point(4,19));
	this.spaces.addEdge(new Point(4,19), new Point(5,19));
	
	// x = 5
	this.spaces.addEdge(new Point(5,5), new Point(6,5));
	this.spaces.addEdge(new Point(5,5), new Point(5,6));
	this.spaces.addEdge(new Point(5,6), new Point(6,6));
	
	this.spaces.addEdge(new Point(5,12), new Point(6,12));
	
	this.spaces.addEdge(new Point(5,18), new Point(6,18));
	this.spaces.addEdge(new Point(5,18), new Point(5,19));
	this.spaces.addEdge(new Point(5,19), new Point(6,19));
	
	// x = 6
	this.spaces.addEdge(new Point(6,5), "Cottage");
	this.spaces.addEdge(new Point(6,5), new Point(7,5));
	this.spaces.addEdge(new Point(6,5), new Point(6,6));
	this.spaces.addEdge(new Point(6,6), new Point(7,6));
	this.spaces.addEdge(new Point(6,6), new Point(6,7));
	this.spaces.addEdge(new Point(6,7), new Point(7,7));
	
	this.spaces.addEdge(new Point(6,12), new Point(6,13));
	this.spaces.addEdge(new Point(6,13), new Point(7,13));
	this.spaces.addEdge(new Point(6,12), new Point(6,11));
	this.spaces.addEdge(new Point(6,11), new Point(7,11));
	this.spaces.addEdge(new Point(6,12), new Point(7,12));
	this.spaces.addEdge(new Point(6,13), new Point(6,14));
	this.spaces.addEdge(new Point(6,14), new Point(7,14));
	this.spaces.addEdge(new Point(6,14), new Point(6,15));
	this.spaces.addEdge(new Point(6,15), new Point(7,15));
	this.spaces.addEdge(new Point(6,15), new Point(6,16));
	this.spaces.addEdge(new Point(6,16), new Point(7,16));
	this.spaces.addEdge(new Point(6,16), "Grotto");
	this.spaces.addEdge(new Point(6,16), new Point(6,17));
	this.spaces.addEdge(new Point(6,17), new Point(7,17));
	this.spaces.addEdge(new Point(6,17), new Point(6,18));
	
	this.spaces.addEdge(new Point(6,18), new Point(7,18));
	this.spaces.addEdge(new Point(6,18), new Point(6,19));
	this.spaces.addEdge(new Point(6,19), new Point(7,19));
	this.spaces.addEdge(new Point(6,19), new Point(6,20));
	this.spaces.addEdge(new Point(6,20), "Cave");
	
	// x = 7
	this.spaces.addEdge(new Point(7,1), new Point(7,2));
	this.spaces.addEdge(new Point(7,2), new Point(8,2));
	this.spaces.addEdge(new Point(7,2), new Point(7,3));
	this.spaces.addEdge(new Point(7,3), new Point(8,3));
	this.spaces.addEdge(new Point(7,3), new Point(7,4));
	this.spaces.addEdge(new Point(7,4), new Point(8,4));
	this.spaces.addEdge(new Point(7,4), new Point(7,5));
	this.spaces.addEdge(new Point(7,5), new Point(8,5));
	this.spaces.addEdge(new Point(7,5), new Point(7,6));
	this.spaces.addEdge(new Point(7,6), new Point(8,6));
	this.spaces.addEdge(new Point(7,6), new Point(7,7));
	this.spaces.addEdge(new Point(7,7), new Point(8,7));
	this.spaces.addEdge(new Point(7,7), new Point(7,8));
	this.spaces.addEdge(new Point(7,8), new Point(8,8));
	this.spaces.addEdge(new Point(7,8), new Point(7,9));
	this.spaces.addEdge(new Point(7,9), new Point(8,9));
	this.spaces.addEdge(new Point(7,9), "Tent");
	this.spaces.addEdge(new Point(7,9), new Point(7,10));
	this.spaces.addEdge(new Point(7,10), new Point(8,10));
	this.spaces.addEdge(new Point(7,10), new Point(7,11));
	this.spaces.addEdge(new Point(7,11), new Point(8,11));
	this.spaces.addEdge(new Point(7,11), new Point(7,12));
	this.spaces.addEdge(new Point(7,12), new Point(8,12));
	this.spaces.addEdge(new Point(7,12), new Point(7,13));
	this.spaces.addEdge(new Point(7,13), new Point(8,13));
	this.spaces.addEdge(new Point(7,13), new Point(7,14));
	this.spaces.addEdge(new Point(7,14), new Point(8,14));
	this.spaces.addEdge(new Point(7,14), new Point(7,15));
	this.spaces.addEdge(new Point(7,15), new Point(8,15));
	this.spaces.addEdge(new Point(7,15), new Point(7,16));
	this.spaces.addEdge(new Point(7,16), new Point(8,16));
	this.spaces.addEdge(new Point(7,16), new Point(7,17));
	this.spaces.addEdge(new Point(7,17), new Point(8,17));
	this.spaces.addEdge(new Point(7,17), new Point(7,18));
	this.spaces.addEdge(new Point(7,18), new Point(8,18));
	this.spaces.addEdge(new Point(7,18), new Point(7,19));
	this.spaces.addEdge(new Point(7,19), new Point(8,19));
	this.spaces.addEdge(new Point(7,19), new Point(7,20));
	this.spaces.addEdge(new Point(7,20), new Point(8,20));
	this.spaces.addEdge(new Point(7,20), new Point(7,21));
	this.spaces.addEdge(new Point(7,21), new Point(8,21));
	this.spaces.addEdge(new Point(7,21), new Point(7,22));
	this.spaces.addEdge(new Point(7,22), new Point(8,22));
	this.spaces.addEdge(new Point(7,22), new Point(7,23));
	this.spaces.addEdge(new Point(7,23), new Point(8,23));
	
	// x = 8
	this.spaces.addEdge(new Point(8,2), new Point(8,3));
	this.spaces.addEdge(new Point(8,3), new Point(8,4));
	this.spaces.addEdge(new Point(8,4), new Point(8,5));
	this.spaces.addEdge(new Point(8,5), "Garden");
	this.spaces.addEdge(new Point(8,5), new Point(8,6));
	this.spaces.addEdge(new Point(8,6), new Point(8,7));
	this.spaces.addEdge(new Point(8,7), new Point(8,8));
	this.spaces.addEdge(new Point(8,8), new Point(9,8));
	this.spaces.addEdge(new Point(8,8), new Point(8,9));
	this.spaces.addEdge(new Point(8,9), new Point(8,10));
	this.spaces.addEdge(new Point(8,10), new Point(8,11));
	this.spaces.addEdge(new Point(8,11), new Point(8,12));
	this.spaces.addEdge(new Point(8,12), new Point(8,13));
	this.spaces.addEdge(new Point(8,13), new Point(8,14));
	this.spaces.addEdge(new Point(8,14), new Point(8,15));
	this.spaces.addEdge(new Point(8,15), new Point(8,16));
	this.spaces.addEdge(new Point(8,16), new Point(9,16));
	this.spaces.addEdge(new Point(8,16), new Point(8,17));
	this.spaces.addEdge(new Point(8,17), new Point(9,17));
	this.spaces.addEdge(new Point(8,17), new Point(8,18));
	this.spaces.addEdge(new Point(8,18), new Point(8,19));
	this.spaces.addEdge(new Point(8,19), new Point(8,20));
	this.spaces.addEdge(new Point(8,20), "Forest");
	this.spaces.addEdge(new Point(8,20), new Point(8,21));
	this.spaces.addEdge(new Point(8,21), new Point(8,22));
	this.spaces.addEdge(new Point(8,22), new Point(8,23));
	this.spaces.addEdge(new Point(8,23), new Point(8,24));
	this.spaces.addEdge(new Point(8,24), new Point(9,24));
	
	// x = 9
	this.spaces.addEdge(new Point(9,8), new Point(10,8));
	this.spaces.addEdge(new Point(9,16), new Point(10,16));
	this.spaces.addEdge(new Point(9,16), new Point(9,17));
	this.spaces.addEdge(new Point(9,17), new Point(10,17));
	this.spaces.addEdge(new Point(9,24), new Point(10,24));
	
	// x = 10
	this.spaces.addEdge(new Point(10,8), new Point(11,8));
	this.spaces.addEdge(new Point(10,16), new Point(11,16));
	this.spaces.addEdge(new Point(10,16), new Point(10,17));
	this.spaces.addEdge(new Point(10,17), new Point(11,17));
	this.spaces.addEdge(new Point(10,17), "Forest");
	this.spaces.addEdge(new Point(10,24), new Point(10,25));
	
	// x = 11
	this.spaces.addEdge(new Point(11,8), new Point(12,8));
	this.spaces.addEdge(new Point(11,8), "Garden");
	this.spaces.addEdge(new Point(11,16), new Point(12,16));
	this.spaces.addEdge(new Point(11,16), new Point(11,17));
	this.spaces.addEdge(new Point(11,17), new Point(12,17));
	
	// x = 12
	this.spaces.addEdge(new Point(12,8), new Point(13,8));
	this.spaces.addEdge(new Point(12,8), "Garden");
	this.spaces.addEdge(new Point(12,16), new Point(13,16));
	this.spaces.addEdge(new Point(12,16), new Point(12,17));
	this.spaces.addEdge(new Point(12,17), new Point(13,17));
	
	// x = 13
	this.spaces.addEdge(new Point(13,8), new Point(14,8));
	this.spaces.addEdge(new Point(13,16), new Point(14,16));
	this.spaces.addEdge(new Point(13,16), new Point(13,17));
	this.spaces.addEdge(new Point(13,17), new Point(14,17));
	
	// x = 14
	this.spaces.addEdge(new Point(14,8), new Point(15,8));
	this.spaces.addEdge(new Point(14,16), new Point(15,16));
	this.spaces.addEdge(new Point(14,16), new Point(14,17));
	this.spaces.addEdge(new Point(14,17), new Point(15,17));
	
	// x = 15
	this.spaces.addEdge(new Point(15,8), new Point(16,8));
	this.spaces.addEdge(new Point(15,8), new Point(15,9));
	this.spaces.addEdge(new Point(15,9), new Point(16,9));
	this.spaces.addEdge(new Point(15,9), new Point(15,10));
	this.spaces.addEdge(new Point(15,10), new Point(16,10));
	this.spaces.addEdge(new Point(15,10), new Point(15,11));
	this.spaces.addEdge(new Point(15,11), new Point(16,11));
	this.spaces.addEdge(new Point(15,11), new Point(15,12));
	this.spaces.addEdge(new Point(15,12), new Point(16,12));
	this.spaces.addEdge(new Point(15,12), new Point(15,13));
	this.spaces.addEdge(new Point(15,13), new Point(16,13));
	this.spaces.addEdge(new Point(15,13), new Point(15,14));
	this.spaces.addEdge(new Point(15,14), new Point(16,14))
	this.spaces.addEdge(new Point(15,14), new Point(15,15));
	this.spaces.addEdge(new Point(15,15), new Point(16,15))
	this.spaces.addEdge(new Point(15,15), new Point(15,16));
	this.spaces.addEdge(new Point(15,16), new Point(16,16));
	this.spaces.addEdge(new Point(15,16), new Point(15,17));
	this.spaces.addEdge(new Point(15,17), new Point(16,17));
	this.spaces.addEdge(new Point(15,17), "Forest");
	this.spaces.addEdge(new Point(15,24), new Point(15,25));
	this.spaces.addEdge(new Point(15,24), new Point(16,24));
	
	// x = 16
	this.spaces.addEdge(new Point(16,2), new Point(17,2));
	this.spaces.addEdge(new Point(16,2), new Point(16,3));
	this.spaces.addEdge(new Point(16,3), new Point(17,3));
	this.spaces.addEdge(new Point(16,3), new Point(16,4));
	this.spaces.addEdge(new Point(16,4), new Point(17,4));
	this.spaces.addEdge(new Point(16,4), new Point(16,5));
	this.spaces.addEdge(new Point(16,5), new Point(17,5));
	this.spaces.addEdge(new Point(16,5), new Point(16,6));
	this.spaces.addEdge(new Point(16,6), new Point(17,6));
	this.spaces.addEdge(new Point(16,6), new Point(16,7));
	this.spaces.addEdge(new Point(16,7), new Point(17,7));
	this.spaces.addEdge(new Point(16,7), new Point(16,8));
	this.spaces.addEdge(new Point(16,8), new Point(17,8));
	this.spaces.addEdge(new Point(16,8), new Point(16,9));
	this.spaces.addEdge(new Point(16,9), new Point(17,9));
	this.spaces.addEdge(new Point(16,9), new Point(16,10));
	this.spaces.addEdge(new Point(16,10), new Point(16,11));
	this.spaces.addEdge(new Point(16,11), new Point(16,12));
	this.spaces.addEdge(new Point(16,12), new Point(16,13));
	this.spaces.addEdge(new Point(16,13), "Ballroom");
	this.spaces.addEdge(new Point(16,13), new Point(16,14));
	this.spaces.addEdge(new Point(16,14), new Point(16,15));
	this.spaces.addEdge(new Point(16,15), new Point(16,16));
	this.spaces.addEdge(new Point(16,16), new Point(17,16));
	this.spaces.addEdge(new Point(16,16), new Point(16,17));
	this.spaces.addEdge(new Point(16,17), new Point(17,17));
	this.spaces.addEdge(new Point(16,24), new Point(17,24));
	
	// x = 17
	this.spaces.addEdge(new Point(17,1), new Point(17,2));
	this.spaces.addEdge(new Point(17,2), new Point(17,3));
	this.spaces.addEdge(new Point(17,3), new Point(17,4));
	this.spaces.addEdge(new Point(17,4), new Point(17,5));
	this.spaces.addEdge(new Point(17,5), new Point(17,6));
	this.spaces.addEdge(new Point(17,6), new Point(17,7));
	this.spaces.addEdge(new Point(17,7), new Point(18,7));
	this.spaces.addEdge(new Point(17,7), new Point(17,8));
	this.spaces.addEdge(new Point(17,8), new Point(18,8));
	this.spaces.addEdge(new Point(17,8), new Point(17,9));
	this.spaces.addEdge(new Point(17,9), new Point(18,9));
	this.spaces.addEdge(new Point(17,16), new Point(18,16));
	this.spaces.addEdge(new Point(17,16), new Point(17,17));
	this.spaces.addEdge(new Point(17,17), new Point(18,17));
	this.spaces.addEdge(new Point(17,17), new Point(17,18));
	this.spaces.addEdge(new Point(17,18), new Point(18,18));
	this.spaces.addEdge(new Point(17,18), new Point(17,19))
	this.spaces.addEdge(new Point(17,19), "Forest");
	this.spaces.addEdge(new Point(17,19), new Point(18,19));
	this.spaces.addEdge(new Point(17,19), new Point(17,20));
	this.spaces.addEdge(new Point(17,20), new Point(18,20));
	this.spaces.addEdge(new Point(17,20), new Point(17,21));
	this.spaces.addEdge(new Point(17,21), new Point(18,21));
	this.spaces.addEdge(new Point(17,21), new Point(17,22));
	this.spaces.addEdge(new Point(17,22), new Point(18,22));
	this.spaces.addEdge(new Point(17,22), new Point(17,23));
	
	// x = 18
	this.spaces.addEdge(new Point(18,7), "Tower");
	this.spaces.addEdge(new Point(18,7), new Point(19,7));
	this.spaces.addEdge(new Point(18,7), new Point(18,8));
	this.spaces.addEdge(new Point(18,8), new Point(19,8));
	this.spaces.addEdge(new Point(18,8), new Point(18,9))
	this.spaces.addEdge(new Point(18,8), "Ballroom");
	this.spaces.addEdge(new Point(18,8), new Point(19,8));
	this.spaces.addEdge(new Point(18,16), new Point(19,16));
	this.spaces.addEdge(new Point(18,16), new Point(18,17));
	this.spaces.addEdge(new Point(18,17), new Point(19,17));
	this.spaces.addEdge(new Point(18,17), new Point(18,18));
	this.spaces.addEdge(new Point(18,18), new Point(18,19));
	this.spaces.addEdge(new Point(18,18), new Point(19,18));
	this.spaces.addEdge(new Point(18,19), new Point(18,20));
	this.spaces.addEdge(new Point(18,20), new Point(18,21));
	
	// x = 19
	this.spaces.addEdge(new Point(19,7), new Point(20,7));
	this.spaces.addEdge(new Point(19,7), new Point(19,8));
	this.spaces.addEdge(new Point(19,8), new Point(20,8));
	this.spaces.addEdge(new Point(19,8), new Point(19,9));
	this.spaces.addEdge(new Point(19,9), new Point(20,9));
	this.spaces.addEdge(new Point(19,16), new Point(19,17));
	this.spaces.addEdge(new Point(19,17), new Point(20,17));
	this.spaces.addEdge(new Point(19,17), new Point(19,18));
	this.spaces.addEdge(new Point(19,18), new Point(20,18));
	
	// x = 20
	this.spaces.addEdge(new Point(20,7), new Point(21,7));
	this.spaces.addEdge(new Point(20,7), new Point(20,8));
	this.spaces.addEdge(new Point(20,8), new Point(21,8));
	this.spaces.addEdge(new Point(20,8), new Point(20,9));
	this.spaces.addEdge(new Point(20,9), new Point(21,9));
	this.spaces.addEdge(new Point(20,17), new Point(21,17));
	this.spaces.addEdge(new Point(20,17), new Point(20,18));
	this.spaces.addEdge(new Point(20,18), "Ballroom");
	this.spaces.addEdge(new Point(20,18), new Point(21,18));
	
	// x = 21
	this.spaces.addEdge(new Point(21,7), new Point(22,7));
	this.spaces.addEdge(new Point(21,7), new Point(21,8));
	this.spaces.addEdge(new Point(21,8), new Point(22,8));
	this.spaces.addEdge(new Point(21,8), new Point(21,9));
	this.spaces.addEdge(new Point(21,9), new Point(22,9));
	this.spaces.addEdge(new Point(21,17), new Point(22,17));
	this.spaces.addEdge(new Point(21,17), new Point(21,18));
	this.spaces.addEdge(new Point(21,18), new Point(21,19));
	this.spaces.addEdge(new Point(21,18), new Point(22,18));
	
	// x = 22
	this.spaces.addEdge(new Point(22,7), new Point(23,7));
	this.spaces.addEdge(new Point(22,7), new Point(22,8));
	this.spaces.addEdge(new Point(22,8), new Point(23,8));
	this.spaces.addEdge(new Point(22,8), new Point(22,9));
	this.spaces.addEdge(new Point(22,9), new Point(23,9));
	this.spaces.addEdge(new Point(22,17), new Point(23,17));
	this.spaces.addEdge(new Point(22,17), new Point(22,18));
	this.spaces.addEdge(new Point(22,18), new Point(23,18));
	
	// x = 23
	this.spaces.addEdge(new Point(23,7), new Point(23,8));
	this.spaces.addEdge(new Point(23,8), new Point(24,8));
	this.spaces.addEdge(new Point(23,8), new Point(23,9));
	this.spaces.addEdge(new Point(23,18), new Point(24,18));
  }
  
  this.setGame = function() // change so much of this
  {
    //this.deck.dealCards(this.players);
	// set up game board:
	// --- board background
	this.board.setImg('../imgs/foundation.png');
	this.knownBkg.setImg('../imgs/score_card.jpg');
	
	// --- each player's canvas layer
	for(var i=0; i<this.players.length; i++)
	{
	  this.players[i].assignDiv(i, 650, 675);
	  this.players[i].drawPiece;
	}
	
	this.setSpaces();
	this.spaceCanvas.canvas.width = 650;
	this.spaceCanvas.canvas.height = 675;
	this.takeTurn(2);
  }
  
  // GET FUNCTIONS
  this.getPlayerCharacter = function(num)
  {
    return this.players[num-1].character;
  }
  
  this.getPlayerName = function(num)
  {
    return this.player[num-1].playerName;
  }
  
  this.getHand = function(num)
  {
    this.players[num-1].showHand(this.deck);
  }
  
  this.takeTurn = function(num) // move out of this scope
  {
    this.activePlayer = num-1;
	// display last player's actions
    // display player's known list
	this.players[this.activePlayer].showKnown();
	
	// display player's hand
	this.players[this.activePlayer].showHand();
	
	// if player is accused
    if(this.players[this.activePlayer].accused)
	{
	  // set accused to false
	  this.players[this.activePlayer].toggleAccused();
	  // ask if the player would like to make an accusation
	  // display ask question screen
    }
	else
	{
	  // otherwise, continue the turn as usual
  	  // if player is in a room with a secret door
	  if(this.players[this.activePlayer].secretPassage)
	  {
		// set secretPassage to false
		this.players[this.activePlayer].toggleSecretPassage();
	    // display "would you like to use the secret door to [room]"
	  }
	  else
	  {
  	    // otherewise, show a screen with a die roll
	    //$('#rollDie').show();
	  
	    // once the die is rolled, display possible spaces
	   // $('#confirmRoll').click(function()
	    //{
	      this.numSpaces = this.die.randomElement();
		  // display numSpaces somewhere on the screen
		  // execute show spaces
	    //});
		this.showSpaces(this.players[this.activePlayer].getPosition());
	  }
	}
  }
  
  this.showSpaces = function(pos)
  {
    this.spaceSelection = true;
	var index = this.spaces.findNode(pos);
	// display possible spaces
	for(var i=0; i<this.spaces.node_list[index].edge_list.length; i++)
	{
	  this.players[this.activePlayer].piece.drawFilledSquare(this.spaces.node_list[index].edge_list[i]);
      var loc = this.spaces.findNode(this.spaces.node_list[index].edge_list[i]);
      //this.spaces.node_list[loc].toggleHighlighted();
      this.spaces.node_list[loc].highlighted=true;
	}
  }
  
  this.hideSpaces = function(pos)
  {
    var index = this.spaces.findNode(pos);
	for(var i=0; i < this.spaces.node_list[index].edge_list.length; i++)
	{
	  var loc = this.spaces.findNode(this.spaces.node_list[index].edge_list[i]);
	  this.spaces.node_list[loc].highlighted = false;
	}
  }
  
  this.isSpaceHighlighted = function(pt)
  {
	var index = this.spaces.findNode(pt);
	if(index != null)
	{
	  return this.spaces.node_list[index].highlighted;
	}
	else
	{
	  return false;
	}
  }
    
  this.convertClick = function(x,y)
  {
    var convertedPoint = new Point(Math.floor((x - this.board.canvas.offsetLeft)/this.board.squareSize), Math.floor((y-this.board.canvas.offsetTop)/this.board.squareSize));
	
	return convertedPoint;
  }
  
  this.movePiece = function(loc)
  {
	this.players[this.activePlayer].position.updatePoint(loc.x, loc.y);
    this.players[this.activePlayer].piece.redrawPiece(this.players[this.activePlayer].position);
  }

  this.spaceCanvas.canvas.addEventListener("mousedown",function(e)
  {
    if(scope.spaceSelection)
	{
	  var tempPt = scope.convertClick(e.pageX, e.pageY);
	  console.log("x: " + tempPt.x);
	  console.log("y: " + tempPt.y);
	  // if highlighted
	  if(scope.isSpaceHighlighted(tempPt))
	  {
	    // set space selection to false
		scope.spaceSelection = false;
		
		// hide spaces, which sets highlighted to false
		scope.hideSpaces(scope.players[scope.activePlayer].position);
		
		// move piece
		scope.movePiece(tempPt);
		
		// move numSpaces down
		scope.numSpaces-=1;
		// if numSpaces != 0
		if(scope.numSpaces != 0)
		{
		  // call select space
		  scope.showSpaces(tempPt);
		}
	  }
	}
  });
}