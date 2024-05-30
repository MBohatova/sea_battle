let box_with_cells1 = document.querySelector('.cells_ship_box1');
let num_cell_container = document.querySelector('.num_cell_container');
let cell_container = document.querySelector('.cell_container');
let droppable_cell_container = document.querySelector('.droppable_cell_container');

let cellsWithLettersNum = 11;
let cellsWithNumbersNum = 10;
let droppableCells = 100;

let letters = 'abcdefghij';
let cell_content_letters = 0;
let cell_content_nums = 0;
let cell_content_droppable = "";

let ships = document.querySelectorAll('.ship');
let move_made_btn = document.querySelector('.move-made');
let currentDroppable = null;
let leftShipCoordinate = 0;
let topShipCoordinate = 0;
let sizeOfCell = 50;

for(let i = 0; i < cellsWithLettersNum; i++) {
  if(i > 0) {
    cell_content_letters = letters[i - 1];
  }

  if(i < 1) {
    cell_content_letters = "";
  }
  cell_container.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_letters}</div>`);
}

for(let i = 0; i < cellsWithNumbersNum; i++) {
  cell_content_nums ++;
  num_cell_container.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_nums}</div>`);
}

for(let i = 0; i < droppableCells; i++) {
  droppable_cell_container.insertAdjacentHTML('beforeEnd', `<div class="cell droppable">${cell_content_droppable}</div>`)
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

          let boardX = droppable_cell_container.getBoundingClientRect().left;
          let boardY = droppable_cell_container.getBoundingClientRect().top;
      
          function getShipCoordinate(ship_coordinate, board_coordinate, shift) {
            return (Math.floor((ship_coordinate - board_coordinate - shift) / sizeOfCell) * sizeOfCell) + 'px';
        }
        
          console.log('left', leftShipCoordinate = getShipCoordinate(event.pageX, boardX, shiftX));
          console.log('top', topShipCoordinate = getShipCoordinate(event.pageY, boardY, shiftY));
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ship.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ship.onmouseup = null;
      ship.style.display = 'none';

      for(let ship of ships) {
        if(this.classList.contains('ship-1')) {
          droppable_cell_container.insertAdjacentHTML('afterbegin', 
          `<div class="ship-1 ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`)
        }

        if(this.classList.contains('ship-2')) {
          droppable_cell_container.insertAdjacentHTML('afterbegin', 
          `<div class="ship-2 ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`)
        }

        if(this.classList.contains('ship-3')) {
          droppable_cell_container.insertAdjacentHTML('afterbegin', 
          `<div class="ship-3 ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`)
        }

        if(this.classList.contains('ship-4')) {
          droppable_cell_container.insertAdjacentHTML('afterbegin', 
          `<div class="ship-4 ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`)
        }
      }
    };
  }

  function enterDroppable(elem) {
    if(elem.textContent !== '') {
      elem.style.background = '';
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