const fs = require('fs');

  const createWishlist = (req,res)=>{
    try{
      let readVal=fs.readFileSync('../wishlist.json', 'utf8', (err, data) => {
              if (err) {
              console.error(err);
              return;
              }
          });
          // console.log("redval",readVal);
          console.log(req.body);
          let arr=JSON.parse(readVal);
          arr.push(req.body.obj);
          fs.writeFileSync('../wishlist.json',JSON.stringify(arr,null,2));
      }catch(err)
        {
          let newArray=[req.body.obj]
          fs.writeFileSync("../wishlist.json",JSON.stringify(newArray,null,2));
        }

     res.status(200).send("wishlist created")
 };

 const wishlistgetController=(req,res)=>
 {
    const readValue=fs.readFileSync('../wishlist.json','utf8',(err,data)=>
    {
     if (err) {
         console.error(err);
         return;
       }
    });
    
    // console.log("dtaa reading....",JSON.parse(readValue))
    result = JSON.parse(readValue);
    // console.log("...............",result);
    res.status(200).json(result)

 }

 const removewishlist = (req,res)=>{
  console.log('id',req.params.bookId)
  const bookId= req.params.bookId;
   
    let readVal = fs.readFileSync('../wishlist.json','utf8',(err,data) =>{
      if(err){
        console.log(err);
        return;
      }
      // console.log("jhsdvhcvhs",data);
    });
  
    const jsonData= JSON.parse(readVal);
    const objWithIdIndex = jsonData.findIndex((obj) => obj.bookId === bookId);
    jsonData.splice(objWithIdIndex, 1);
      console.log("here in after repo of delete");
      fs.writeFileSync("../wishlist.json",JSON.stringify(jsonData,null,2));
      res.send("success");
 }

 module.exports ={ createWishlist,wishlistgetController,removewishlist};