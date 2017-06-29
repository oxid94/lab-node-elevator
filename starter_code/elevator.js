var chalk = require('chalk');

class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.waitingList = [];
    this.passengers = [];
    this.requests   = [];
    this.interval = undefined;
  }

  start() { 
    this.interval = setInterval( () => this.update() , 1000);
  }
  stop() { 
    clearInterval(this.interval);
  }
  update() {
    let direction = "up";
    let floor = this.floor;
    if( this.floor < this.requests[0] && this.floor < this.MAXFLOOR) {
      direction = "up";
      this.floorUp();
    } else if( this.floor > this.requests[0] && this.floor > 0) {
      direction = "down";
      this.floorDown();
    }

    this._passengersEnter();
    this._passengersLeave();

    this.log(direction,floor);

  }
  _passengersEnter() { 
    this.waitingList.map( (index, value) => {
      if(value.originFloor === this.floor) {
        let waitingPerson = waitingList[index];
        this.waitingList.splice(index,1);
        this.passengers.push(waitingPerson);
        this.requests.push(waitingPerson.destinationFloor);
        this.requests.splice(0,1);
        console.log(`${waitingPerson.name} has entered the elevator`);
      }
    } );
  }
  _passengersLeave() { 
    this.passengers.map( (index, value) => {
      if(value.destinationFloor === this.floor) {
        let leavingPerson = passengers[index];
        this.passengers.splice(index,1);
        console.log(`${leavingPerson.name} has left the elevator`);
      }
    } );
  }

  floorUp() {
      this.floor+=1;
  }
  floorDown() { 
      this.floor-=1;
  }
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }
  log(direction,floor) { 
    console.log(`Direction: ${direction} | Floor: ${floor} | WaitingPassangers: | Passengers:  | Requests: `);
  }
}

module.exports = Elevator;
