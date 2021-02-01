require('dotenv').config()
const Airtable = require('airtable-node');
const airtable= new Airtable({ apiKey:process.env.AIRTABLE_API_KEY})
    .base('appbPHLNo1J4c21uE')
    .table('products')


exports.handler=async(event,context,cb)=>{
   const {id}=event.queryStringParameters
   if(id){
    try{
        const product=await airtable.retrieve(id)
        if (product.error){
            return {
                headers:{
                    'Access-Control-Allow-Origin':"*",
                },
                statusCode:404,
                body: `no product of id ${id}`
            } }
            return {
                headers:{
                    'Access-Control-Allow-Origin':"*",
                },
                statusCode:200,
                body:JSON.stringify(product)
            }  

    }catch(error){
        return {
            headers:{
                'Access-Control-Allow-Origin':"*",
            },
            statusCode:500,
            body:`Server Error`
        } 
    }
   
   }else {
    return {
        headers:{
            'Access-Control-Allow-Origin':"*",
        },
        statusCode:400,
        body:'Please provide product id'
    }  

   }

}