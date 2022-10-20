/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/Game */ \"./src/scripts/Game.js\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/scripts/Canvas.js":
/*!*******************************!*\
  !*** ./src/scripts/Canvas.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const generalFuncs = __webpack_require__(/*! ./generalFuncs */ \"./src/scripts/generalFuncs.js\");\r\n\r\nfunction styleCanvas(loc) {\r\n  let canvas = document.querySelectorAll(`${loc} canvas`);\r\n  let squareSize;\r\n  canvas.forEach((c, key) => {\r\n    let ctx = c.getContext(\"2d\");\r\n    if (window.innerWidth < 700) {\r\n      c.height = \"300\";\r\n      c.width = \"300\";\r\n      squareSize = 30;\r\n    } else {\r\n      c.height = \"500\";\r\n      c.width = \"500\";\r\n      squareSize = 50;\r\n    }\r\n\r\n    const overlay = document.querySelectorAll(`${loc} .overlay`);\r\n    const { left, right, top, bottom } = generalFuncs().getElLoc(c);\r\n    overlay[key].style.left = left + \"px\";\r\n    overlay[key].style.height = c.height + \"px\";\r\n    overlay[key].style.top = top + \"px\";\r\n    overlay[key].style.width = c.width + \"px\";\r\n\r\n    for (let i = 0; i <= 9; i++) {\r\n      //columns\r\n      ctx.moveTo(i * squareSize, 0);\r\n      ctx.beginPath();\r\n      ctx.rect(i * squareSize, 0, squareSize, c.width);\r\n      ctx.strokeStyle = \"white\";\r\n      ctx.setLineDash([10]);\r\n      ctx.stroke();\r\n\r\n      //rows\r\n      ctx.beginPath();\r\n      ctx.rect(0, i * squareSize, c.height, squareSize);\r\n      ctx.strokeStyle = \"white\";\r\n      ctx.setLineDash([10]);\r\n      ctx.stroke();\r\n    }\r\n  });\r\n\r\n  return canvas;\r\n}\r\n\r\nmodule.exports = styleCanvas;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/Canvas.js?");

/***/ }),

/***/ "./src/scripts/CanvasHit.js":
/*!**********************************!*\
  !*** ./src/scripts/CanvasHit.js ***!
  \**********************************/
/***/ ((module) => {

eval("function canvasHit(x, y, canvas, status) {\r\n  let ctx = canvas.getContext(\"2d\");\r\n  let style = status == \"miss\" ? \"#EAEBAC\" : \"#DE7272\";\r\n  let squareSize;\r\n\r\n  if (window.innerWidth < 700) {\r\n    squareSize = 30;\r\n  } else {\r\n    squareSize = 50;\r\n  }\r\n\r\n  ctx.strokeStyle = \"black\";\r\n  ctx.fillStyle = style;\r\n  ctx.setLineDash([0]);\r\n\r\n  ctx.beginPath();\r\n  ctx.fillStyle = style;\r\n  ctx.rect(x * squareSize, y * squareSize, squareSize, squareSize);\r\n  ctx.fill();\r\n  ctx.stroke();\r\n\r\n  if (status == \"hit\") {\r\n    ctx.beginPath();\r\n    ctx.moveTo(x * squareSize + squareSize, y * squareSize);\r\n    ctx.lineTo(x * squareSize, y * squareSize + squareSize);\r\n    ctx.strokeStyle = \"black\";\r\n    ctx.lineStyle = \"solid\";\r\n    ctx.stroke();\r\n  }\r\n\r\n  if (status == \"sunk\") {\r\n    ctx.beginPath();\r\n    ctx.moveTo(x * squareSize + squareSize, y * squareSize);\r\n    ctx.lineTo(x * squareSize, y * squareSize + squareSize);\r\n    ctx.strokeStyle = \"black\";\r\n    ctx.stroke();\r\n\r\n    ctx.beginPath();\r\n    ctx.moveTo(x * squareSize, y * squareSize);\r\n    ctx.lineTo(x * squareSize + squareSize, y * squareSize + squareSize);\r\n    ctx.strokeStyle = \"black\";\r\n    ctx.stroke();\r\n  }\r\n}\r\n\r\nmodule.exports = canvasHit;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/CanvasHit.js?");

/***/ }),

