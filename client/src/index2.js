
function createwishlistRows(obj) {
    // console.log("here in fun")
     // console.log(obj)
    let tb2 = document.getElementById('tb2');
        var rowCount = tb2.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
           tb2.deleteRow(i);
        }
     for (let i in obj) {
         let table_header_row = document.createElement('tr');
         // console.log(i);
         let img = document.createElement("td");

         let imgsrc = document.createElement('img');
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

         let genres = document.createElement("td");
         genres.innerHTML = obj[i].genres.substring(1,obj[i].genres.length-1);
         table_header_row.appendChild(genres);

         let price = document.createElement("td");
         if(obj[i].price){
             price.innerHTML = '$'+obj[i].price;
         }else{
             price.innerHTML = '$0.0';  
         }
         table_header_row.appendChild(price);


        console.log(obj[i]); 
        let bookId = obj[i].bookId;
        //  console.log("here",bookId);
         let button = document.createElement("td");

        let btn = document.createElement("button");
        btn.innerHTML = "Remove";

        btn.addEventListener("click", () => {
            removewishlist(bookId);
            // console.log(this.parentNode.parentNode.nodeName);
            // console.log(obj[i]);
            let tr =event.target.parentNode.parentNode;
            tr.remove();
        });
        button.appendChild(btn);
        table_header_row.appendChild(button);

         tb2.appendChild(table_header_row);
     }
 }

// createwishlistRows();

 async function getWishlistData()
 {
    const url =await fetch(`http://localhost:3000/wishlistdata`);
    let data=await url.json()
    console.log("here in getwishlist()",data);
    createwishlistRows(data);
}

getWishlistData();


function removewishlist(bookId){
    console.log("Delete Task")
    console.log(bookId);
    fetch(`http://localhost:3000/wishlistdata/${bookId}`, {
    method: 'DELETE',
    });
    console.log("calling getWishlistData func");
    // getWishlistData();
}




