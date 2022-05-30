import react from 'react';
import dynamic from "next/dynamic";
import { useState, useEffect,} from 'react';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'

import { getRpcProvider } from "../../../../../lib/common";
import { contractAddress } from "../../../../../config";
import Scatter from "../../../../../artifacts/contracts/TheScatter.sol/TheScatter.json";

import MainLayout from '../../../../../layouts/mainLayout';
import "easymde/dist/easymde.min.css";

const ipfsURI = 'https://ipfs.io/ipfs/'
const client = create('https://ipfs.infura.io:5001/api/v0')

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const initialState = { title: '', content: '' }
const MySwal = withReactContent(Swal)

export default function EditStoryPage () {
  const [story, setStory] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  const { title, content } = story;
  const { authorId, storyHash, storyId } = router.query;

  useEffect(() => {
    fetchStory()
  }, [authorId, storyHash, storyId]);

  async function fetchStory() {
    if (!authorId && !storyHash && !storyId) return;

    const ipfsUrl = `${ipfsURI}/${storyHash}`
    const response = await fetch(ipfsUrl)
    const data = await response.json()
    
    data.id = parseInt(storyId, 16);
    setStory(data);
  }

  async function saveStoryMetaToIpfs() {
    const added = await client.add(JSON.stringify(story))
    return added.path
  }

  async function update(hash) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Scatter.abi, signer)
      await contract.updateStory(story.id, story.title, hash, true)
      return true

    } catch (err) {
      console.log("Error: " +err);
      MySwal.fire({
        icon: 'error',
        title: <p>Something went wrong</p>,
        text: err && err.message ? err.message : ""
      });
      return false;
    }
  }

  
  function onChange(e) {
      setStory(() => ({ ...story, [e.target.name]: e.target.value }))
  }

  async function updateStory(){
    if (!story.title || !story.content) return

    const hash = await saveStoryMetaToIpfs()
    const isUpdated = await update(hash);

    if (isUpdated){
      MySwal.fire({
        title: <p>Story Updated Successfully</p>,
      });
      router.push(`/${authorId}/stories`)

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
                <button className="btn btn-secondary" type="button" onClick={updateStory}>Update Story</button>
              </div>
          </div>
          
      </div>
      
      </react.Fragment>
      
  );
}

EditStoryPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}