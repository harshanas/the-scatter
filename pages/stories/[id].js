import react from "react";

import Header from "../../layouts/Header";
import Story from "../../components/Story";

export default function StoryById() {
  return (
    <react.Fragment>
      <Header/>
      <div className='container'>
        
        <div class="row">
            {/* begin::Story Body */}
            <div className="col-md-6 offset-md-3 col-12">
              <Story/>
            </div>
            {/* end::Story Body */}

            <div className="col-md-4 mt-2 top-voted-blocks">
              
            </div>
        </div>
      </div>
    </react.Fragment>
  )
}