/***/ "./src/scripts/Game.js":
/*!*****************************!*\
  !*** ./src/scripts/Game.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Players */ \"./src/scripts/Players.js\");\n/* harmony import */ var _Players__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Players__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas */ \"./src/scripts/Canvas.js\");\n/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Canvas__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _generalFuncs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generalFuncs */ \"./src/scripts/generalFuncs.js\");\n/* harmony import */ var _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_generalFuncs__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\r\n\r\n\r\nconst game = (() => {\r\n  let playerControl = _Players__WEBPACK_IMPORTED_MODULE_0___default()(); //changed from const to allow a new game\r\n  const usernameBtn = document.getElementById(\"btn-username\");\r\n  const btnToPage3 = document.getElementById(\"btn-to-page3\");\r\n  const username = document.getElementById(\"username\");\r\n  const rematch = document.getElementById(\"rematch-btn\");\r\n  const newPlayer = document.getElementById(\"new-player-btn\");\r\n  let squareSize, canvasSize;\r\n\r\n  let gridPopulated = []; //use this to check coords of ship placement and to place on gameboard before screen 3;\r\n  let gridPopulatedAI = []; //use this to check coords of ship placement and to place on gameboard before screen 3;\r\n  const shipPlacement = {\r\n    ship0: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship1: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship2: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship3: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship4: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n  };\r\n  const shipPlacementAI = {\r\n    ship0: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship1: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship2: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship3: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n    ship4: {\r\n      length: 0,\r\n      position: [],\r\n      direction: 1,\r\n    },\r\n  };\r\n\r\n  //Get the screen size\r\n  // this helps define canvas & square size\r\n  if (window.innerWidth < 700) {\r\n    canvasSize = \"300\";\r\n    squareSize = 30;\r\n  } else {\r\n    canvasSize = \"500\";\r\n    squareSize = 50;\r\n  }\r\n\r\n  //event listeners\r\n  username.addEventListener(\"keyup\", (e) => {\r\n    if (e.key == \"Enter\") {\r\n      e.preventDefault();\r\n    }\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().validateUsername();\r\n  });\r\n\r\n  usernameBtn.addEventListener(\"click\", startGame);\r\n  btnToPage3.addEventListener(\"click\", () => {\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().nextScreen(\"page2\", \"page3\");\r\n    battlePage();\r\n  });\r\n\r\n  newPlayer.addEventListener(\"click\", () => {\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().nextScreen(\"page4\", \"page1\");\r\n    username.value = \"\";\r\n    //reset player controller.\r\n    playerControl = _Players__WEBPACK_IMPORTED_MODULE_0___default()();\r\n  });\r\n\r\n  rematch.addEventListener(\"click\", () => {\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().nextScreen(\"page4\", \"page2\");\r\n    //reset player controller.\r\n    playerControl = _Players__WEBPACK_IMPORTED_MODULE_0___default()();\r\n    createPlayer();\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().reset();\r\n    generateShips();\r\n    //create canvas to place ships\r\n    _Canvas__WEBPACK_IMPORTED_MODULE_1___default()(\".page2\");\r\n  });\r\n\r\n  function createPlayer() {\r\n    playerControl.createPlayer(username.value);\r\n    document.querySelector(\r\n      \".page3 .player p\"\r\n    ).innerText = `${username.value}'s board:`;\r\n  }\r\n\r\n  function startGame() {\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().reset();\r\n    let usernamePass = _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().validateUsername();\r\n    if (!usernamePass) {\r\n      return;\r\n    }\r\n    //create player\r\n    createPlayer();\r\n    // go to second screen;\r\n    _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().nextScreen(\"page1\", \"page2\");\r\n    //create 5 ships to user to place\r\n    generateShips();\r\n    //create canvas to place ships\r\n    _Canvas__WEBPACK_IMPORTED_MODULE_1___default()(\".page2\");\r\n  }\r\n\r\n  // functions for screen 2 - user to place ships\r\n\r\n  function generateShips() {\r\n    let ships = [5, 4, 3, 3, 2];\r\n    let shipContainer = document.querySelectorAll(\".page2 .ship-container\");\r\n    for (let i = 0; i < ships.length; i++) {\r\n      for (let j = 0; j < ships[i]; j++) {\r\n        const square = document.createElement(\"div\");\r\n        square.classList.add(\"square\");\r\n        shipContainer[i].append(square);\r\n      }\r\n    }\r\n    shipContainer.forEach((container, key) => {\r\n      container.setAttribute(\"data-ship-number\", key);\r\n      container.draggable = true;\r\n      container.classList.add(\"draggable\");\r\n      container.addEventListener(\"click\", toggleVertical);\r\n    });\r\n    manageDrag();\r\n  }\r\n\r\n  function toggleVertical() {\r\n    this.classList.toggle(\"vertical\");\r\n  }\r\n\r\n  function manageDrag() {\r\n    let draggables = document.querySelectorAll(\".draggable\");\r\n    let canvas = document.querySelector(\".page2 canvas\");\r\n    let x = 0,\r\n      y = 0;\r\n\r\n    canvas.addEventListener(\"dragover\", (e) => {\r\n      e.preventDefault();\r\n      x = Math.floor(e.offsetX / squareSize) * squareSize;\r\n      y = Math.floor(e.offsetY / squareSize) * squareSize;\r\n    });\r\n\r\n    draggables.forEach((draggable, key) => {\r\n      //touch events\r\n      draggable.addEventListener(\"touchmove\", (e) => {\r\n        e.preventDefault();\r\n        draggable.classList.add(\"dragging\");\r\n        // lastmove = e;\r\n      });\r\n\r\n      //find x,y placement on touch end\r\n      draggable.addEventListener(\"touchend\", (e) => {\r\n        draggable.classList.remove(\"dragging\");\r\n        let { left, right, top, bottom } = _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().getElLoc(canvas);\r\n        x =\r\n          Math.floor((e.changedTouches[0].pageX - left) / squareSize) *\r\n          squareSize;\r\n        y =\r\n          Math.floor((e.changedTouches[0].pageY - top) / squareSize) *\r\n          squareSize;\r\n\r\n        let direction = draggable.classList.contains(\"vertical\") ? 0 : 1;\r\n        let size = draggable.childElementCount;\r\n\r\n        //add check to see if drop ship is valid;\r\n        let check = checkPlacement(\r\n          x / squareSize,\r\n          y / squareSize,\r\n          size,\r\n          direction,\r\n          gridPopulated\r\n        );\r\n        if (check) {\r\n          placeValidShips(\r\n            draggable,\r\n            x,\r\n            y,\r\n            size,\r\n            canvas,\r\n            direction,\r\n            shipPlacement,\r\n            key\r\n          );\r\n        } else {\r\n          return;\r\n        }\r\n      });\r\n\r\n      //mouse events for desktop\r\n      draggable.addEventListener(\"dragstart\", () => {\r\n        //add class to tell we are currently dragging\r\n        draggable.classList.add(\"dragging\");\r\n      });\r\n\r\n      draggable.addEventListener(\"dragend\", () => {\r\n        //remove class to tell we are currently dragging\r\n        draggable.classList.remove(\"dragging\");\r\n        let direction = draggable.classList.contains(\"vertical\") ? 0 : 1;\r\n        let size = draggable.childElementCount;\r\n\r\n        //add check to see if drop ship is valid;\r\n        let check = checkPlacement(\r\n          x / squareSize,\r\n          y / squareSize,\r\n          size,\r\n          direction,\r\n          gridPopulated\r\n        );\r\n        if (check) {\r\n          placeValidShips(\r\n            draggable,\r\n            x,\r\n            y,\r\n            size,\r\n            canvas,\r\n            direction,\r\n            shipPlacement,\r\n            key\r\n          );\r\n        } else {\r\n          return;\r\n        }\r\n      });\r\n    });\r\n  }\r\n\r\n  function placeValidShips(\r\n    el,\r\n    x,\r\n    y,\r\n    size,\r\n    canvas,\r\n    direction,\r\n    shipPlacement,\r\n    key\r\n  ) {\r\n    dropShip(x, y, size, canvas, direction);\r\n    updateShipObject(key, size, [x, y], direction, shipPlacement);\r\n    let populated = populateGrid(\r\n      x / squareSize,\r\n      y / squareSize,\r\n      size,\r\n      direction\r\n    );\r\n    gridPopulated.push(...populated);\r\n    el.innerHTML = \"\";\r\n    finishShipPlacement();\r\n  }\r\n\r\n  function updateShipObject(key, size, coords, direct, obj) {\r\n    obj[`ship${key}`].length = size;\r\n    obj[`ship${key}`].position = coords;\r\n    obj[`ship${key}`].direction = direct == 0 ? 0 : 1;\r\n  }\r\n\r\n  function dropShip(x, y, size, canvas, direction) {\r\n    const ctx = canvas.getContext(\"2d\");\r\n    for (let i = 0; i < size; i++) {\r\n      ctx.beginPath();\r\n      if (direction === 0) {\r\n        ctx.rect(x, y + squareSize * i, squareSize, squareSize);\r\n      } else {\r\n        ctx.rect(x + squareSize * i, y, squareSize, squareSize);\r\n      }\r\n      ctx.strokeStyle = \"white\";\r\n      ctx.setLineDash([2]);\r\n      ctx.lineWidth = 2;\r\n      ctx.stroke();\r\n      ctx.fillStyle = \"#8981BA\";\r\n      ctx.fill();\r\n    }\r\n  }\r\n\r\n  function checkPlacement(x, y, size, direction, gridCheck) {\r\n    let shipOK = true;\r\n    //ship goes off the board\r\n    for (let k = 0; k < size; k++) {\r\n      if (direction == 0 && (x > 9 || x < 0 || y + k < 0 || y + k > 9)) {\r\n        console.log(\"failed1:\", x, y + k);\r\n        shipOK = false;\r\n      }\r\n      if (direction == 1 && (x + k > 9 || x + k < 0 || y < 0 || y > 9)) {\r\n        console.log(\"failed2\");\r\n        shipOK = false;\r\n      }\r\n    }\r\n\r\n    // overlaps with ship already placed\r\n    gridCheck.forEach((coord) => {\r\n      for (let i = 0; i < size; i++) {\r\n        if (direction == 0) {\r\n          if (coord[0] == x && coord[1] == y + i) {\r\n            console.log(\"failed3\");\r\n            shipOK = false;\r\n          }\r\n        } else {\r\n          if (coord[0] == x + i && coord[1] == y) {\r\n            console.log(\"failed4\");\r\n            shipOK = false;\r\n          }\r\n        }\r\n      }\r\n    });\r\n\r\n    // shipOK = false;\r\n    return shipOK;\r\n  }\r\n\r\n  function populateGrid(x, y, size, direction) {\r\n    let grid = [];\r\n    for (let i = 0; i < size; i++) {\r\n      if (direction == 0) {\r\n        grid.push([x, y + i]);\r\n      } else {\r\n        grid.push([x + i, y]);\r\n      }\r\n    }\r\n    return [...grid];\r\n  }\r\n\r\n  function finishShipPlacement() {\r\n    let shipsRemaining = document.querySelectorAll(\r\n      \".ship-container .square\"\r\n    ).length;\r\n    if (shipsRemaining === 0) {\r\n      btnToPage3.classList.remove(\"hidden\");\r\n      for (let ship in shipPlacement) {\r\n        playerControl\r\n          .getPlayers()[0]\r\n          .gameboard.placeShip(\r\n            shipPlacement[ship].position[0] / squareSize,\r\n            shipPlacement[ship].position[1] / squareSize,\r\n            shipPlacement[ship].length,\r\n            shipPlacement[ship].direction\r\n          );\r\n      }\r\n      document.querySelector(\".page2 .container\").classList.add(\"hidden\");\r\n    }\r\n  }\r\n\r\n  // functions for screen 3 - main battle\r\n  function battlePage() {\r\n    const canvas = _Canvas__WEBPACK_IMPORTED_MODULE_1___default()(\".page3\");\r\n    const playerCanvas = canvas[0];\r\n    const aiCanvas = canvas[1];\r\n    let gameover = false;\r\n\r\n    // place player ships\r\n    const playerShips = playerControl.getPlayers()[0].gameboard.getShips();\r\n    playerShips.forEach((ship) => {\r\n      dropShip(\r\n        ship.coords[0][0] * squareSize,\r\n        ship.coords[0][1] * squareSize,\r\n        ship.shipToPlace.length,\r\n        playerCanvas,\r\n        ship.shipToPlace.getDirection()\r\n      );\r\n    });\r\n\r\n    //set up random AI ship placement\r\n    placeAIShips();\r\n    aiShipsGameboard();\r\n\r\n    document.querySelector(\".player .overlay\").classList.remove(\"hidden\");\r\n\r\n    //on click to signal attack\r\n    aiCanvas.addEventListener(\"click\", async (e) => {\r\n      if (playerControl.getCurrentPlayer() == 0) {\r\n        let x = Math.floor(e.offsetX / squareSize);\r\n        let y = Math.floor(e.offsetY / squareSize);\r\n        gameover = await playerControl.attack(x, y);\r\n        if (gameover.status == true) {\r\n          _generalFuncs__WEBPACK_IMPORTED_MODULE_2___default()().nextScreen(\"page3\", \"page4\");\r\n          replaceCanvasElements();\r\n          winner();\r\n        }\r\n      }\r\n    });\r\n  }\r\n\r\n  // replacing canvas elements on screen three due to duplicate onClick methods\r\n  function replaceCanvasElements() {\r\n    let playerCanvas = document.querySelector(\".page3 .player\");\r\n    let aiCanvas = document.querySelector(\".page3 .AI\");\r\n\r\n    playerCanvas.remove();\r\n    aiCanvas.remove();\r\n\r\n    // create elements again\r\n    const divPlayer = document.createElement(\"div\");\r\n    const divAI = document.createElement(\"div\");\r\n    const pPlayer = document.createElement(\"p\");\r\n    const pAI = document.createElement(\"p\");\r\n    const canvasPlayer = document.createElement(\"canvas\");\r\n    const canvasAI = document.createElement(\"canvas\");\r\n    const playerOverlay = document.createElement(\"div\");\r\n    const aiOverlay = document.createElement(\"div\");\r\n\r\n    playerOverlay.className = \"overlay hidden\";\r\n    aiOverlay.className = \"overlay hidden\";\r\n\r\n    pPlayer.innerText = `${playerControl.getPlayers()[0].player}'s board:`;\r\n    pAI.innerText = `AI board:`;\r\n    divPlayer.classList.add(\"player\");\r\n    divAI.classList.add(\"AI\");\r\n    divPlayer.append(pPlayer);\r\n    divPlayer.append(canvasPlayer);\r\n    divPlayer.append(playerOverlay);\r\n    divAI.append(pAI);\r\n    divAI.append(canvasAI);\r\n    divAI.append(aiOverlay);\r\n\r\n    document.querySelector(\".page3 .container\").append(divPlayer);\r\n    document.querySelector(\".page3 .container\").append(divAI);\r\n  }\r\n\r\n  function placeAIShips() {\r\n    let ships = [5, 4, 3, 3, 2];\r\n    let key = 0;\r\n\r\n    while (ships.length > 0) {\r\n      // vertical or horizontal\r\n      let direction = Math.random() < 0.5 ? 1 : 0;\r\n      let size = ships[0];\r\n      let x = Math.floor(Math.random() * 10);\r\n      let y = Math.floor(Math.random() * 10);\r\n      let check = checkPlacement(x, y, size, direction, gridPopulatedAI);\r\n      if (check) {\r\n        let populated = populateGrid(x, y, size, direction);\r\n        gridPopulatedAI.push(...populated);\r\n        updateShipObject(key, size, [x, y], direction, shipPlacementAI);\r\n        ships.shift();\r\n        key++;\r\n      }\r\n    }\r\n  }\r\n\r\n  function aiShipsGameboard() {\r\n    for (let ship in shipPlacementAI) {\r\n      playerControl\r\n        .getPlayers()[1]\r\n        .gameboard.placeShip(\r\n          shipPlacementAI[ship].position[0],\r\n          shipPlacementAI[ship].position[1],\r\n          shipPlacementAI[ship].length,\r\n          shipPlacementAI[ship].direction\r\n        );\r\n    }\r\n  }\r\n\r\n  // functions for game over\r\n  function winner() {\r\n    let winnerDiv = document.querySelector(\".page4 .winner\");\r\n    let shipsDiv = document.querySelector(\".page4 .remaining-ships\");\r\n    let winner;\r\n    // player won\r\n    if (playerControl.checkWinner()) {\r\n      console.log(\"current player\", playerControl.getCurrentPlayer());\r\n      console.log(playerControl.getPlayers()[playerControl.getCurrentPlayer()]);\r\n      winner = playerControl.getPlayers()[playerControl.getCurrentPlayer()];\r\n    } else {\r\n      // AI won\r\n      winner = playerControl.getPlayers()[1];\r\n    }\r\n\r\n    winnerDiv.innerText = `Winner: ${winner.player}`;\r\n    shipsDiv.innerText = `Ships remaining: ${winner.gameboard.shipsRemaining()}`;\r\n  }\r\n\r\n  return {\r\n    playerControl,\r\n  };\r\n})();\r\n\r\nmodule.exports = game;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/Game.js?");

