const express = require("express");
const cors = require("cors");
const fs = require("fs");
const controller = require('./controllers/wishlist.controller');
const bodyParser = require("body-parser")
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

let data = fs.readFileSync(`data.json`, "utf-8");
data = JSON.parse(data);
// app.get('/',(req,res)=>{
//     res.send("hello from about side");

// })
app.get("/all", (req, res) => {
  res.send(data);
});


app.get("/searchPagination", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  const searchValue = req.query.searchVal;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let appendData=[];

  const results = {};
  data.map((value) => {
    let cv = value.genres;
    
    if (cv.toLowerCase().includes(searchValue.toLowerCase())) {
      appendData.push(value);
      //console.log(value)
    }
  });
  // console.log(appendData)
  results.results = appendData.slice(startIndex, endIndex);
  res.json(results);
});

app.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  // const data = JSON.parse(data);

  const results = {};
  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.results = data.slice(startIndex, endIndex);
  res.json(results);
});

// console.log(wishlistController);
app.post('/wishlistdata',controller.createWishlist)

app.get("/wishlistdata",controller.wishlistgetController)

app.delete("/wishlistdata/:bookId",controller.removewishlist)

app.listen(3000, () => {
  console.log("listening to the port no. 3000");
});


