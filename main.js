import { Adress } from "./Adress.js";
import { Link } from "./Link.js";

let helloLinks = [];
let hello = new Adress(1, "Hello", helloLinks);

let janeLinks = [];
let jane = new Adress(2, "Jane", janeLinks);

let joeLinks = [];
let joe = new Adress(3, "Joe", joeLinks);

let johnLinks = [];
let john = new Adress(4, "John", johnLinks);

let peterLinks = [new Link(1, "Youtube", 3)];
let peter = new Adress(5, "Peter", peterLinks);

hello.connect(joe, 5);
joe.connect(hello, 6);
joe.connect(jane, 17);
joe.connect(john, 2);
joe.connect(peter, 9);
jane.connect(joe, 3);
jane.connect(john, 4);
jane.connect(peter, 2);
john.connect(joe, 4);
john.connect(jane, 4);
john.connect(peter, 20);

let chemin = hello.getWay(1);
console.log(chemin);
