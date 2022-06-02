import react, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import dayjs from 'dayjs';
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from 'dayjs/plugin/advancedFormat';

import MainLayout from '../../layouts/mainLayout'
import StoryExcerpt from '../../components/StoryExcerpt';

import { AccountContext }  from "../../lib/context";
import config from "../../scatter.config";


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
    const client = new ApolloClient({
      uri: config.SUBGRAPH_API,
      cache: new InMemoryCache(),
    });
    
    const tokensQuery = `query {
        stories{
          id,
          title,
          contentHash,
          postContent,
          isPublished,
          author,
          createdAtTimestamp
        }
    }`;

    client.query({query: gql(tokensQuery)})
          .then((queryResult) => {
            const stories = queryResult.data.stories;
            updateStories(stories)
          })
          .catch((err) => {
            console.log('Error fetching data: ', err)
          })
  }, []);
  
  async function loadStories(){
    return false;
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
                    {/* <div className="col-md-6 offset-md-3 col-12">
                      {
                        stories.length != storiesMeta.length && (
                          <button type="button" className="btn btn-outline-secondary" onClick={loadStories}>Load More..</button>  
                        )
                      }
                      
                    </div> */}
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