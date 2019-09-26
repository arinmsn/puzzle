// Initiate CSS Grid animation tool
const grid = document.querySelector(".grid");
const { forceGridAnimation } = animateCSSGrid.wrapGrid(grid);

// Get all the tiles and the empty tile
const tiles = Array.from(document.querySelectorAll(".tile"));
const emptyTile = document.querySelector(".tile--empty");

// Clean up Headers

const areaKeys = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "F"],
  D: ["A", "E", "G"],
  E: ["B", "D", "F", "H"],
  F: ["C", "E", "I"],
  G: ["D", "H"],
  H: ["E", "G", "I"],
  I: ["F", "H"]
};

// Even Listeners for tiles
tiles.map(tile => {
  tile.addEventListener("click", event => {
    const tileArea = tile.style.getPropertyValue("--area");
    const emptyTileArea = emptyTile.style.getPropertyValue("--area");

    emptyTile.style.setProperty("--area", tileArea);
    tile.style.setProperty("--area", emptyTileArea);

    forceGridAnimation();
    unlockTiles(tileArea);
  });
});

const unlockTiles = currentTileArea => {
  // Loop through tiles and decide which to unlock/lock
  tiles.map(tile => {
    const tileArea = tile.style.getPropertyValue("--area");

    if (areaKeys[currentTileArea.trim()].includes(tileArea.trim())) {
      tile.disabled = false;
    } else {
      tile.disabled = true;
    }
  });

  // Checking order of tiles...
  isComplete(tiles);
};

const isComplete = tiles => {
  const currentTilesString = tiles
    .map(tile => tile.style.getPropertyValue("--area").trim())
    .toString();
};

const inversionCount = array => {
  return array.reduce((accumulator, current, index, array) => {
    return array
      .slice(index)
      .filter(item => {
        return item < current;
      })
      .map(item => {
        return [current, item];
      })
      .concat(accumulator);
  }, []).length;
};
