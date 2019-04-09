export default function () {

  const mainContainer = document.querySelector('.main-container'); // Create main container in html structure

  const currentDate = new Date(); // Get current local date

  let timeFormat = null; // Create empty variable for time format

  let hours = currentDate.getHours(); // Get current local hours

  // 12 hours format

  let twelveHours = hours % 12;
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  // Time format function

  const changeTimeFormat = () => {
    timeFormat = (hours >= 0 && hours < 12) ? 'AM' : 'PM';
  };

  changeTimeFormat();

  // Time Value function

  const setTimeValue = () => {
    mainContainer.textContent = `${twelveHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${timeFormat}`;
  }

  // Generators

  function* generatorOfSeconds() {
    while (true) {
      setTimeValue();
      if (seconds < 59) {
        seconds++;
      } else {
        seconds = 0;
        generatorOfMinutes().next();
      }
      yield seconds;
    }
  }

  function* generatorOfMinutes() {
    while (true) {
      if (minutes < 59) {
        minutes++;
      } else {
        minutes = 0;
        generatorOfHours().next();
      }
      yield minutes;
    }
  }

  function* generatorOfHours() {
    while (true) {
      if (twelveHours < 11) {
        twelveHours++;
      } else {
        twelveHours = 0;
        if (timeFormat === 'AM') {
          timeFormat = 'PM';
        } else {
          timeFormat = 'AM';
        }
      }
      yield twelveHours;
    }
  }

  // Generator call

  const startGenerators = generatorOfSeconds();

  setInterval(function () {
    startGenerators.next();
  }, 1000);

};

