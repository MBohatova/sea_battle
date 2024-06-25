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
let cells = document.querySelectorAll('.cell');
let move_made_btn = document.querySelector('.move-made');
let currentDroppable = null;
let leftShipCoordinate = 0;
let topShipCoordinate = 0;
let sizeOfCell = 50;
let maxAvailableCellX = null;
let maxAvailableCellY = null;
let id_name = "";
let id_arr = [];
let elem_id = "";

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
  id_name = i + '_cell';
  id_arr.push(id_name);
  droppable_cell_container.insertAdjacentHTML('beforeEnd', `<div id="${id_name}" class="cell droppable">${cell_content_droppable}</div>`);
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
            return (Math.floor((ship_coordinate - board_coordinate - shift) / sizeOfCell) * sizeOfCell);
          }
          leftShipCoordinate = getShipCoordinate(event.pageX, boardX, shiftX);
          topShipCoordinate = getShipCoordinate(event.pageY, boardY, shiftY);
        
          elem_id = droppableBelow.getAttribute('id');
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ship.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ship.onmouseup = null;

      let boardX = droppable_cell_container.getBoundingClientRect().left;
      let boardY = droppable_cell_container.getBoundingClientRect().top;

      maxAvailableCellX = (cellsWithNumbersNum - (ship.getBoundingClientRect().width / sizeOfCell)) * sizeOfCell;

      if(leftShipCoordinate > maxAvailableCellX) {
        leftShipCoordinate = maxAvailableCellX;
      }

      if(leftShipCoordinate < 0) {
        leftShipCoordinate = 0;
      }
      if(topShipCoordinate < 0) {
        topShipCoordinate = 0;
      }

      ship.style.left = leftShipCoordinate + boardX + 'px';
      ship.style.top = topShipCoordinate + boardY + 'px';

      for(let i = 0; i < id_arr.length; i++) {
        if(id_arr[i] === elem_id) {
          document.getElementById(id_arr[i + 1]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i - 1]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i + 10]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i - 10]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i - 11]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i - 9]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i + 9]).style.backgroundColor = 'red';
          document.getElementById(id_arr[i + 11]).style.backgroundColor = 'red';
        }
      }
    }
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