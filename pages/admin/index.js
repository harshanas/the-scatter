import react from "react";

import Header from "../../layouts/Header";
import StoryExcerpt from "../../components/StoryExcerpt";

export default function Home() {
  return (
    <react.Fragment>
        <Header/>

        <div className="container">
            
            <div className="row mt-2">
                <div className="col-md-6">
                    <div className="card" >
                        <div className="card-body">
                            <h4 className="card-title">Published Stories</h4>
                            <h3 className="card-text">23</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" >
                        <div className="card-body">
                            <h4 className="card-title">Drafted Stories</h4>
                            <h3 className="card-text">23</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-6">
                    <h3>Published Stories</h3>
                </div>
                <div className="col-md-6">
                    <h3>Drafted Stories</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <StoryExcerpt />
                </div>
                <div className="col-md-6">
                    <StoryExcerpt />
                </div>
            </div>
            
        </div>
        

    </react.Fragment>
  )
}
