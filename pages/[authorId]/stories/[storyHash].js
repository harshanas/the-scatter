import react from 'react';
import { useRouter } from 'next/router'

import MainLayout from '../../../layouts/mainLayout'
import Story from '../../../components/Story';

export default function StoryByIdPage (props) {
  const router = useRouter();
  const { story } = props;

  return (
    <react.Fragment>
      <div className='row mt-3'>
        <div className="col-md-6 offset-md-3 col-12 text-justify">
          <Story story={story}/>
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

export async function getServerSideProps(context) {
  const ipfsURI = 'https://ipfs.io/ipfs/'
  const { authorId, storyHash } = context.query;

  const ipfsUrl = `${ipfsURI}/${storyHash}/`
  const response = await fetch(ipfsUrl)
  let story = await response.json();
  story.authorId = authorId;

  return {
    props: {
      story
    }
  }
}