/***/ }),

/***/ "./src/scripts/Gameboard.js":
/*!**********************************!*\
  !*** ./src/scripts/Gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ship = __webpack_require__(/*! ./ship */ \"./src/scripts/ship.js\");\r\nconst Gameboard = () => {\r\n  // Create 10x10 grid\r\n  //NOTE: I may make this adjustable in the future?\r\n  let board = Array(10)\r\n    .fill(\"\")\r\n    .map((x) => Array(10).fill(\"\"));\r\n  let ships = [];\r\n\r\n  const getBoard = () => board;\r\n  const getShips = () => ships;\r\n  const getShipIndex = (index) => ships[index];\r\n\r\n  const resetGameboard = () => {\r\n    board = Array(10)\r\n      .fill(\"\")\r\n      .map((x) => Array(10).fill(\"\"));\r\n    ships = [];\r\n  };\r\n\r\n  const placeShip = (x, y, len, direction) => {\r\n    let shipToPlace = ship(len);\r\n    let coords = [];\r\n    for (let i = 0; i < len; i++) {\r\n      board[x][y] = \"SHIP\";\r\n      coords.push([x, y]);\r\n      if (direction == 1) {\r\n        x++;\r\n      } else {\r\n        y++;\r\n      }\r\n    }\r\n    if (direction == 0) {\r\n      shipToPlace.updateDirection();\r\n    }\r\n    ships.push({ coords, shipToPlace });\r\n  };\r\n\r\n  //ReceiveAttack\r\n  const receiveAttack = (x, y) => {\r\n    let status = \"miss\";\r\n    let coordIndex = -1;\r\n    let shipIndex = -1;\r\n    // check if it hasn't already been in that spot\r\n    if (board[x][y] == \"hit\" || board[x][y] == \"miss\") {\r\n      return;\r\n    }\r\n    // check if that spot contains a ship\r\n    if (board[x][y] == \"\") {\r\n      board[x][y] = \"miss\";\r\n    } else {\r\n      status = \"hit\";\r\n      for (let i = 0; i < ships.length; i++) {\r\n        for (let j = 0; j < ships[i].coords.length; j++) {\r\n          if (JSON.stringify([x, y]) == JSON.stringify(ships[i].coords[j])) {\r\n            coordIndex = j;\r\n            shipIndex = i;\r\n            board[x][y] = \"hit\";\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    if (coordIndex != -1 && shipIndex != -1) {\r\n      ships[shipIndex].shipToPlace.hit(coordIndex);\r\n      // will need to add check for game over & sunk\r\n      if (ships[shipIndex].shipToPlace.isSunk()) {\r\n        status = \"sunk\";\r\n      }\r\n    }\r\n    if (gameover()) {\r\n      return true;\r\n    }\r\n\r\n    return status;\r\n  };\r\n\r\n  const shipIndex = (x, y) => {\r\n    let coordIndex = -1;\r\n    let shipIndex = -1;\r\n    for (let i = 0; i < ships.length; i++) {\r\n      for (let j = 0; j < ships[i].coords.length; j++) {\r\n        if (JSON.stringify([x, y]) == JSON.stringify(ships[i].coords[j])) {\r\n          coordIndex = j;\r\n          shipIndex = i;\r\n        }\r\n      }\r\n    }\r\n    return { coordIndex, shipIndex };\r\n  };\r\n\r\n  const shipsRemaining = () => {\r\n    return ships.filter((ship) => !ship.shipToPlace.isSunk()).length;\r\n  };\r\n\r\n  const gameover = () => {\r\n    // check if each ship has been sunk\r\n    return ships.every((ship) => ship.shipToPlace.isSunk());\r\n  };\r\n  return {\r\n    getBoard,\r\n    placeShip,\r\n    receiveAttack,\r\n    gameover,\r\n    getShips,\r\n    shipsRemaining,\r\n    resetGameboard,\r\n    shipIndex,\r\n    getShipIndex,\r\n  };\r\n};\r\n\r\nmodule.exports = Gameboard;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/Gameboard.js?");

