const { error } = require('console');
const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');
//server

const replaceTemplate = (temp , product)=>{
  let output = temp.replace(/{%PRODUCTNAME%}/g , product.productName);
  output = output.replace(/{%IMAGE%}/g , product.image );
  output = output.replace(/{%PRICE%}/g , product.price );
  output = output.replace(/{%FROM%}/g , product.from );
  output = output.replace(/{%QUANTITY%}/g , product.quantity );
  output = output.replace(/{%ID%}/g , product.id );
  if(!product.organic)output = output.replace(/{%NOT_ORGANIC%}/g ,'not-organic' );
  output = output.replace(/{%DESCRIPTION%}/g , product.description );
  return output;
     
     
     
}
const data =fs.readFileSync(`${__dirname}/data/data.json` , 'utf-8' );
const tempOverview =fs.readFileSync(`${__dirname}/template/template-overview.html` , 'utf-8' );

const tempCard =fs.readFileSync(`${__dirname}/template/template-card.html` , 'utf-8' );
const tempProduct =fs.readFileSync(`${__dirname}/template/template-product.html` , 'utf-8' );
const dataObj = JSON.parse(data);
  

const server = http.createServer((req, res) => {

  console.log(req.url);
  const {query , pathname} = url.parse(req.url , true);
// const pathName = req.url;
if ( pathname== "/"||pathname == "overview"){
  res.writeHead(200 , {'Content-type':'text/html'});
  const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
  const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
  // console.log(cardsHtml);
  console.log(req.url);
    res.end(output);

}else if(pathname == "/product"){
  console.log(query);
  const product = dataObj[query.id];
  const output = replaceTemplate(tempProduct , product);
res.end(output);
}else if(pathname==="/api"){
  res.writeHead(200, {'Content-type': 'application/json'});
  res.end(data);

}else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }

})

server.listen(8000, '127.0.0.1', () => {
   
    console.log('Listening to requests on port 8000');
  });