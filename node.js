const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log(req.url);
const pathName = req.url;
if ( pathName== "/"||pathName == "overview"){
    res.end("this is overview");

}else if(pathName == "/product"){
  
res.end("this is product view");
}

})

server.listen(8000, '127.0.0.1', () => {
   
    console.log('Listening to requests on port 8000');
  });