/***/ }),

/***/ "./src/scripts/Players.js":
/*!********************************!*\
  !*** ./src/scripts/Players.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const styleCanvas = __webpack_require__(/*! ./Canvas */ \"./src/scripts/Canvas.js\");\r\nconst canvasHit = __webpack_require__(/*! ./CanvasHit */ \"./src/scripts/CanvasHit.js\");\r\nconst Gameboard = __webpack_require__(/*! ./Gameboard */ \"./src/scripts/Gameboard.js\");\r\n\r\nconst Players = (name) => {\r\n  return name;\r\n};\r\n\r\nconst playerController = () => {\r\n  // this seems to call the canvas twice?\r\n  const canvas2 = styleCanvas(\".page3\");\r\n  const playerCanvas = canvas2[0];\r\n  const aiCanvas = canvas2[1];\r\n\r\n  let player1;\r\n  let player1Gameboard = Gameboard();\r\n  let player2 = Players(\"AI\");\r\n  let player2Gameboard = Gameboard();\r\n  let players;\r\n  let currentPlayer = 0;\r\n  let opponent = (currentPlayer + 1) % 2;\r\n\r\n  function delay(time) {\r\n    return new Promise((resolve) => setTimeout(resolve, time));\r\n  }\r\n\r\n  const createPlayer = (name) => {\r\n    player1 = Players(name);\r\n    players = [\r\n      { player: player1, gameboard: player1Gameboard },\r\n      { player: player2, gameboard: player2Gameboard },\r\n    ];\r\n  };\r\n\r\n  const getPlayers = () => {\r\n    return players;\r\n  };\r\n  const updatePlayer = () => {\r\n    currentPlayer = (currentPlayer + 1) % 2;\r\n    opponent = (currentPlayer + 1) % 2;\r\n  };\r\n  const getCurrentPlayer = () => currentPlayer;\r\n  const checkWinner = () => {\r\n    return players[opponent].gameboard.gameover() == true ? true : false;\r\n  };\r\n  const randomAIMove = () => {\r\n    let validCoords = false;\r\n    let status;\r\n    let x = Math.floor(Math.random() * 10);\r\n    let y = Math.floor(Math.random() * 10);\r\n    while (!validCoords) {\r\n      if (!isValidAttack(x, y)) {\r\n        console.log(\"try again AI...\");\r\n        x = Math.floor(Math.random() * 10);\r\n        y = Math.floor(Math.random() * 10);\r\n      } else {\r\n        validCoords = true;\r\n      }\r\n    }\r\n    status = players[0].gameboard.receiveAttack(x, y);\r\n    updatePlayer();\r\n    return { aiStatus: status, xAi: x, yAi: y };\r\n  };\r\n\r\n  const isValidAttack = (x, y) => {\r\n    let valid = false;\r\n    if (\r\n      players[opponent].gameboard.getBoard()[x][y] == \"hit\" ||\r\n      players[opponent].gameboard.getBoard()[x][y] == \"miss\"\r\n    ) {\r\n      return valid;\r\n    } else {\r\n      valid = true;\r\n    }\r\n    return valid;\r\n  };\r\n\r\n  const attack = async (x, y) => {\r\n    let validCoords = false;\r\n    let status;\r\n    if (!isValidAttack(x, y)) {\r\n      return;\r\n    } else {\r\n      validCoords = true;\r\n      status = players[opponent].gameboard.receiveAttack(x, y);\r\n      //If the ship is sunk need the index to update the canvas\r\n      if (status == \"sunk\") {\r\n        let { shipIndex } = players[opponent].gameboard.shipIndex(x, y);\r\n        let shipSunk = players[opponent].gameboard.getShipIndex(shipIndex);\r\n        console.log(\"ship sunk\", shipSunk);\r\n        shipSunk.coords.forEach((coord) => {\r\n          canvasHit(coord[0], coord[1], aiCanvas, status);\r\n        });\r\n      }\r\n      canvasHit(x, y, aiCanvas, status);\r\n      // update player\r\n      updatePlayer();\r\n      // AI turn\r\n      document.querySelector(\".player .overlay\").classList.add(\"hidden\");\r\n      document.querySelector(\".AI .overlay\").classList.remove(\"hidden\");\r\n      await delay(250);\r\n      let { aiStatus, xAi, yAi } = randomAIMove();\r\n      if (aiStatus == \"sunk\") {\r\n        let { shipIndex } = players[0].gameboard.shipIndex(xAi, yAi);\r\n        let shipSunk = players[0].gameboard.getShipIndex(shipIndex);\r\n        shipSunk.coords.forEach((coord) => {\r\n          canvasHit(coord[0], coord[1], playerCanvas, aiStatus);\r\n        });\r\n      }\r\n      canvasHit(xAi, yAi, playerCanvas, aiStatus);\r\n      if (aiStatus == true) {\r\n        status = aiStatus;\r\n      }\r\n\r\n      await delay(350);\r\n      document.querySelector(\".player .overlay\").classList.remove(\"hidden\");\r\n      document.querySelector(\".AI .overlay\").classList.add(\"hidden\");\r\n\r\n      return { status, aiStatus, xAi, yAi };\r\n    }\r\n  };\r\n\r\n  const showBoards = () => {\r\n    console.log(\"playerBoard\");\r\n    console.table(players[0].gameboard.getBoard());\r\n    console.log(\"AIBoard\");\r\n    console.table(players[1].gameboard.getBoard());\r\n  };\r\n\r\n  return {\r\n    updatePlayer,\r\n    getCurrentPlayer,\r\n    randomAIMove,\r\n    checkWinner,\r\n    attack,\r\n    showBoards,\r\n    createPlayer,\r\n    getPlayers,\r\n  };\r\n};\r\n\r\nmodule.exports = playerController;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/Players.js?");

