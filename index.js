const PROM_DALEY = 1000;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = this.getSelectorEl(selector);
    this.targetDate = targetDate;
  }

  start() {
    this.countdownTimer();

    this.intervalId = setInterval(() => {
      this.countdownTimer();
    }, PROM_DALEY);
  }

  countdownTimer() {
    const startTime = this.targetDate;
    const currentTime = Date.now();
    const time = startTime - currentTime;
    const timeComponents = this.getTimeComponent(time);

    this.updateClockFace(timeComponents);
  }

  getSelectorEl(timeId) {
    const refs = {
      daysEl: document.querySelector(`${timeId} [data-value="days"]`),
      hoursEl: document.querySelector(`${timeId} [data-value="hours"]`),
      minsEl: document.querySelector(`${timeId} [data-value="mins"]`),
      secsEl: document.querySelector(`${timeId} [data-value="secs"]`),
    };
    return refs;
  }

  updateClockFace({ days, hours, mins, secs }) {
    this.selector.daysEl.innerHTML = days;
    this.selector.hoursEl.innerHTML = hours;
    this.selector.minsEl.innerHTML = mins;
    this.selector.secsEl.innerHTML = secs;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimeComponent(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
});

timer.start();
