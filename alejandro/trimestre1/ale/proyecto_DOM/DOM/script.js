
let menu = document.getElementById('menu');
let menu2 = DocumentTimeline.querySelector('#menu');

let items = menu.getElementsByClassName('item');
console.log("ITEMS:");
console.log(items);

let data = [].map.call(items, (item) => item.textContent);
console.log("DATA:");
console.log(data);

const items2 = document.getElementsByClassName('secondary');
console.log("ITEMS2:");
console.log(items2);

const data2 = Array.of(...items2).map((item) => item.textContent);
console.log("DATA2:");
console.log(data2);


// get the same data using getElementByName

const items3 = document.getElementsByName('example1');
console.log("ITEMS3:");
console.log(items3);

const data3 = Array.of(...items3).map((item) => item.textContent);
console.log("DATA3:");
console.log(data3);


const items4 = document.getElementsByClassName('item');
for(let item of items){
    console.log(item.childNodes);
};



