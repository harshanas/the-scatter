import react, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import MainLayout from '../../../layouts/mainLayout'
import Story from '../../../components/Story';

import { AccountContext }  from "../../../lib/context";
import config from "../../../scatter.config";

export default function StoryByIdPage () {
  const router = useRouter();
  const { walletAddr } = useContext(AccountContext);
  const [ story, setStory ]= useState(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: config.SUBGRAPH_API,
      cache: new InMemoryCache(),
    });
    
    const tokensQuery = `query($contentHash: String){
      postSearchByContentHash(text: $contentHash) {
        id,
        title,
        contentHash,
        postContent,
        isPublished,
        author,
        createdAtTimestamp
      }
    }`;

    client.query({
      query: gql(tokensQuery),
      variables: {
        contentHash: router.query.storyHash
      }
    })
    .then((queryResult) => {
      const story = queryResult.data.postSearchByContentHash;
      if (story.length > 0){
        setStory(story[0])
      }
      
    })
    .catch((err) => {
      console.log('Error fetching data: ', err)
    })

    
  });

  return (
    <react.Fragment>
      <div className='row mt-3'>
        <div className="col-md-6 offset-md-3 col-12 text-justify">
          {
            story && <Story story={story}/>
          }
          
        </div>
      </div>
      
    </react.Fragment>
    
  );
}

StoryByIdPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}