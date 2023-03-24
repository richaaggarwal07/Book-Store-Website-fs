let page = 1;
let limit = 20;
function makeRequest() {
  const url = `https://book-store-fs.richa-aggarwal.repl.co/?page=${page}&limit=${limit}`;
  page += 1;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createRow(data.results);
    });
}

let p = 1;
let l = 20;
async function searchPagination(searchVal) {
  // let searchVal = document.getElementById('data').value.toLowerCase();
  const url = `https://book-store-fs.richa-aggarwal.repl.co/searchPagination?page=${p}&limit=${l}&searchVal=${searchVal}`;
  // for()
  p += 1;
  // let rorwsdata = document.getElementById('tb');
  // var rowCount = rorwsdata.rows.length;
  // for (var i = rowCount - 1; i > 0; i--) {
  //     rorwsdata.deleteRow(i);
  // }
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      createRow(data.results);
    });
}

function getMoreSerachData() {
  let searchVal = document.getElementById("genre").value.toLowerCase();
  searchPagination(searchVal);
}

// async function getAllData(searchValue){
//     const url = `http://localhost:3000/all`;
//     // for()
//     let rorwsdata = document.getElementById('tb');
//     var rowCount = rorwsdata.rows.length;
//     for (var i = rowCount - 1; i > 0; i--) {
//         rorwsdata.deleteRow(i);
//     }
//     let appendData=[];
//     fetch(url).then(res=>res.json().then(data=>{
//         data.map((value)=>
//         {
//            let cv=value.genres
//            if(cv.toLowerCase().includes(searchValue.toLowerCase())){
//                 appendData.push(value);
//                 //console.log(value)
//             }
//         })

//         createRow(appendData)

//     }))
// }

function getMoreData() {
  makeRequest();
}

function createRow(obj) {
  // console.log(obj)
  let mainTable = document.getElementById("tb");

  for (let i in obj) {
    let table_header_row = document.createElement("tr");
    // console.log(obj[i]);
    let img = document.createElement("td");

    let imgsrc = document.createElement("img");
    imgsrc.src = obj[i].coverImg;

    img.appendChild(imgsrc);
    table_header_row.appendChild(img);

    let title = document.createElement("td");
    title.innerHTML = obj[i].title;
    table_header_row.appendChild(title);

    let author = document.createElement("td");
    author.innerHTML = obj[i].author;
    table_header_row.appendChild(author);

    let rating = document.createElement("td");
    rating.innerHTML = obj[i].rating;
    table_header_row.appendChild(rating);

    let description = document.createElement("td");
    description.innerHTML = obj[i].description;
    table_header_row.appendChild(description);

    // let genres = document.createElement("td");
    // genres.innerHTML = obj[i].genres.substring(1, obj[i].genres.length - 1);
    // table_header_row.appendChild(genres);
   
    let generes=obj[i].genres.substring(1, obj[i].genres.length - 1);
    let genrespointer = document.createElement("td");
    let g = "";
    for(let x of generes){
      if(x != "'"){
        g += x;
      }
    }
    genrespointer.innerHTML = g;
    table_header_row.appendChild(genrespointer);


    let price = document.createElement("td");
    if (obj[i].price) {
      price.innerHTML = "$" + obj[i].price;
    } else {
      price.innerHTML = "$0.0";
    }
    // price.innerHTML = obj[i].price+'$';
    // table_header_row.appendChild("$");
    table_header_row.appendChild(price);

    let button = document.createElement("td");

    let btn = document.createElement("button");
    btn.innerHTML = "Add to favourite";

    btn.addEventListener("click", () => addToWishlist(obj[i],btn));

    button.appendChild(btn);
    table_header_row.appendChild(button);

    tb.appendChild(table_header_row);
  }
}
makeRequest();

let table = document.getElementById("tb");
function search() {
  let moreNormalDataButton = document.getElementById("paginated_data");
  moreNormalDataButton.style.display = "none";
  let moreSearchButton = document.getElementById("search_data");
  moreSearchButton.style.display = "block";

  // console.log(moreSearchButton)
  // let searchVal = document.getElementById('data').value.toLowerCase();
  let searchVal = document.getElementById("genre").value.toLowerCase();
  // console.log(searchVal);

  let rorwsdata = document.getElementById("tb");
  var rowCount = rorwsdata.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    rorwsdata.deleteRow(i);
  }
  searchPagination(searchVal);
  // getAllData(searchVal);
}



// wishlistData = [];
async function 

addToWishlist(obj,btn) {
  // wishlistData.push(obj);
  // const {author,bookId,characters,coverImg,description,genres,isbn,language,pages,price,publishDate,rating,series,title} = obj;
  // console.log("vgdhvchg",obj);
  // const {obj} = obj;
  // console.log(btn);
  // console.log(obj);

  await fetch(`https://book-store-fs.richa-aggarwal.repl.co/wishlistdata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // "author":author,
      // "bookId":bookId,
      // "characters":characters,
      // "coverImg":coverImg,
      // "description":description,
      // "genres":genres,
      // "isbn":isbn,
      // "language":language,
      // "pages":pages,
      // "price":price,
      // "publishDate":publishDate,
      // "rating":rating,
      // "series":series,
      // "title":title
      obj
    })
  });
  console.log("before button got disabled..")
  btn.disabled = true;
  alert("Book Added to Wishlist...");
}


  table = document.getElementById("tb");
        function searchAll(){
            let searchVal = document.getElementById('data').value.toLowerCase();
            let trows = table.rows;
            console.log("table search");
            // console.log(trows.length);
            for(let i = 1; i < trows.length ; i++){
                let cols = trows[i].getElementsByTagName('td');
                let flag = false;
                for(d of cols){
                  console.log(d)
                    colVal = d.textContent || d.innerText;
                    if(colVal.toLowerCase().includes(searchVal)){
                        flag = true;
                        break;
                    }
                }
                if(flag == false){
                    trows[i].style.display = 'none';
                }
                else{
                    trows[i].style.display = "";
                }
            }
        }


