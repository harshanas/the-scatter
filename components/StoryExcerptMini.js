import Image from 'next/image'
import react from 'react'

import styles from "../styles/components/storyexcerptmini.module.css";

import newsImageTwo from "../public/images/news-image-2.png";

export default function StoryExcerptMini() {
  return (
    <react.Fragment>
        <div className={`card ${styles['top-voted-story-excerpt-card']} mt-2`}>
            <div className="row">
                <div className="col-md-3">
                    <Image src={newsImageTwo} className="img-fluid rounded-start" />
                </div>
                <div className="col-md-9">
                    <div className={`card-body ${styles['top-voted-story-excerpt-card-body']}`}>
                        <h5 className="card-title">Lorem ipsum dolor sit amet consectetur adipisicing elit</h5>
                        <p className="card-text text-muted">
                            Posted on 28th May 2020
                        </p>
                        </div>
                </div>
            </div>
        </div>
    </react.Fragment>
  )
}