/***/ }),

/***/ "./src/scripts/generalFuncs.js":
/*!*************************************!*\
  !*** ./src/scripts/generalFuncs.js ***!
  \*************************************/
/***/ ((module) => {

eval("const generalFuncs = () => {\r\n  function reset() {\r\n    //delete ship containers then remake - should solve issue with duplicating event listeners\r\n    let shipcontainers = document.querySelectorAll(\".page .ship-container\");\r\n    shipcontainers.forEach((container) => {\r\n      container.remove();\r\n    });\r\n\r\n    for (let i = 0; i < 5; i++) {\r\n      let div = document.createElement(\"div\");\r\n      div.classList.add(\"ship-container\");\r\n      document.querySelector(\".page2 .container\").append(div);\r\n    }\r\n\r\n    //reset variables\r\n    gridPopulated = [];\r\n    gridPopulatedAI = [];\r\n\r\n    document.querySelector(\".page2 .container\").classList.remove(\"hidden\");\r\n    document.querySelector(\".page2 button\").classList.add(\"hidden\");\r\n  }\r\n\r\n  function validateUsername() {\r\n    let pass = true;\r\n    let errors = [];\r\n    let ul = document.querySelector(\".err-msg\");\r\n    ul.innerHTML = \"\";\r\n\r\n    if (String(username.value).trim() == \"\") {\r\n      errors.push(\"username must not be blank\");\r\n      pass = false;\r\n    }\r\n    if (username.value.length < 3) {\r\n      errors.push(\"username must be greater than 3\");\r\n      pass = false;\r\n    }\r\n\r\n    if (/\\s/gi.test(username.value)) {\r\n      errors.push(\"username must not contain spaces\");\r\n      pass = false;\r\n    }\r\n    for (let err of errors) {\r\n      let li = document.createElement(\"li\");\r\n\r\n      li.innerText = err;\r\n      ul.append(li);\r\n    }\r\n\r\n    return pass;\r\n  }\r\n\r\n  function getElLoc(el) {\r\n    const rect = el.getBoundingClientRect();\r\n    return {\r\n      left: rect.left + window.scrollX,\r\n      right: rect.right - window.scrollX,\r\n      top: rect.top + window.scrollY,\r\n      bottom: rect.bottom - window.scrollY,\r\n    };\r\n  }\r\n\r\n  function nextScreen(curr, next) {\r\n    document.querySelector(`.${curr}`).classList.add(\"hidden\");\r\n    document.querySelector(`.${next}`).classList.remove(\"hidden\");\r\n  }\r\n\r\n  return {\r\n    reset,\r\n    validateUsername,\r\n    getElLoc,\r\n    nextScreen,\r\n  };\r\n};\r\n\r\nmodule.exports = generalFuncs;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/generalFuncs.js?");

/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((module) => {

eval("const ship = (len) => {\r\n  let position = Array(len).fill(0);\r\n  let direction = 1; //1 is horizontal, 0 is vertical\r\n  const getPosition = () => position;\r\n  const hit = (num) => {\r\n    position[num] = 1;\r\n  };\r\n  const isHit = () => {\r\n    return position.indexOf(1) == -1 ? false : true;\r\n  };\r\n  const isSunk = () => {\r\n    return position.every((pos) => pos === 1);\r\n  };\r\n  const getDirection = () => direction;\r\n  const updateDirection = () => {\r\n    direction = (direction + 1) % 2;\r\n  };\r\n\r\n  return {\r\n    length: len,\r\n    hit,\r\n    isSunk,\r\n    isHit,\r\n    getPosition,\r\n    getDirection,\r\n    updateDirection,\r\n  };\r\n};\r\n\r\nmodule.exports = ship;\r\n\n\n//# sourceURL=webpack://battleship/./src/scripts/ship.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (1:8)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> $body-bg: #000000;\\n| $footer-bg: #252427;\\n| $btn-primary: #12f529;\");\n\n//# sourceURL=webpack://battleship/./src/scss/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;