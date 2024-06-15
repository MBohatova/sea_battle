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
          leftShipCoordinate = getShipCoordinate(event.pageX, boardX, shiftX);
          topShipCoordinate = getShipCoordinate(event.pageY, boardY, shiftY);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ship.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ship.onmouseup = null;
      ship.style.display = 'none';

      if(leftShipCoordinate < 0) {
        console.log(leftShipCoordinate);
        return leftShipCoordinate = 0;
      }
      if(topShipCoordinate < 0) {
        console.log(topShipCoordinate);
        return topShipCoordinate = 0;
      }
      console.log(leftShipCoordinate);
      console.log(topShipCoordinate);

      droppable_cell_container.insertAdjacentHTML('afterbegin', 
        `<div class="${this.className}, generated_ship" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`);
        
        let generated_ship = document.querySelector('.generated_ship');

        generated_ship.onmousedown = function(event) {
        
          let shiftX = event.clientX - generated_ship.getBoundingClientRect().left;
          let shiftY = event.clientY - generated_ship.getBoundingClientRect().top; 
      
          document.body.append(generated_ship);
      
          moveAt(event.pageX, event.pageY);
      
          function moveAt(pageX, pageY) {
            generated_ship.style.left = pageX - shiftX + 'px';
            generated_ship.style.top = pageY - shiftY + 'px';
          }
      
          function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            generated_ship.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            generated_ship.hidden = false;

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
                leftShipCoordinate = getShipCoordinate(event.pageX, boardX, shiftX);
                topShipCoordinate = getShipCoordinate(event.pageY, boardY, shiftY);

                // generated_ship.style.left = leftShipCoordinate;
                // generated_ship.style.top = topShipCoordinate;
              }
            }
          }
      
          document.addEventListener('mousemove', onMouseMove);

          generated_ship.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            generated_ship.onmouseup = null;
            generated_ship.style.display = 'none';

            if(leftShipCoordinate < 0) {
              return leftShipCoordinate = 0;
            }
            if(topShipCoordinate < 0) {
              return topShipCoordinate = 0;
            }
            console.log(leftShipCoordinate);
            console.log(topShipCoordinate);

            droppable_cell_container.insertAdjacentHTML('afterbegin', 
              `<div class="${this.className}, generated_ship_updated_position" style="position: absolute; left: ${leftShipCoordinate}; top: ${topShipCoordinate};"></div>`);
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

        generated_ship.ondragstart = function() {
          return false;
        };
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