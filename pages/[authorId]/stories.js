import react from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import MainLayout from '../../layouts/mainLayout'
import StoryExcerpt from '../../components/StoryExcerpt';

export default function AuthorProfile () {
  const router = useRouter()
  const { authorId } = router.query
  
  const stories = [];
  // const stories = [
  //   {
  //     id: "euhe385biv",
  //     authorId, 
  //     timestamp: "22nd May 2022",
  //     title: "Lorem ipsum sit dolar amet",
  //     content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis mollitia, aperiam tempora soluta, laudantium dolorum hic odit nostrum, recusandae iure. Aliquid ipsam repudiandae fugit, molestias magni culpa officia eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut."
  //   },
  //   {
  //     id: "wgeuh238748",
  //     authorId, 
  //     timestamp: "22nd May 2022",
  //     title: "Lorem ipsum sit dolar amet",
  //     content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis mollitia, aperiam tempora soluta, laudantium dolorum hic odit nostrum, recusandae iure. Aliquid ipsam repudiandae fugit, molestias magni culpa officia eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut."
  //   },
  //   {
  //     id: "vheh738",
  //     authorId, 
  //     timestamp: "22nd May 2022",
  //     title: "Lorem ipsum sit dolar amet",
  //     content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis mollitia, aperiam tempora soluta, laudantium dolorum hic odit nostrum, recusandae iure. Aliquid ipsam repudiandae fugit, molestias magni culpa officia eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut."
  //   }
  // ];

 

  return (
    <react.Fragment>
      <div className='row mt-3'>
        <div className="col-md-6 offset-md-3 col-12 text-justify">

          { stories.length > 0 ?
            stories.map((story, index) => {
              return <StoryExcerpt story={story} key={index} />
            }) :
            (
              <div class="card text-center mt-5">
                <div class="card-body">
                  <h3 class="card-title mb-2">There are no stories <br/> :( </h3>
                  {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                  {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                  <Link href={`/${authorId}/stories/new`}>
                    
                    <button type="button" class="btn btn-secondary mt-2">Write your first story</button>

                  </Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
      
    </react.Fragment>
    
  );
}

AuthorProfile.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}