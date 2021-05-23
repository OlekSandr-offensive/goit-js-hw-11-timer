const refs = {
  myTimerId: document.querySelector("#timer-1"),
  daysEl: document.querySelector('#timer-1 .value[data-value="days"]'),
  hoursEl: document.querySelector('#timer-1 .value[data-value="hours"]'),
  minsEl: document.querySelector('#timer-1 .value[data-value="mins"]'),
  secsEl: document.querySelector('#timer-1 .value[data-value="secs"]'),
};

const PROM_DALEY = 1000;

class CountdownTimer {
  constructor({ onTick, selector, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const startTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = currentTime - startTime;
      // const timeComponents = this.getTimeComponents(deltaTime);

      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = this.pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const mins = this.pad(
        Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      );
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

      refs.daysEl.innerHTML = days;
      refs.hoursEl.innerHTML = hours;
      refs.minsEl.innerHTML = mins;
      refs.secsEl.innerHTML = secs;

      //   this.onTick(timeComponents);
    }, PROM_DALEY);
  }

  //   getTimeComponents(time) {
  //     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  //     const hours = this.pad(
  //       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //     );
  //     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  //     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  //     return { days, hours, mins, secs };
  //   }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2019"),
  //   onTick: updateClockface,
});

timer.start();

// function updateClockface({ days, hours, mins, secs }) {
//   refs.myTimerId.textContent = `${days}:${hours}:${mins}:${secs}`;
// }
