// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Import Express
const express = require('express')

// Create an Express app
const app = express()


app.get('/greetings/:username', (req, res) => {
  const user = req.params.username; // capture the username from the URL
  res.send(`Hello there, ${user}!`);
});


// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”



app.get('/roll/:num', (req, res) => {
    const num = Number(req.params.num);
    function getRandomInt(num) {
        return Math.floor(Math.random() * num) + 1;
}
     if (isNaN(num)){
        res.send(`You must specify a number.`)
     }

     else if (!isNaN(num)){
        const roll = getRandomInt(num);
        console.log(roll)
        res.send(`You rolled a ${roll}`);

     }
    });


// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

// Copy
// app.get('/hello', (req, res) => {
//     res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);

  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:objIdx', (req, res) => {
      const objIdx = Number(req.params.objIdx);


    if (isNaN(objIdx) || objIdx < 0 || objIdx >= collectibles.length){
          res.send(`This item is not yet in stock. Check back soon!`)
    }
    else{

          res.send(`So, you want the ${collectibles[objIdx].name}? For $ ${collectibles[objIdx].price}, it can be yours!`);
    }
});


///ex 4

//   Task: Create a route /shoes that filters the list of shoes based on query parameters.

// Query Parameters:

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.


const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {  
  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const priceType = req.query.type;

  let results = shoes;             //create a new list

  const min = Number(minPrice);
  const max = Number(maxPrice);


  if (minPrice) {
    if (isNaN(minPrice)) {
      return res.send('min-price must be a number');
    }
    results = results.filter(shoe => shoe.price >= min);
  }

  if (maxPrice) {
    if (isNaN(maxPrice)) {
      return res.send('max-price must be a number');
    }
    results = results.filter(shoe => shoe.price <= max);
  }

  if (priceType) {
    results = results.filter(shoe =>
      shoe.type.toLowerCase() === (priceType).toLowerCase()
    );
  }

  return res.json(results);
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})

