let bombLocation;

exports.gameGrid = function () {
  const row = 9;
  const column = 15;
  bombLocation = [];
  // 1st row all brick and last row too
  // then middle rows first and last col is brick and rest are accessible row 1 to 7 col 1 to 13
  let grid = [];
  for (let i = 0; i < row; i++) {
    let rowx = [];
    for (let j = 0; j < column; j++) {
      if (i === 0 || i === row - 1) {
        rowx.push("🟫");
      } else {
        if (j === 0 || j === column - 1) {
          rowx.push("🟫");
        } else {
          rowx.push("⬜");
        }
      }
    }
    grid.push(rowx);
  }

  // let insideWall = Math.trunc(Math.random() * 8); // max = 20 min 0
  // let drop = 1 + Math.trunc(Math.random() * 8);
  // let gifts = drop;
  // let bomb = 1 + Math.trunc(Math.random() * 8);
  // // randomizing the position of the user , drop position and gift position and then putting up the emoji over there

  // let insideWallPosition = constructPosition(insideWall, []);
  // let dropPosition = constructPosition(drop, insideWallPosition);
  // let giftsPosition = constructPosition(
  //   gifts,
  //   dropPosition,
  //   insideWallPosition
  // );
  // let bombPosition = constructPosition(
  //   bomb,
  //   giftsPosition,
  //   dropPosition,
  //   insideWallPosition
  // );
  //   console.log(insideWallPosition, dropPosition, giftsPosition, bombPosition);
  // modifyGrid(grid, insideWallPosition, "🟫");
  // modifyGrid(grid, dropPosition, "❎");
  // modifyGrid(grid, giftsPosition, "🎁");
  // modifyGrid(grid, bombPosition, "💣");

  //============================================================================
  //============================================================================
  //============================================================================
  //============================================================================
  //============================================================================
  //============================================================================

  // 2 position of drop 2 gift position and 1 user random

  let userRow = 1 + Math.trunc(Math.random() * 7);
  let userCol = 1 + Math.trunc(Math.random() * 13);
  grid[userRow][userCol] = "😀";
  let gift1Row;
  let gift1Col;

  let gift2Row;
  let gift2Col;

  let drop1Row;
  let drop1Col;

  let drop2Row;
  let drop2Col;

  for (let i = 0; i < 4; ) {
    for (; true; ) {
      gift1Row = 2 + Math.trunc(Math.random() * 5);
      gift1Col = 2 + Math.trunc(Math.random() * 11);
      if (gift1Row !== userRow || gift1Col !== userCol) {
        i++;
        grid[gift1Row][gift1Col] = "🎁";
        break;
      }
    }
    for (; true; ) {
      gift2Row = 2 + Math.trunc(Math.random() * 5);
      gift2Col = 2 + Math.trunc(Math.random() * 11);
      if (
        (gift2Row !== userRow || gift2Col !== userCol) &&
        (gift1Row !== gift2Row || gift1Col !== gift2Col)
      ) {
        i++;
        grid[gift2Row][gift2Col] = "🎁";
        break;
      }
    }
    for (; true; ) {
      drop1Row = 1 + Math.trunc(Math.random() * 7);
      drop1Col = 1 + Math.trunc(Math.random() * 13);
      if (
        (drop1Row !== userRow || drop1Col !== userCol) &&
        (gift1Row !== drop1Row || gift1Col !== drop1Col) &&
        (gift2Row !== drop1Row || gift2Col !== drop1Col)
      ) {
        i++;
        grid[drop1Row][drop1Col] = "❎";

        break;
      }
    }
    for (; true; ) {
      drop2Row = 1 + Math.trunc(Math.random() * 7);
      drop2Col = 1 + Math.trunc(Math.random() * 13);
      if (
        (drop2Row !== userRow || drop2Col !== userCol) &&
        (gift1Row !== drop2Row || gift1Col !== drop2Col) &&
        (gift2Row !== drop2Row || gift2Col !== drop2Col) &&
        (drop1Row !== drop2Row || drop2Col !== drop1Col)
      ) {
        i++;
        grid[drop2Row][drop2Col] = "❎";
        break;
      }
    }

   
    for (let i = 0; i < 5; ) {
      const bomb = [
        1 + Math.trunc(Math.random() * 7),
        1 + Math.trunc(Math.random() * 13),
      ];
      if (
        (bomb[0] !== userRow || bomb[1] !== userCol) &&
        (gift1Row !== bomb[0] || gift1Col !== bomb[1]) &&
        (gift2Row !== bomb[0] || gift2Col !== bomb[1]) &&
        (drop1Row !== bomb[0] || drop1Col !== bomb[1]) &&
        (drop2Row !== bomb[0] || drop2Col !== bomb[1])
      ) {
        i++;
        bombLocation.push(bomb);
        // grid[bomb[0]][bomb[1]] = "💣";
      }
    }
  }

  console.log(bombLocation );
  exports.bombLocation = bombLocation;
  return grid;
};
function modifyGrid(grid, arr, emoji) {
  arr.forEach((ele) => {
    grid[ele[0]][ele[1]] = emoji;
  });
}

function constructPosition(size, ...arrays) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    for (; true; ) {
      const Row = 1 + Math.trunc(Math.random() * 7);
      const Col = 1 + Math.trunc(Math.random() * 13);
      if (check(Row, Col, arr, ...arrays)) {
        arr.push([Row, Col]);
        break;
      }
      continue;
    }
  }
  console.log(arr);
  return arr;
}

function check(row, col, ...arrays) {
  arrays[0].forEach((ele) => {
    if (ele[0] == row && ele[1] == col) {
      console.log("match ");
      return false;
    }
  });
  for (let i = 1; i < arrays.length; i++) {
    const arr = arrays[i];
    arr.forEach((ele) => {
      if (ele[0] == row && ele[1] == col) {
        console.log("match");
        return false;
      }
    });
  }
  return true;
}
