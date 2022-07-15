import axios from 'axios'

export default() => {
return axios.create({
        baseURL:'https://evienode.juanenriqueenr4.repl.co/api/near/mainnet/',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    })
}