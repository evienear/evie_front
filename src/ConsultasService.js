import axios from 'axios'

export default{
 getMostSelledCollections(){
    return axios.create({
        baseURL:'https://evienode.juanenriqueenr4.repl.co/api/near/mainnet/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    }).get('getMostSelledCollections?5')
 },


 getCollectionsDetails(data){
    return axios.create({
        baseURL:'https://api-v2-mainnet.paras.id/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    }).get('collections?collection_id='+data)
 },

 getCollectionsFromCreator(limit, data){
    return axios.create({
        baseURL:'https://api-v2-mainnet.paras.id/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    }).get(`token?__limit=${limit}&collection_id=${data}`)
 },

 getMetadataPersonal(data){
    return axios.create({
        baseURL:'https://evienode.juanenriqueenr4.repl.co/api/near/testnet/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    }).get(`getMetadata?account=${data}`)
 },

 getMetadataPersonalFilter(data){
     axios.create({
        baseURL:'https://evienode.juanenriqueenr4.repl.co/api/near/testnet/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    }).get(`getMetadata?account=${data}`)
   
 },

  cartShoping: []
 }

 