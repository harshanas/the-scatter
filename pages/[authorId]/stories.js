import react, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ethers } from 'ethers'
import dayjs from 'dayjs';
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from 'dayjs/plugin/advancedFormat';

import MainLayout from '../../layouts/mainLayout'
import StoryExcerpt from '../../components/StoryExcerpt';

import { AccountContext }  from "../../lib/context";
import { getRpcProvider } from "../../lib/common"
import { contractAddress } from '../../config';
import Scatter from "../../artifacts/contracts/TheScatter.sol/TheScatter.json"

const ipfsURI = 'https://ipfs.io/ipfs/'


dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear)

export default function StoryList (props) {
  const { walletAddr } = useContext(AccountContext);
  const [ stories, updateStories ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ]= useState(1);

  const router = useRouter()
  const { authorId } = router.query
  const { storiesMeta } = props;

  useEffect(() => {
    loadStories()
  }, []);
  
  async function loadStories(){
    if(stories.length > 0){
      setLoading(true);
      setPage(++page);
    }
    
    let ipfsUrl, response, story;
    const storiesFetched = [];
    const PER_PAGE_LIMIT = 5;
    let currentCount = 1; 
    let endIndex = page * PER_PAGE_LIMIT;
    let startIndex = endIndex - PER_PAGE_LIMIT;
    if (endIndex > storiesMeta.length){
      endIndex = storiesMeta.length;
    }
    const storiesMetaSliced = storiesMeta.slice(startIndex, endIndex);
    for (let storyMeta of storiesMetaSliced){
      if (currentCount > PER_PAGE_LIMIT){
        break
      }
      ipfsUrl = `${ipfsURI}/${storyMeta[2]}`
      response = await fetch(ipfsUrl)
      story = await response.json();
      story.id = storyMeta[0].hex;
      story.hash = storyMeta[2];
      story.createdAt = dayjs.unix(parseInt(storyMeta[4].hex, 16)).format("wo MMMM YYYY hh:mm A")
      storiesFetched.push(story);
      currentCount++;
    }
    updateStories([...stories,...storiesFetched]);
    setLoading(false);
  }
  
  return (
    <react.Fragment>
      <div className='row mt-3'>
        <div className="col-md-6 offset-md-3 col-12 text-justify">

          { stories.length > 0 ? 
            stories.map((story, index) => {
              return <StoryExcerpt story={story} authorId={authorId} key={index} />
            })
            :(
              <div className="card text-center mt-5">
                <div className="card-body">
                  <h3 className="card-title mb-2">There are no stories <br/> :( </h3>
                  <Link href={`/${walletAddr}/stories/new`}>
                    
                    <button type="button" className="btn btn-secondary mt-2">Write your first story</button>

                  </Link>
                </div>
              </div>
            )
          }
        </div>
        {
            stories.length > 0 && (
              <div className="row">
                <div className="col-md-6 offset-md-3 col-12">
                  <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                      {
                        stories.length != storiesMeta.length && (
                          <button type="button" className="btn btn-outline-secondary" onClick={loadStories}>Load More..</button>  
                        )
                      }
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            )
          }
      </div>
      
    </react.Fragment>
    
  );
}

StoryList.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const { authorId } = context.query;
  let provider = getRpcProvider();

  const contract = new ethers.Contract(contractAddress, Scatter.abi, provider)
  let storiesMeta = await contract.fetchStories(authorId);
  let storiesMetaReversed = [...storiesMeta].reverse();
  
  return {
    props: {
      storiesMeta :JSON.parse(JSON.stringify(storiesMetaReversed))
    }
  }
}