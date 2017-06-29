var chalk = require('chalk');

class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.waitingList = [];
    this.passengers = [];
    this.requests = [];
    this.interval = undefined;
    this.direction = "up";
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  update() {
    let direction = this.direction;
    let floor = this.floor;
    let maxFloor = 0;
    let minFloor = 10;

    if(this.requests.length === 0) {
      this.stop();
    }

    switch (direction) {
      case "up":
        this.requests.map((value, index) => {
          if (value === floor) {
            this._passengersEnter(value);
            this._passengersLeave(value);
          }
          if (value > maxFloor) {
            maxFloor = value;
          }
          if (value < minFloor) {
            minFloor = value;
          }
        });
        this.floorUp();
        break;
      case "down":
        this.requests.map((value, index) => {
          if (value === floor) {
            this._passengersEnter(value);
            this._passengersLeave(value);
          }
          if (value < minFloor) {
            minFloor = value;
          }
          if (value > maxFloor) {
            maxFloor = value;
          }
        });

        this.floorDown();
        break;
    }
    console.log(chalk.red("MAX -> " + maxFloor));
    console.log(chalk.red("MIN -> " + minFloor));
    if (floor < minFloor) {
      this.direction = "up";
    }
    else if (floor > maxFloor) {
      this.direction = "down";
    }


    this.log(direction, floor);
  }
  _passengersEnter(elevetorFloor) {
    this.waitingList.map((value, index) => {
      if (value.originFloor === elevetorFloor) {
        let waitingPerson = this.waitingList[index];
        this.waitingList.splice(index, 1);
        this.passengers.push(waitingPerson);
        this.requests.push(waitingPerson.destinationFloor);
        this.requests.shift();
        console.log(`${waitingPerson.name} has entered the elevator`);
      }
    });
  }
  _passengersLeave(elevetorFloor) {
    this.passengers.map((value, index) => {
      if (value.destinationFloor === elevetorFloor) {
        let leavingPerson = this.passengers[index];
        this.passengers.splice(index, 1);
        this.requests.shift();
        console.log(`${leavingPerson.name} has left the elevator`);
      }
    });
  }

  floorUp() {
    if (this.floor < this.MAXFLOOR)
      this.floor += 1;
  }
  floorDown() {
    if (this.floor > 0)
      this.floor -= 1;
  }
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
    console.log(`Call -> ${person.name}`);
  }
  log(direction, floor) {

    let txtRequest = "";
    this.requests.map((value) => { txtRequest += `${value}, ` });

    let txtPassengers = "";
    this.passengers.map((value) => { txtPassengers += `${value.name}, ` });

    let txtWaiting = "";
    this.waitingList.map((value) => { txtWaiting += `${value.name}, ` });

    console.log(chalk.blue('Direction: ') + direction + " | " + chalk.green('Floor: ') + floor + " | " + chalk.magenta("WaitingPassangers: ") + txtWaiting + "| " + chalk.cyan("Passengers: ") + txtPassengers + "| " + chalk.yellow("Requests: ") + txtRequest);
  }
}

module.exports = Elevator;
