import MovingDirection from "/src/MovingDirection.js";

// implemenatation of the breadth first search algorithm
// used for the ghosts pathfinding.
export default function findShortestPath(
  startcoordinates,
  goalCoordinates,
  grid,
  initialDirection
) {
  let distanceFromTop = startcoordinates[1];
  let distanceFromLeft = startcoordinates[0];

  let location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: "Start",
  };

  let queue = [location];
  // if start is equal to goal
  if (
    startcoordinates[0] === goalCoordinates[0] &&
    goalCoordinates[1] === startcoordinates[1]
  ) {
    return;
  }
  // while there still is valid paths to explore.
  while (queue.length > 0) {
    let currentLocation = queue.shift();

    // check if up is a valid move
    let newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.up,
      grid,
      goalCoordinates,
      initialDirection
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // check if right is a valid move
    newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.right,
      grid,
      goalCoordinates,
      initialDirection
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // check if down is a valid move
    newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.down,
      grid,
      goalCoordinates,
      initialDirection
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // check if left is a valid move
    newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.left,
      grid,
      goalCoordinates,
      initialDirection
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }
  }
  return false;
}
// function used for labeling each location to determine
// if a move there would be a valid/goal location.
function checkStatus(location, grid, goalCoordinates, initialDirection) {
  let height = grid.length;
  let width = grid[0].length;

  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;

  // if the location is outside the canvas or is a wall
  if (
    dfl < 0 ||
    dfl >= width ||
    dft < 0 ||
    dft >= height ||
    grid[dft][dfl] === 1
  ) {
    return "Invalid";
  }
  // if the location matches the goal location
  else if (dfl === goalCoordinates[0] && dft === goalCoordinates[1]) {
    return "Goal";
  }
  // if the tile already has been visited or blocked by constraints to movement.
  else if (blocked(grid, location, initialDirection)) {
    return "blocked";
  }
  // if the location is a valid location
  else {
    return "Valid";
  }
}
// function for traversing a step in either direction of the grid and setting parameters
// such as path so far and its coordinates.
// this function also calls the checkStatus function to label the location
function exploreInDirection(
  currentLocation,
  direction,
  grid,
  goalCoordinates,
  initialDirection
) {
  let newPath = currentLocation.path.slice();
  newPath.push(direction);

  let dft = currentLocation.distanceFromTop;
  let dfl = currentLocation.distanceFromLeft;

  // if checking the tile above
  if (direction === MovingDirection.up) {
    dft -= 1;
  }
  // if checking the tile to the right
  else if (direction === MovingDirection.right) {
    dfl += 1;
  }
  // if checking the tile below
  else if (direction === MovingDirection.down) {
    dft += 1;
  }
  // if checking the tile to the left
  else {
    dfl -= 1;
  }
  // creating an object for the new location
  let newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: "Unknown",
  };
  // setting a label to the new location
  newLocation.status = checkStatus(
    newLocation,
    grid,
    goalCoordinates,
    initialDirection
  );

  // if the label is "Valid" set the value of the tile to 10
  // this indicates that the tile already has been visited.
  if (newLocation.status === "Valid") {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 10;
  }
  return newLocation;
}
// function to check restraints in movement
function blocked(grid, location, initialDirection) {
  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;
  // if tile already has been visited
  if (grid[dft][dfl] === 10) {
    return true;
  }
  // if the first explored direction is the opposite to the initial direction
  else if (
    (location.path[0] === 1 && initialDirection === 2) ||
    (location.path[0] === 2 && initialDirection === 1) ||
    (location.path[0] === 0 && initialDirection === 3) ||
    (location.path[0] === 3 && initialDirection === 0)
  ) {
    return true;
  }
  // if explored direction suggests that the ghost should start to move
  // directly from left to right or vice versa.
  else if (
    (location.path[location.path.length - 1] === 1 &&
      location.path[location.path.length - 2] === 2) ||
    (location.path[location.path.length - 2] === 1 &&
      location.path[location.path.length - 1] === 2)
  ) {
    return true;
  }
  // if explored direction suggests that the ghost should start to move
  // directly from up to down or vice versa.
  else if (
    (location.path[location.path.length - 1] === 3 &&
      location.path[location.path.length - 2] === 0) ||
    (location.path[location.path.length - 2] === 3 &&
      location.path[location.path.length - 1] === 0)
  ) {
    return true;
  }
  return false;
}
