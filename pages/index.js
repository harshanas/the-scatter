import react from "react";

import Header from "../layouts/Header";
import LeadStory from '../components/LeadStory';
import StoryExcerpt from "../components/StoryExcerpt";
import StoryExcerptMini from "../components/StoryExcerptMini";

import "../styles/components/leadstory.module.css"
export default function Home() {
  return (
    <react.Fragment>
      <Header/>
      <div className='container'>
        <LeadStory/>

        <div class="row">
            {/* begin::Stories Feed */}
            <div className="col-md-8 col-12">
              <StoryExcerpt />
              <StoryExcerpt />
            </div>
            {/* end::Stories Feed */}

            <div className="col-md-4 mt-2 top-voted-blocks">
              <span class="heading">Top Voted Blocks</span>

              <StoryExcerptMini/>
            </div>
        </div>
      </div>
    </react.Fragment>
  )
}
