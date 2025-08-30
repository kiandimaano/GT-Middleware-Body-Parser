let names = ["Alice", "Bob", "Charlie", "Eddie", "France"];

names.push("George");
console.log(names);

names.pop();
console.log(names);

let index = names.indexOf("Eddie");
if (index !== -1) {
    names[index] = "Edward";
}

names.forEach((x) => {
    if (x === "Alice") {
        console.log("Found Alice!");
    }
});