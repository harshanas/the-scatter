import react, { useContext } from 'react';
import dynamic from "next/dynamic";
import { useState, useEffect,} from 'react';
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import MainLayout from '../../../layouts/mainLayout';
import "easymde/dist/easymde.min.css";

import { AccountContext }  from "../../../lib/context";
import Scatter from "../../../artifacts/contracts/TheScatter.sol/TheScatter.json"
import { contractAddress } from '../../../config'

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const initialState = { title: '', content: '' }
const MySwal = withReactContent(Swal)

const client = create('https://ipfs.infura.io:5001/api/v0')

export default function NewStoryPage () {
  const { walletAddr, setWalletAddr } = useContext(AccountContext);
  const [story, setStory] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  const { title, content } = story;
  const { authorId } = router.query;

  useEffect(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 500)
    }, []);
    
  function onChange(e) {
      setStory(() => ({ ...story, [e.target.name]: e.target.value }))
  }

  async function saveStoryMetaToIpfs() {
    try {
      const added = await client.add(JSON.stringify(story))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function publishStory() {   
    if (!title || !content) return
    const hash = await saveStoryMetaToIpfs()
    const isStored = await store(hash);
    if (isStored){
      MySwal.fire({
        title: <p>Story Published Successfully</p>,
      });
      router.push(`/${authorId}/stories`)
    }
  }

  async function store(hash){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Scatter.abi, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.createStory(story.title, hash)
        await provider.waitForTransaction(val.hash)
        console.log('val: ', val)
  
        return true;

      } catch (err) {

        console.log('Error: ', err);
        MySwal.fire({
          icon: 'error',
          title: <p>Something went wrong</p>,
          text: err && err.message ? err.message : ""
        });
        return false;

      }
    }   
      
  }
  
  return (
      <react.Fragment>
      <div className='row mt-3'>
          <div className="col-md-6 offset-md-3 col-12 text-justify">
              <input name='title' onChange={onChange} value={story.title} className="form-control form-control-lg text-center mb-2" type="text" placeholder="Story Title"/>
              <SimpleMdeEditor
                  className='mb-2'
                  value={story.content}
                  onChange={value => setStory({ ...story, content: value })}
              />
              <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button" onClick={publishStory}>Publish Story</button>
              </div>
          </div>
          
      </div>
      
      </react.Fragment>
      
  );
}

NewStoryPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}