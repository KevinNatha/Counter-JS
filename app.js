// set initial value to zero
let count = 0;
let increaseInterval;
let decreaseInterval;
let speed = 100; // Interval speed in milliseconds (100ms by default)
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
      startDecreasing(); // Start automatic decreasing
    } else if (styles.contains("increase")) {
      startIncreasing(); // Start automatic increasing
    } else if (styles.contains("reset")) {
      count = 0; // Reset counter
      updateCounter();
    }
  });
});

// Generate a random number between min and max values and set it to the counter
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

// Start increasing counter automatically with interval
function startIncreasing() {
  if (increaseInterval) return; // Prevent multiple intervals

  increaseInterval = setInterval(function () {
    if (count < MAX_COUNT) {
      count++; // Increase the counter
      updateCounter();
    } else {
      clearInterval(increaseInterval); // Stop if maximum reached
      increaseInterval = null;
    }
  }, speed); // Adjust this value to set speed
}

// Stop increasing counter when the button is released or mouse leaves
document.querySelector(".increase").addEventListener("mouseup", function () {
  clearInterval(increaseInterval);
  increaseInterval = null;
});

document.querySelector(".increase").addEventListener("mouseleave", function () {
  clearInterval(increaseInterval);
  increaseInterval = null;
});

// Start decreasing counter automatically with interval
function startDecreasing() {
  if (decreaseInterval) return; // Prevent multiple intervals

  decreaseInterval = setInterval(function () {
    if (count > 0) { // Only decrease if count is greater than 0
      count--;
      updateCounter();
    }
  }, speed); // Adjust this value to set speed
}

// Stop decreasing counter when the button is released or mouse leaves
document.querySelector(".decrease").addEventListener("mouseup", function () {
  clearInterval(decreaseInterval);
  decreaseInterval = null;
});

document.querySelector(".decrease").addEventListener("mouseleave", function () {
  clearInterval(decreaseInterval);
  decreaseInterval = null;
});

// Speed control buttons for increasing and decreasing speed
document.querySelector(".speed-up").addEventListener("click", function () {
  if (speed > 10) { // Prevent the speed from being too fast
    speed -= 10; // Decrease interval time to speed up
  }
  updateSpeedDisplay();
});

document.querySelector(".speed-down").addEventListener("click", function () {
  speed += 10; // Increase interval time to slow down
  updateSpeedDisplay();
});

// Update the displayed speed value
function updateSpeedDisplay() {
  speedDisplay.textContent = `${speed}ms`; // Update the speed in the UI
  console.log(`Current speed: ${speed}ms`); // Optional: Log the speed to console for debugging
}

// Keyboard controls for increasing, decreasing, and resetting counter
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && count < MAX_COUNT) {
    count++; // Only increase if it's less than MAX_COUNT
  } else if (e.key === "ArrowDown") {
    if (count > 0) { // Only decrease if count is greater than 0
      count--;
    }
  } else if (e.key === "Escape") {
    count = 0;
  }
  updateCounter();
});
