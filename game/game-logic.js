let flag = false;
let coords = [];
exports.controls = function (grid, command, bombLocation) {
  const obj = findCoordinates(grid);

  if (command == "!w") {
    let row = obj.user[0];
    let col = obj.user[1];
    if (row - 1 >= 1) {
      if (
        row - 1 > 1 &&
        bombNotThere(row - 1, col, bombLocation) &&
        grid[row - 1][col] == "🎁" &&
        grid[row - 2][col] == "⬜"
      ) {
        grid[row - 2][col] = "🎁";
        grid[row - 1][col] = "😀";
        grid[row][col] = "⬜";
       
      } else if (
        row - 1 > 1 &&
        bombNotThere(row - 1, col, bombLocation) &&
        grid[row - 1][col] == "🎁" &&
        grid[row - 2][col] == "❎"
      ) {
        grid[row - 2][col] = "✅";
        grid[row - 1][col] = "😀";
        grid[row][col] = "⬜";

      } else {
        if (
          grid[row - 1][col] == "⬜" &&
          bombNotThere(row - 1, col, bombLocation)
        ) {
          grid[row - 1][col] = "😀";
          grid[row][col] = "⬜";
         
        } else {
          if (
            !bombNotThere(row - 1, col, bombLocation) ||
            grid[row - 1][col] == "💣"
          ) {
            flag = true;
            coords = [row - 1, col, row, col];
          } else if (
            !bombNotThere(row - 2, col, bombLocation) ||
            grid[row - 2][col] == "💣"
          ) {
            flag = true;
            coords = [row - 2, col, row, col];
          }
        }
      }
    }
  } else if (command == "!s") {
    let row = obj.user[0];
    let col = obj.user[1];
    if (row + 1 <= 7) {
      if (
        row + 1 < 7 &&
        bombNotThere(row + 1, col, bombLocation) &&
        grid[row + 1][col] == "🎁" &&
        grid[row + 2][col] == "⬜"
      ) {
        grid[row + 2][col] = "🎁";
        grid[row + 1][col] = "😀";
        grid[row][col] = "⬜";

      } else if (
        row + 1 < 7 &&
        bombNotThere(row + 1, col, bombLocation) &&
        grid[row + 1][col] == "🎁" &&
        grid[row + 2][col] == "❎"
      ) {
        grid[row + 2][col] = "✅";
        grid[row + 1][col] = "😀";
        grid[row][col] = "⬜";

      } else {
        if (
          bombNotThere(row + 1, col, bombLocation) &&
          grid[row + 1][col] == "⬜"
        ) {
          grid[row + 1][col] = "😀";
          grid[row][col] = "⬜";
          
        } else {
          if (
            !bombNotThere(row + 1, col, bombLocation) ||
            grid[row + 1][col] == "💣"
          ) {
            flag = true;
            coords = [row + 1, col, row, col];
          } else if (
            !bombNotThere(row + 2, col, bombLocation) ||
            grid[row + 2][col] == "💣"
          ) {
            flag = true;
            coords = [row + 2, col, row, col];
          }
        }
      }
    }
  } else if (command == "!a") {
    let row = obj.user[0];
    let col = obj.user[1];
    if (col - 1 >= 1) {
      if (
        col - 1 > 1 &&
        bombNotThere(row, col - 1, bombLocation) &&
        grid[row][col - 1] == "🎁" &&
        grid[row][col - 2] == "⬜"
      ) {
        grid[row][col - 2] = "🎁";
        grid[row][col - 1] = "😀";
        grid[row][col] = "⬜";

      } else if (
        col - 1 > 1 &&
        bombNotThere(row, col - 1, bombLocation) &&
        grid[row][col - 1] == "🎁" &&
        grid[row][col - 2] == "❎"
      ) {
        grid[row][col - 2] = "✅";
        grid[row][col - 1] = "😀";
        grid[row][col] = "⬜";

      } else {
        if (
          bombNotThere(row, col - 1, bombLocation) &&
          grid[row][col - 1] == "⬜"
        ) {
          grid[row][col - 1] = "😀";
          grid[row][col] = "⬜";
         
        } else {
          if (
            !bombNotThere(row, col - 1, bombLocation) ||
            grid[row][col - 1] == "💣"
          ) {
            flag = true;
            coords = [row, col - 1, row, col];
          } else if (
            !bombNotThere(row, col - 2, bombLocation) ||
            grid[row][col - 2] == "💣"
          ) {
            flag = true;
            coords = [row, col - 2, row, col];
          }
        }
      }
    }
  } else if (command == "!d") {
    let row = obj.user[0];
    let col = obj.user[1];
    if (col + 1 <= 13) {
      if (
        col + 1 < 13 &&
        bombNotThere(row, col + 1, bombLocation) &&
        grid[row][col + 1] == "🎁" &&
        grid[row][col + 2] == "⬜"
      ) {
        grid[row][col + 2] = "🎁";
        grid[row][col + 1] = "😀";
        grid[row][col] = "⬜";
      } else if (
        col + 1 < 13 &&
        bombNotThere(row, col + 1, bombLocation) &&
        grid[row][col + 1] == "🎁" &&
        grid[row][col + 2] == "❎"
      ) {
        grid[row][col + 2] = "✅";
        grid[row][col + 1] = "😀";
        grid[row][col] = "⬜";
      } else {
        if (
          bombNotThere(row, col + 1, bombLocation) &&
          grid[row][col + 1] == "⬜"
        ) {
          grid[row][col + 1] = "😀";
          grid[row][col] = "⬜";
        } else {
          if (
            !bombNotThere(row, col + 1, bombLocation) ||
            grid[row][col + 1] == "💣"
          ) {
            flag = true;
            coords = [row, col + 1, row, col];
          } else if (
            !bombNotThere(row, col + 2, bombLocation) ||
            grid[row][col + 2] == "💣"
          ) {
            flag = true;
            coords = [row, col + 2, row, col];
          }
        }
      }
    }
  }
};
exports.dropLocation = function (grid) {
  let count = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] == "❎") {
        count++;
      }
    }
  }
  return count;
};
function findCoordinates(grid) {
  let user = [];
  let drops = [];
  let gifts = [];
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] == "😀") {
        user.push(i);
        user.push(j);
      } else if (grid[i][j] == "❎") {
        drops.push([i, j]);
      } else if (grid[i][j] == "🎁") {
        gifts.push([i, j]);
      }
    }
  }

  return { user, drops, gifts };
}

function bombNotThere(row, col, bombLocation) {

  for (let i = 0; i < bombLocation.length; i++) {
    const element = bombLocation[i];
    if (element[0] === row && element[1] === col) {
      
      return false;
    }
  }
  return true;
}
exports.isDead = function (grid, bombLocation) {
  bombLocation.forEach((bomb) => {
    if (bomb[0] === coords[0] && bomb[1] === coords[1]) {
      grid[bomb[0]][bomb[1]] = "💥";
      grid[coords[2]][coords[3]] = "💀";
    } else {
      if (flag) {
        grid[bomb[0]][bomb[1]] = "💣";
      }
    }
  });
  if (flag) {
    flag = false;
    coords = [];
    return true;
  }
  return flag;
};
