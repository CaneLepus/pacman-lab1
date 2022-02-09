import MovingDirection from "/src/MovingDirection.js";

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
  if (
    startcoordinates[0] === goalCoordinates[0] &&
    goalCoordinates[1] === startcoordinates[1]
  ) {
    return;
  }
  while (queue.length > 0) {
    let currentLocation = queue.shift();

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
function checkStatus(location, grid, goalCoordinates, initialDirection) {
  let height = grid.length;
  let width = grid[0].length;

  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;

  if (
    dfl < 0 ||
    dfl >= width ||
    dft < 0 ||
    dft >= height ||
    grid[dft][dfl] === 1
  ) {
    return "Invalid";
  } else if (dfl === goalCoordinates[0] && dft === goalCoordinates[1]) {
    return "Goal";
  } else if (blocked(grid, location, initialDirection)) {
    return "blocked";
  } else {
    return "Valid";
  }
}
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

  if (direction === MovingDirection.up) {
    dft -= 1;
  } else if (direction === MovingDirection.right) {
    dfl += 1;
  } else if (direction === MovingDirection.down) {
    dft += 1;
  } else {
    dfl -= 1;
  }

  let newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: "Unknown",
  };
  newLocation.status = checkStatus(
    newLocation,
    grid,
    goalCoordinates,
    initialDirection
  );

  if (newLocation.status === "Valid") {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 10;
  }
  return newLocation;
}
function blocked(grid, location, initialDirection) {
  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;
  console.log("1: " + location.path.at(-1));
  console.log("2: " + location.path.at(-2));
  if (grid[dft][dfl] === 10) {
    return true;
  } else if (
    (location.path[0] === 1 && initialDirection === 2) ||
    (location.path[0] === 2 && initialDirection === 1) ||
    (location.path[0] === 0 && initialDirection === 3) ||
    (location.path[0] === 3 && initialDirection === 0)
  ) {
    return true;
  } else if (
    (location.path[location.path.length - 1] === 1 &&
      location.path[location.path.length - 2] === 2) ||
    (location.path[location.path.length - 2] === 1 &&
      location.path[location.path.length - 1] === 2)
  ) {
    return true;
  } else if (
    (location.path[location.path.length - 1] === 3 &&
      location.path[location.path.length - 2] === 0) ||
    (location.path[location.path.length - 2] === 3 &&
      location.path[location.path.length - 1] === 0)
  ) {
    return true;
  }
  return false;
}
