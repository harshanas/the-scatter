import react from "react";

import Story from "../../components/Story";

export default function StoryById() {
  return (
    <react.Fragment>
      <div className='container'>
        
        <div className="row">
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
