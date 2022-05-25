import react from "react";
import { useState, useRef, useEffect } from 'react'
import dynamic from "next/dynamic";

import Header from "../../../layouts/Header";

const SimpleMdeEditor = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);

const initialState = { title: '', content: '' }

export default function CreateStory() {
  const [post, setPost] = useState(initialState);

  return (
    <react.Fragment>
        <Header/>
        <div className="container">
          
          <div className="row mx-auto">
              <div className="col-md-12">
                  <span className="mx-auto">
                    <h4 className="text-center">Create Story</h4>
                    </span>
                  <hr/>
              </div>
          </div>

          <div className="row mb-3">
              <div className="col-md-8 offset-md-2">
                <input className="form-control form-control-lg text-center" type="text" placeholder="Story Title" aria-label=".form-control-lg example"/>
              </div>
          </div>

          <div className="row">
              <div className="col-md-8 offset-md-2">
                <SimpleMdeEditor 
                  value={post.content}
                  onChange={value => setPost({ ...post, content: value })}
                />
              </div>
          </div>

          <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="button">Publish Story</button>
                </div>
              </div>
              
          </div>
        
        </div>
        

    </react.Fragment>
  )
}
