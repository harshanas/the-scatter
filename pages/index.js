import react from "react";
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

import LeadStoryExcerpt from '../components/LeadStoryExcerpt';
import StoryExcerpt from "../components/StoryExcerpt";
import StoryExcerptMini from "../components/StoryExcerptMini";

import Scatter from '../artifacts/contracts/Scatter.sol/Scatter.json';
import { contractAddress } from '../config'

export default function Home(props) {
  const { postLinks } = props;
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true)
    if (postLinks){
      for (const postLink of postLinks){
        fetch(`https://ipfs.io/ipfs/${postLink[2]}`)
        .then((res) => res.json())
        .then((post) => {
          setPosts(oldArray => [...oldArray, post])
        })
      }
      setLoading(false)
    }
    
  }, [])
  console.log(posts)
  
  return (
    <react.Fragment>
      <div className='container'>
        <LeadStoryExcerpt/>

        <div className="row">
            {/* begin::Stories Feed */}
            <div className="col-md-8 col-12">
              {
                posts.map((post, index) => {
                  return <StoryExcerpt post={post} key={index} />
                })
              }
            </div>
            {/* end::Stories Feed */}

            <div className="col-md-4 mt-2 top-voted-blocks">
              <span className="heading">Top Voted Blocks</span>

              <StoryExcerptMini/>
            </div>
        </div>
      </div>
    </react.Fragment>
  )
}

export async function getServerSideProps() {
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  }

  const contract = new ethers.Contract(contractAddress, Scatter.abi, provider)
  const data = await contract.fetchStories();
  return {
    props: {
      postLinks: JSON.parse(JSON.stringify(data))
    }
  }
}
