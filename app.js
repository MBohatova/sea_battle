let box_with_cells1 = document.querySelector('.cells_ship_box1');
let cells_ship_box2 = document.querySelector('.cells_ship_box2');
let num_cell_container = document.querySelector('.num_cell_container');
let num_cell_container_2 = document.querySelector('.num_cell_container_2');
let cell_container = document.querySelector('.cell_container');
let cell_container_2 = document.querySelector('.cell_container_2');
let droppable_cell_container = document.querySelector('.droppable_cell_container');
let droppable_cell_container_2 = document.querySelector('.droppable_cell_container_2');
let button = document.querySelector('.button');
let button2 = document.querySelector('.button2');
let cover_elem = document.querySelector('.cover_elem');
let cover_elem2 = document.querySelector('.cover_elem2');

let cellsWithLettersNum = 11;
let cellsWithNumbersNum = 10;
let droppableCells = 100;

let letters = 'abcdefghij';
let cell_content_letters = 0;
let cell_content_nums = 0;
let cell_content_droppable = "";

let ships = document.querySelectorAll('.ship');
let second_group_ships = document.querySelectorAll('.second_ship');
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

let boardX = droppable_cell_container.getBoundingClientRect().left;
let boardY = droppable_cell_container.getBoundingClientRect().top;
let second_boardX = droppable_cell_container_2.getBoundingClientRect().left;
let second_boardY = droppable_cell_container_2.getBoundingClientRect().top;

for(let i = 0; i < cellsWithLettersNum; i++) {
  if(i > 0) {
    cell_content_letters = letters[i - 1];
  }

  if(i < 1) {
    cell_content_letters = "";
  }
  cell_container.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_letters}</div>`);
  cell_container_2.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_letters}</div>`);
}

for(let i = 0; i < cellsWithNumbersNum; i++) {
  cell_content_nums ++;
  num_cell_container.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_nums}</div>`);
  num_cell_container_2.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_nums}</div>`);
}

for(let i = 0; i < droppableCells; i++) {
  id_name = i + '_cell';
  id_arr.push(id_name);
  droppable_cell_container.insertAdjacentHTML('beforeEnd', `<div id="${id_name}" class="cell droppable">${cell_content_droppable}</div>`);
  droppable_cell_container_2.insertAdjacentHTML('beforeEnd', `<div id="${id_name}" class="cell second_droppable">${cell_content_droppable}</div>`);
  cover_elem.insertAdjacentHTML('beforeEnd', `<div id="${id_name}" class="cell invalid_cell">${cell_content_droppable}</div>`);
  cover_elem2.insertAdjacentHTML('beforeEnd', `<div id="${id_name}" class="cell invalid_cell">${cell_content_droppable}</div>`);
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
      console.log(elemBelow);
      ship.hidden = false;

      if(!elemBelow) return;

      let droppableBelow = elemBelow.closest('.droppable');

      if(currentDroppable != droppableBelow) {
        currentDroppable = droppableBelow;
        if(currentDroppable) { 
          leftShipCoordinate = getShipCoordinate(event.pageX, boardX, shiftX);
          topShipCoordinate = getShipCoordinate(event.pageY, boardY, shiftY) + sizeOfCell;

          console.log(leftShipCoordinate, 'left');
          console.log(topShipCoordinate, 'top');
        
          elem_id = droppableBelow.getAttribute('id');
          console.log(elem_id);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ship.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ship.onmouseup = null;

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
    }
    moveMade(button, ship, cover_elem);
  }

  ship.ondragstart = function() {
    return false;
  };
}

for(let second_ship of second_group_ships) {
  second_ship.onmousedown = function(event) {

    let shiftX = event.clientX - second_ship.getBoundingClientRect().left;
    let shiftY = event.clientY - second_ship.getBoundingClientRect().top;
  
      second_ship.style.position = 'absolute';
      second_ship.style.zIndex = 1;
      document.body.appendChild(second_ship);
  
      moveAt(event.pageX, event.pageY);
  
      function moveAt(pageX, pageY) {
        second_ship.style.left = pageX - shiftX + 'px';
        second_ship.style.top = pageY - shiftY + 'px';
      }
  
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
  
        second_ship.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        second_ship.hidden = false;
  
        if(!elemBelow) return;
  
        let droppableBelow = elemBelow.closest('.second_droppable');
  
        if(currentDroppable != droppableBelow) {
          currentDroppable = droppableBelow;
          if(currentDroppable) { 
            leftShipCoordinate = getShipCoordinate(event.pageX, second_boardX, shiftX);
            topShipCoordinate = getShipCoordinate(event.pageY, second_boardY, shiftY) + sizeOfCell;
  
            console.log(leftShipCoordinate, 'left');
            console.log(topShipCoordinate, 'top');
          
            elem_id = droppableBelow.getAttribute('id');
            console.log(elem_id);
          }
        }
      }
  
      document.addEventListener('mousemove', onMouseMove);

      second_ship.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        second_ship.onmouseup = null;
  
        maxAvailableCellX = (cellsWithNumbersNum - (second_ship.getBoundingClientRect().width / sizeOfCell)) * sizeOfCell;
  
        if(leftShipCoordinate > maxAvailableCellX) {
          leftShipCoordinate = maxAvailableCellX;
        }
  
        if(leftShipCoordinate < 0) {
          leftShipCoordinate = 0;
        }
        if(topShipCoordinate < 0) {
          topShipCoordinate = 0;
        }
  
        second_ship.style.left = leftShipCoordinate + second_boardX + 'px';
        second_ship.style.top = topShipCoordinate + second_boardY + 'px';
      }

    moveMade(button2, second_ship, cover_elem2);
  }
  
  second_ship.ondragstart = function() {
      return false;
  };
}

function getShipCoordinate(ship_coordinate, board_coordinate, shift) {
  return (Math.floor((ship_coordinate - board_coordinate - shift) / sizeOfCell) * sizeOfCell);
}

function moveMade(btn, elem, cover) {
  btn.addEventListener('click', function() {
    btn.style.backgroundColor = 'darkBlue';
    elem.onmousedown = null;
    cover.style.display = 'inherit';
  });
};