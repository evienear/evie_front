import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import * as nearApi from 'near-api-js';
import { get, set, del } from 'idb-keyval';
import { copyToClipboard } from './util/util'
import './Multisig.scss';
import { toNear, nearTo, BOATLOAD_OF_GAS } from './util/near-util';

import Web3 from 'web3'
import { sign } from 'tweetnacl'


const contractInterface = {
    Transfer: ['receiver_id', 'amount'],
    AddKey: ['public_key'],
    DeleteKey: ['public_key'],
    // FunctionCall: ['contract_id', 'method_name', 'args', 'deposit', 'gas'],
    SetNumConfirmations: ['num_confirmations'],
}

/********************************
Contract methods
********************************/
const changeMethod = async (method, ...args) => {
    // if (method === 'add_request') {
    //     const useEth = window.confirm('Do you want to add this request using your web3 wallet?')
    //     if (useEth) {
    //         signEthRequest(...args)
    //         return
    //     }
    // }
    console.log('changeMethod', method, ...args)
    // make sure we don't add more confirmations than we have keys
    const request = args[0].request
    if (request) {
        const action = request.actions[0]
        console.log(action.type === 'SetNumConfirmations')
        if (action.type === 'SetNumConfirmations' && accessKeys.length < action.num_confirmations) {
            alert(`Cannot set num_confirmations > # of access keys (${accessKeys.length}) for multisig. Try adding another access key.`)
            return
        }
    }
    // check the current key we're going to use to sign the methods
    let secretKey
    if (key !== contractName) {
        secretKey = (await getKey(key)).secretKey
    }
    const contract = await window.getContract(secretKey)

    let res
    // batch add_request, confirm
    if (false && method === 'add_request') {
        const request_id = await viewMethod('get_request_nonce')
        const args1 = new TextEncoder().encode(JSON.stringify(...args))
        const args2 = new TextEncoder().encode(JSON.stringify({ request_id }))
        console.log('batch add_request & confirm', ...args, request_id)
        res = await contract.account.signAndSendTransaction(contractName, [
            nearApi.transactions.functionCall('add_request', args1, BOATLOAD_OF_GAS),
            nearApi.transactions.functionCall('confirm', args2, BOATLOAD_OF_GAS),
        ]).catch((e) => {
            console.log(e)
            if (e.message.indexOf('Already confirmed this request') > -1) {
                alert('You already used this key. Try confirming with another key.')
            }
        })
    } else {
        // normal contract method call e.g. confirm
        res = await contract[method](...args).catch((e) => {
            console.log(e)
            if (e.message.indexOf('Already confirmed this request') > -1) {
                alert('You already used this key. Try confirming with another key.')
            }
        })
    }
    console.log('changeMethod', res)
    // get the new requests
    getRequests()
    return res
}
const viewMethod = async (method, ...args) => {
    let secretKey
    if (key !== contractName) {
        secretKey = (await getKey(key)).secretKey
    }
    const contract = await window.getContract(secretKey)
    const res = await contract[method](...args).catch((e) => {
        console.log(e)
    })
    // console.log(res)
    return res
}