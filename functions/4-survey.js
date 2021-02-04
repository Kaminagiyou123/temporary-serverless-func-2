require('dotenv').config()
const Airtable = require('airtable-node');
const airtable= new Airtable({ apiKey:process.env.AIRTABLE_API_KEY})
    .base('appbPHLNo1J4c21uE')
    .table('survey')

exports.handler=async(event,context,cb)=>{
    const method=event.httpMethod;
    if (method==='GET'){
    try{
    const {records}=await airtable.list()
    const survey=records.map((item)=>{
        const {id}=item;
        const {room,votes}=item.fields
        return {id,room,votes}
    })

    return {
        headers:{
            'Access-Control-Allow-Origin':"*",
        },
        statusCode:200,
        body:JSON.stringify(survey)
    }

    }
    catch(error){
        return {
            headers:{
                'Access-Control-Allow-Origin':"*",
            },
            statusCode:500,
            body:'Server Error'
        }
        

    }    
} if (method ==='PUT'){
    //default response
    try{
    const {id,votes}=JSON.parse(event.body);
        if (!id|| !votes){
            return {
                statusCode:400,
                boday:'please provid id and votes'
            }   
            
        }
        const fields={votes:Number(votes)+1}
        const item= await airtable.update(id,{fields})
        if(item.error){
            return{
                statusCode:400,
                body: JSON.stringify(item)
            }
} else {
    return{
        statusCode:200,
        body: JSON.stringify(item)
    }
}
    } catch(error){
        return{
            statusCode:400,
            body: JSON.stringify(item)
        }
    }
}
return {
    statusCode:405,
    body:"Only Get and Put method allowed"
}}