let box_with_cells1 = document.querySelector('.cells_ship_box1');
let num_of_cells = 121;
let letters = 'abcdefghij';
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let cell_content_1;

// for(let i = 0; i < num_of_cells; i++) {
//   let cell = document.createElement('div');
//   cell.classList.add('cell');
//   box_with_cells1.appendChild(cell);

//   if(i > 0 && i < 11) {
//     cell.textContent = letters[0]
//   }

//   if(i > 1 && i < 11) {
//     cell.textContent = letters[1]
//   }

//   if(i > 2 && i < 11) {
//     cell.textContent = letters[2]
//   }

//   if(i > 3 && i < 11) {
//     cell.textContent = letters[3]
//   }

//   if(i > 4 && i < 11) {
//     cell.textContent = letters[4]
//   }

//   if(i > 5 && i < 11) {
//     cell.textContent = letters[5]
//   }

//   if(i > 6 && i < 11) {
//     cell.textContent = letters[6]
//   }

//   if(i > 7 && i < 11) {
//     cell.textContent = letters[7]
//   }

//   if(i > 8 && i < 11) {
//     cell.textContent = letters[8]
//   }

//   if(i > 9 && i < 11) {
//     cell.textContent = letters[9]
//   }

//   if(i > 10 && i < 11) {
//     cell.textContent = letters[10]
//   }
// }

for(let i = 0; i < num_of_cells; i++) {
  if(i > 0 && i < 11) {
    cell_content_1 = letters[0];
  }
  if(i > 1 && i < 11) {
    cell_content_1 = letters[1];
  } 
  if(i > 2 && i < 11) {
    cell_content_1 = letters[2];
  }
  if(i > 3 && i < 11) {
    cell_content_1 = letters[3];
  }
  if(i > 4 && i < 11) {
    cell_content_1 = letters[4];
  }
  if(i > 5 && i < 11) {
    cell_content_1 = letters[5];
  }
  if(i > 6 && i < 11) {
    cell_content_1 = letters[6];
  }
  if(i > 7 && i < 11) {
    cell_content_1 = letters[7];
  }
  if(i > 8 && i < 11) {
    cell_content_1 = letters[8];
  }
  if(i > 9 && i < 11) {
    cell_content_1 = letters[9];
  }
  if(i > 10 && i < 11) {
    cell_content_1 = letters[10];
  }
  if(i === 0) {
    cell_content_1 = '';
  }
  if(i >= 11) {
    cell_content_1 = '';
  }
  
  if(i === 11) {
    cell_content_1 = nums[0];
  }
  if(i === 22) {
    cell_content_1 = nums[1];
  }
  if(i === 33) {
    cell_content_1 = nums[2];
  }
  if(i === 44) {
    cell_content_1 = nums[3];
  }
  if(i === 55) {
    cell_content_1 = nums[4];
  }
  if(i === 66) {
    cell_content_1 = nums[5];
  }
  if(i === 77) {
    cell_content_1 = nums[6];
  }
  if(i === 88) {
    cell_content_1 = nums[7];
  }
  if(i === 99) {
    cell_content_1 = nums[8];
  }
  if(i === 110) {
    cell_content_1 = nums[9];
  }
  box_with_cells1.insertAdjacentHTML('beforeEnd', `<div class="cell">${cell_content_1}</div>`);
}
