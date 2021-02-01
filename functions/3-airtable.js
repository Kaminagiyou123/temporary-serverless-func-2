require('dotenv').config()
const Airtable = require('airtable-node');
const airtable= new Airtable({ apiKey:process.env.AIRTABLE_API_KEY})
    .base('appbPHLNo1J4c21uE')
    .table('products')


exports.handler=async(event,context,cb)=>{
    try{ 
        const {records}= await airtable.list();
       const products=records.map((product)=>{
           const {id}=product
           const{name,image,price}=product.fields
           const url=image[0].url
           return {id,name,price,url}
       })

       return {
        headers:{
            'Access-Control-Allow-Origin':"*",
        },
        statusCode:200,
        body:JSON.stringify(products)
    }

    } catch(error){

        return {
            headers:{
                'Access-Control-Allow-Origin':"*",
            },
            statusCode:500,
            body:`<h4>Server</h4>`
        }
    

    }
    
   
}
