require('dotenv').config()
const Airtable = require('airtable-node');
const airtable= new Airtable({ apiKey:process.env.AIRTABLE_API_KEY})
    .base('appbPHLNo1J4c21uE')
    .table('survey')

exports.handler=async(event,context,cb)=>{
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
    
    return {
        headers:{
            'Access-Control-Allow-Origin':"*",
        },
        statusCode:200,
        body:'Our First Survey'
    }
}