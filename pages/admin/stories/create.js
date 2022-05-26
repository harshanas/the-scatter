import react from "react";
import dynamic from "next/dynamic";

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

import { contractAddress } from '../../../config';

import Scatter from '../../../artifacts/contracts/Scatter.sol/Scatter.json'

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0')

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const initialState = { title: '', content: '' }

export default function CreateStory() {
  const [post, setPost] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  const { title, content } = post;

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, []);

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  async function createNewPost() {   
    console.log(title, content)
    if (!title || !content) return
    const hash = await savePostToIpfs()
    await savePost(hash)
    // router.push(`/`)
  }

  async function savePostToIpfs() {
    try {
      const added = await ipfsClient.add(JSON.stringify(post))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function savePost(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Scatter.abi, signer)
      try {
        const val = await contract.createStory(post.title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Error: ', err)
      }
    }    
  }

  return (
    <react.Fragment>
        <div className="container">
          
          <div className="row mx-auto">
              <div className="col-md-12">
                  <span className="mx-auto">
                    <h4 className="text-center">Create Story</h4>
                    </span>
                  <hr/>
              </div>
          </div>

          <div className="row mb-3">
              <div className="col-md-8 offset-md-2">
                <input name='title' onChange={onChange} value={post.title} className="form-control form-control-lg text-center" type="text" placeholder="Story Title"/>
              </div>
          </div>

          <div className="row">
              <div className="col-md-8 offset-md-2">
                <SimpleMdeEditor 
                  value={post.content}
                  onChange={value => setPost({ ...post, content: value })}
                />
              </div>
          </div>

          <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="button" onClick={createNewPost}>Publish Story</button>
                </div>
              </div>
              
          </div>
        
        </div>
        

    </react.Fragment>
  )
}
