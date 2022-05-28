import react from 'react';
import { useRouter } from 'next/router'

import MainLayout from '../../../layouts/mainLayout'
import Story from '../../../components/Story';

export default function StoryByIdPage () {
  const router = useRouter()
  const { authorId } = router.query;

  const story = {
    id: "euhe385biv",
    authorId, 
    timestamp: "22nd May 2022",
    title: "Lorem ipsum sit dolar amet",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis mollitia, aperiam tempora soluta, laudantium dolorum hic odit nostrum, recusandae iure. Aliquid ipsam repudiandae fugit, molestias magni culpa officia eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut."
  };

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