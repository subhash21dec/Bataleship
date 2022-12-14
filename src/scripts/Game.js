import playerController from "./Players";
import styleCanvas from "./Canvas";
import generalFuncs from "./generalFuncs";
const game = (() => {
  let playerControl = playerController(); //changed from const to allow a new game
  const usernameBtn = document.getElementById("btn-username");
  const btnToPage3 = document.getElementById("btn-to-page3");
  const username = document.getElementById("username");
  const rematch = document.getElementById("rematch-btn");
  const newPlayer = document.getElementById("new-player-btn");
  let squareSize, canvasSize;

  let gridPopulated = []; //use this to check coords of ship placement and to place on gameboard before screen 3;
  let gridPopulatedAI = []; //use this to check coords of ship placement and to place on gameboard before screen 3;
  const shipPlacement = {
    ship0: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship1: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship2: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship3: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship4: {
      length: 0,
      position: [],
      direction: 1,
    },
  };
  const shipPlacementAI = {
    ship0: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship1: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship2: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship3: {
      length: 0,
      position: [],
      direction: 1,
    },
    ship4: {
      length: 0,
      position: [],
      direction: 1,
    },
  };

  //Get the screen size
  // this helps define canvas & square size
  if (window.innerWidth < 700) {
    canvasSize = "300";
    squareSize = 30;
  } else {
    canvasSize = "500";
    squareSize = 50;
  }

  //event listeners
  username.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
    generalFuncs().validateUsername();
  });

  usernameBtn.addEventListener("click", startGame);
  btnToPage3.addEventListener("click", () => {
    generalFuncs().nextScreen("page2", "page3");
    battlePage();
  });

  newPlayer.addEventListener("click", () => {
    generalFuncs().nextScreen("page4", "page1");
    username.value = "";
    //reset player controller.
    playerControl = playerController();
  });

  rematch.addEventListener("click", () => {
    generalFuncs().nextScreen("page4", "page2");
    //reset player controller.
    playerControl = playerController();
    createPlayer();
    generalFuncs().reset();
    generateShips();
    //create canvas to place ships
    styleCanvas(".page2");
  });

  function createPlayer() {
    playerControl.createPlayer(username.value);
    document.querySelector(
      ".page3 .player p"
    ).innerText = `${username.value}'s board:`;
  }

  function startGame() {
    generalFuncs().reset();
    let usernamePass = generalFuncs().validateUsername();
    if (!usernamePass) {
      return;
    }
    //create player
    createPlayer();
    // go to second screen;
    generalFuncs().nextScreen("page1", "page2");
    //create 5 ships to user to place
    generateShips();
    //create canvas to place ships
    styleCanvas(".page2");
  }

  // functions for screen 2 - user to place ships

  function generateShips() {
    let ships = [5, 4, 3, 3, 2];
    let shipContainer = document.querySelectorAll(".page2 .ship-container");
    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i]; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        shipContainer[i].append(square);
      }
    }
    shipContainer.forEach((container, key) => {
      container.setAttribute("data-ship-number", key);
      container.draggable = true;
      container.classList.add("draggable");
      container.addEventListener("click", toggleVertical);
    });
    manageDrag();
  }

  function toggleVertical() {
    this.classList.toggle("vertical");
  }

  function manageDrag() {
    let draggables = document.querySelectorAll(".draggable");
    let canvas = document.querySelector(".page2 canvas");
    let x = 0,
      y = 0;

    canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      x = Math.floor(e.offsetX / squareSize) * squareSize;
      y = Math.floor(e.offsetY / squareSize) * squareSize;
    });

    draggables.forEach((draggable, key) => {
      //touch events
      draggable.addEventListener("touchmove", (e) => {
        e.preventDefault();
        draggable.classList.add("dragging");
        // lastmove = e;
      });

      //find x,y placement on touch end
      draggable.addEventListener("touchend", (e) => {
        draggable.classList.remove("dragging");
        let { left, right, top, bottom } = generalFuncs().getElLoc(canvas);
        x =
          Math.floor((e.changedTouches[0].pageX - left) / squareSize) *
          squareSize;
        y =
          Math.floor((e.changedTouches[0].pageY - top) / squareSize) *
          squareSize;

        let direction = draggable.classList.contains("vertical") ? 0 : 1;
        let size = draggable.childElementCount;

        //add check to see if drop ship is valid;
        let check = checkPlacement(
          x / squareSize,
          y / squareSize,
          size,
          direction,
          gridPopulated
        );
        if (check) {
          placeValidShips(
            draggable,
            x,
            y,
            size,
            canvas,
            direction,
            shipPlacement,
            key
          );
        } else {
          return;
        }
      });

      //mouse events for desktop
      draggable.addEventListener("dragstart", () => {
        //add class to tell we are currently dragging
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        //remove class to tell we are currently dragging
        draggable.classList.remove("dragging");
        let direction = draggable.classList.contains("vertical") ? 0 : 1;
        let size = draggable.childElementCount;

        //add check to see if drop ship is valid;
        let check = checkPlacement(
          x / squareSize,
          y / squareSize,
          size,
          direction,
          gridPopulated
        );
        if (check) {
          placeValidShips(
            draggable,
            x,
            y,
            size,
            canvas,
            direction,
            shipPlacement,
            key
          );
        } else {
          return;
        }
      });
    });
  }

  function placeValidShips(
    el,
    x,
    y,
    size,
    canvas,
    direction,
    shipPlacement,
    key
  ) {
    dropShip(x, y, size, canvas, direction);
    updateShipObject(key, size, [x, y], direction, shipPlacement);
    let populated = populateGrid(
      x / squareSize,
      y / squareSize,
      size,
      direction
    );
    gridPopulated.push(...populated);
    el.innerHTML = "";
    finishShipPlacement();
  }

  function updateShipObject(key, size, coords, direct, obj) {
    obj[`ship${key}`].length = size;
    obj[`ship${key}`].position = coords;
    obj[`ship${key}`].direction = direct == 0 ? 0 : 1;
  }

  function dropShip(x, y, size, canvas, direction) {
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < size; i++) {
      ctx.beginPath();
      if (direction === 0) {
        ctx.rect(x, y + squareSize * i, squareSize, squareSize);
      } else {
        ctx.rect(x + squareSize * i, y, squareSize, squareSize);
      }
      ctx.strokeStyle = "white";
      ctx.setLineDash([2]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#8981BA";
      ctx.fill();
    }
  }

  function checkPlacement(x, y, size, direction, gridCheck) {
    let shipOK = true;
    //ship goes off the board
    for (let k = 0; k < size; k++) {
      if (direction == 0 && (x > 9 || x < 0 || y + k < 0 || y + k > 9)) {
        console.log("failed1:", x, y + k);
        shipOK = false;
      }
      if (direction == 1 && (x + k > 9 || x + k < 0 || y < 0 || y > 9)) {
        console.log("failed2");
        shipOK = false;
      }
    }

    // overlaps with ship already placed
    gridCheck.forEach((coord) => {
      for (let i = 0; i < size; i++) {
        if (direction == 0) {
          if (coord[0] == x && coord[1] == y + i) {
            console.log("failed3");
            shipOK = false;
          }
        } else {
          if (coord[0] == x + i && coord[1] == y) {
            console.log("failed4");
            shipOK = false;
          }
        }
      }
    });

    // shipOK = false;
    return shipOK;
  }

  function populateGrid(x, y, size, direction) {
    let grid = [];
    for (let i = 0; i < size; i++) {
      if (direction == 0) {
        grid.push([x, y + i]);
      } else {
        grid.push([x + i, y]);
      }
    }
    return [...grid];
  }

  function finishShipPlacement() {
    let shipsRemaining = document.querySelectorAll(
      ".ship-container .square"
    ).length;
    if (shipsRemaining === 0) {
      btnToPage3.classList.remove("hidden");
      for (let ship in shipPlacement) {
        playerControl
          .getPlayers()[0]
          .gameboard.placeShip(
            shipPlacement[ship].position[0] / squareSize,
            shipPlacement[ship].position[1] / squareSize,
            shipPlacement[ship].length,
            shipPlacement[ship].direction
          );
      }
      document.querySelector(".page2 .container").classList.add("hidden");
    }
  }

  // functions for screen 3 - main battle
  function battlePage() {
    const canvas = styleCanvas(".page3");
    const playerCanvas = canvas[0];
    const aiCanvas = canvas[1];
    let gameover = false;

    // place player ships
    const playerShips = playerControl.getPlayers()[0].gameboard.getShips();
    playerShips.forEach((ship) => {
      dropShip(
        ship.coords[0][0] * squareSize,
        ship.coords[0][1] * squareSize,
        ship.shipToPlace.length,
        playerCanvas,
        ship.shipToPlace.getDirection()
      );
    });

    //set up random AI ship placement
    placeAIShips();
    aiShipsGameboard();

    document.querySelector(".player .overlay").classList.remove("hidden");

    //on click to signal attack
    aiCanvas.addEventListener("click", async (e) => {
      if (playerControl.getCurrentPlayer() == 0) {
        let x = Math.floor(e.offsetX / squareSize);
        let y = Math.floor(e.offsetY / squareSize);
        gameover = await playerControl.attack(x, y);
        if (gameover.status == true) {
          generalFuncs().nextScreen("page3", "page4");
          replaceCanvasElements();
          winner();
        }
      }
    });
  }

  // replacing canvas elements on screen three due to duplicate onClick methods
  function replaceCanvasElements() {
    let playerCanvas = document.querySelector(".page3 .player");
    let aiCanvas = document.querySelector(".page3 .AI");

    playerCanvas.remove();
    aiCanvas.remove();

    // create elements again
    const divPlayer = document.createElement("div");
    const divAI = document.createElement("div");
    const pPlayer = document.createElement("p");
    const pAI = document.createElement("p");
    const canvasPlayer = document.createElement("canvas");
    const canvasAI = document.createElement("canvas");
    const playerOverlay = document.createElement("div");
    const aiOverlay = document.createElement("div");

    playerOverlay.className = "overlay hidden";
    aiOverlay.className = "overlay hidden";

    pPlayer.innerText = `${playerControl.getPlayers()[0].player}'s board:`;
    pAI.innerText = `AI board:`;
    divPlayer.classList.add("player");
    divAI.classList.add("AI");
    divPlayer.append(pPlayer);
    divPlayer.append(canvasPlayer);
    divPlayer.append(playerOverlay);
    divAI.append(pAI);
    divAI.append(canvasAI);
    divAI.append(aiOverlay);

    document.querySelector(".page3 .container").append(divPlayer);
    document.querySelector(".page3 .container").append(divAI);
  }

  function placeAIShips() {
    let ships = [5, 4, 3, 3, 2];
    let key = 0;

    while (ships.length > 0) {
      // vertical or horizontal
      let direction = Math.random() < 0.5 ? 1 : 0;
      let size = ships[0];
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let check = checkPlacement(x, y, size, direction, gridPopulatedAI);
      if (check) {
        let populated = populateGrid(x, y, size, direction);
        gridPopulatedAI.push(...populated);
        updateShipObject(key, size, [x, y], direction, shipPlacementAI);
        ships.shift();
        key++;
      }
    }
  }

  function aiShipsGameboard() {
    for (let ship in shipPlacementAI) {
      playerControl
        .getPlayers()[1]
        .gameboard.placeShip(
          shipPlacementAI[ship].position[0],
          shipPlacementAI[ship].position[1],
          shipPlacementAI[ship].length,
          shipPlacementAI[ship].direction
        );
    }
  }

  // functions for game over
  function winner() {
    let winnerDiv = document.querySelector(".page4 .winner");
    let shipsDiv = document.querySelector(".page4 .remaining-ships");
    let winner;
    // player won
    if (playerControl.checkWinner()) {
      console.log("current player", playerControl.getCurrentPlayer());
      console.log(playerControl.getPlayers()[playerControl.getCurrentPlayer()]);
      winner = playerControl.getPlayers()[playerControl.getCurrentPlayer()];
    } else {
      // AI won
      winner = playerControl.getPlayers()[1];
    }

    winnerDiv.innerText = `Winner: ${winner.player}`;
    shipsDiv.innerText = `Ships remaining: ${winner.gameboard.shipsRemaining()}`;
  }

  return {
    playerControl,
  };
})();

module.exports = game;
