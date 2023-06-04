import { Adress } from "./Adress.js";
import { Link } from "./Link.js";

function addAnimation() {
  let timeline = anime.timeline({ autoplay: true, easing: "easeInOutExpo" });
  timeline.add({
    targets: ".adress",
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(100, { start: 1000 }),
  });
  timeline.add({
    targets: ".line",
    delay: anime.stagger(100),
    scaleX: [0, 1],
  });
}

let helloLinks = [];
let hello = new Adress(1, "Hello", helloLinks, 100, 250);

let janeLinks = [];
let jane = new Adress(2, "Jane", janeLinks, 500, 200);

let joeLinks = [new Link(1, "Youtube", 0)];
let joe = new Adress(3, "Joe", joeLinks, 900, 300);

let johnLinks = [];
let john = new Adress(4, "John", johnLinks, 500, 400);

hello.connect(jane, 10);
hello.connect(john, 3);
jane.connect(joe, 5);
john.connect(jane, 2);

// let peterLinks = [new Link(1, "Youtube", 3)];
// let peter = new Adress(5, "Peter", peterLinks);

hello.render();
jane.render();
joe.render();
john.render();
let chemin = hello.getWay(1);
console.log(chemin);
Adress.colorize(chemin);
addAnimation();
