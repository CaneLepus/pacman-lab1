import MovingDirection from "/src/MovingDirection.js";

export default function findShortestPath(
  startcoordinates,
  goalCoordinates,
  grid
) {
  let distanceFromTop = startcoordinates[0];
  let distanceFromLeft = startcoordinates[1];

  let location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: "Start",
  };

  let queue = [location];

  while (queue.length > 0) {
    let currentLocation = queue.shift();

    let newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.up,
      grid
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    let newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.right,
      grid
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    let newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.down,
      grid
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    let newLocation = exploreInDirection(
      currentLocation,
      MovingDirection.left,
      grid
    );
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }
  }
  return false;
}
function checkStatus(location, grid) {
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
  } else if (dft === goalCoordinates[0] && dfl === goalCoordinates[1]) {
    return "Goal";
  } else if (grid[dft][dfl] !== 10) {
    return "blocked";
  } else {
    return "Valid";
  }
}
function exploreInDirection(currentLocation, direction, grid) {
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
  newLocation.status = checkStatus(newLocation, grid);

  if (newLocation.status === "Valid") {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 10;
  }
  return newLocation;
}
