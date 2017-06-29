const Elevator = require('./elevator.js');
const Person = require('./person.js');

const elevator = new Elevator();
let isa = new Person("Isa", 0, 4);
let raul = new Person("Raul", 2, 5);
let fer = new Person("Fer", 5, 1);
let gonzu = new Person("Gonzu", 7, 4);

elevator.call(isa);
elevator.call(raul);
elevator.call(fer);
elevator.start();

setTimeout(() => { elevator.call(gonzu) }, 10000);