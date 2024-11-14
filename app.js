// set initial value to zero
let count = 0;
let autoIncreaseInterval;
let autoDecreaseInterval;
let speed = 100; // Interval speed in milliseconds (100ms by default)
let isAutoMode = false; // Track if auto mode is enabled
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");
const speedDisplay = document.querySelector("#speed-value");

// Maximum limit for the counter
const MAX_COUNT = 5000;

// Random number variables
const minInput = document.querySelector("#min");
const maxInput = document.querySelector("#max");
const randomButton = document.querySelector(".generate-random");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      if (isAutoMode) {
        startAutoDecrease(); // Start automatic decreasing if auto mode is on
      } else {
        decreaseOnce(); // Decrease only once if auto mode is off
      }
    } else if (styles.contains("increase")) {
      if (isAutoMode) {
        startAutoIncrease(); // Start automatic increasing if auto mode is on
      } else {
        increaseOnce(); // Increase only once if auto mode is off
      }
    } else if (styles.contains("reset")) {
      resetCounter();
    } else if (styles.contains("auto")) {
      toggleAutoMode(); // Toggle auto mode on or off
    }
  });
});

// Function to generate a random number between min and max and set it to the counter
randomButton.addEventListener("click", function () {
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);
  
  if (min >= max) {
    alert("Minimum value must be less than maximum value.");
    return;
  }

  const randomNum = generateRandomNumber(min, max);
  count = randomNum; // Set the generated random number to the counter
  updateCounter();
});

// Function to generate a random number between min and max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update counter display with animation and color
function updateCounter() {
  value.textContent = count;
  value.classList.add("bounce");

  // Change color based on the counter value
  if (count > 0) {
    value.style.color = "green";
  } else if (count < 0) {
    value.style.color = "red";
  } else {
    value.style.color = "#222";
  }

  // Remove the bounce animation after a short delay
  setTimeout(() => {
    value.classList.remove("bounce");
  }, 200);
}

// Reset counter function
function resetCounter() {
  clearIntervals(); // Clear any active intervals
  count = 0; // Reset counter
  updateCounter();
}

// Single increase function for non-automatic mode
function increaseOnce() {
  if (count < MAX_COUNT) {
    count++;
    updateCounter();
  }
}

// Single decrease function for non-automatic mode
function decreaseOnce() {
  if (count > 0) {
    count--;
    updateCounter();
  }
}

// Function to start automatic increasing
function startAutoIncrease() {
  clearIntervals(); // Clear any active intervals to ensure only one is active

  autoIncreaseInterval = setInterval(function () {
    if (count < MAX_COUNT) {
      count++;
      updateCounter();
    } else {
      clearInterval(autoIncreaseInterval); // Stop if maximum reached
      autoIncreaseInterval = null;
    }
  }, speed);
}

// Function to start automatic decreasing
function startAutoDecrease() {
  clearIntervals(); // Clear any active intervals to ensure only one is active

  autoDecreaseInterval = setInterval(function () {
    if (count > 0) {
      count--;
      updateCounter();
    } else {
      clearInterval(autoDecreaseInterval); // Stop if minimum reached
      autoDecreaseInterval = null;
    }
  }, speed);
}

// Toggle auto mode function
function toggleAutoMode() {
  isAutoMode = !isAutoMode; // Toggle auto mode
  if (!isAutoMode) {
    clearIntervals(); // Stop any automatic intervals if auto mode is turned off
  }
}

// Clear all intervals
function clearIntervals() {
  clearInterval(autoIncreaseInterval);
  clearInterval(autoDecreaseInterval);
  autoIncreaseInterval = null;
  autoDecreaseInterval = null;
}

// Speed control buttons for increasing and decreasing speed
document.querySelector(".speed-up").addEventListener("click", function () {
  if (speed > 10) {
    speed -= 10; // Increase speed (lower interval)
  }
  updateSpeedDisplay();
});

document.querySelector(".speed-down").addEventListener("click", function () {
  speed += 10; // Decrease speed (increase interval)
  updateSpeedDisplay();
});

// Update the displayed speed value
function updateSpeedDisplay() {
  speedDisplay.textContent = `${speed}ms`; // Update the speed in the UI
}

// Keyboard controls for increasing, decreasing, and resetting counter
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && count < MAX_COUNT) {
    count++;
  } else if (e.key === "ArrowDown" && count > 0) {
    count--;
  } else if (e.key === "Escape") {
    resetCounter();
  }
  updateCounter();
});
    