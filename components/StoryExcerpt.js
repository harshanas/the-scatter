import Image from 'next/image'
import react from 'react'

import styles from "../styles/components/storyexcerpt.module.css";

import newsImageOne from "../public/images/news-image-1.png";

export default function StoryExcerpt() {
  return (
    <react.Fragment>
        <div className={`card ${styles['news-story-excerpt-card']} mt-2`}>
            <div className="row">
                <div className="col-md-4">
                    <Image src={newsImageOne} className="img-fluid rounded-start" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className={styles['card-title']}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                        <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid quae amet nisi fugit reiciendis deserunt, sit, optio incidunt esse repellat quaerat error dignissimos excepturi, quo pariatur nulla corporis? Numquam!
                        </p>
                        </div>
                </div>
            </div>
        </div>
    </react.Fragment>
  )
}
