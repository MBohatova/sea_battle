let box_with_cells1 = document.querySelector('.cells_ship_box1');
let num_of_cells = 121;
let letters = 'abcdefghij';
let cell_content_1 = 0;


let ships = document.querySelectorAll('.ship');
let move_made_btn = document.querySelector('.move-made');
let currentDroppable = null;
let leftShipCoordinate = 0;
let topShipCoordinate = 0;
let sizeOfCell = 50;

for(let i = 0; i < num_of_cells; i++) {
  if(i > 0 && i < 11) {
    cell_content_1 = letters[i-1];
  } 
  
  if(i % 11 === 0 && i / 11 !== 0) {
    cell_content_1 = i / 11;
  }

  if(i < 1) {
    cell_content_1 = "";
  }

  box_with_cells1.insertAdjacentHTML('beforeEnd', `<div class="cell droppable">${cell_content_1}</div>`);
  cell_content_1 = "";
}

for(let ship of ships) {

  ship.onmousedown = function(event) {

  let shiftX = event.clientX - ship.getBoundingClientRect().left;
  let shiftY = event.clientY - ship.getBoundingClientRect().top;

    ship.style.position = 'absolute';
    ship.style.zIndex = 1;
    document.body.appendChild(ship);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      ship.style.left = pageX - shiftX + 'px';
      ship.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      ship.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ship.hidden = false;

      if(!elemBelow) return;

      let droppableBelow = elemBelow.closest('.droppable');

      if(currentDroppable != droppableBelow) {
        if(currentDroppable) {
          leaveDroppable(currentDroppable);
        }

        currentDroppable = droppableBelow;
        if(currentDroppable) {
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ship.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ship.onmouseup = null;
    };

    // вирахування координат корабля

    let boardX = box_with_cells1.getBoundingClientRect().left;
    let boardY = box_with_cells1.getBoundingClientRect().top;
  
    function getLeftShipCoordinatesInBoard(boardX, shiftX) {
      let shipInBoardCoordinate = boardX - shiftX;
      leftShipCoordinate = Math.floor(shipInBoardCoordinate / sizeOfCell);
      console.log(leftShipCoordinate);
    }

    getLeftShipCoordinatesInBoard(boardX, shiftX);

    function getTopShipCoordinatesInBoard(boardY, shiftY) {
      let shipInBoardCoordinate = boardY - shiftY;
      topShipCoordinate = Math.floor(shipInBoardCoordinate / sizeOfCell);
      console.log(topShipCoordinate);
    }
    
    getTopShipCoordinatesInBoard(boardY, shiftY);


  }

  function enterDroppable(elem) {
    if(elem.textContent !== '') {
      elem.style.background = '';
    } else {
      ship.style.display = 'none';
      box_with_cells1.insertAdjacentHTML('beforeEnd', 
      `<div class="ship-2 ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`)
    }
  }

  function leaveDroppable(elem) {
    elem.style.background = '';
  }

  ship.ondragstart = function() {
    return false;
  };
}

// координати борду (відносно сторінки) - координати мишки (відносно сторінки) = координати мишки (відносно борду)
// якщо координати мишки (відносно борду) > 0 та < 20 (гіпотетичний розмір клітинки), тоді координати мишки мають стати 0.
// координати мишки (відносно борду) / на розмір одної клітинки і округлюю до цілого меншого. 