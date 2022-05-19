import Image from 'next/image'
import react from 'react'

import styles from "../styles/components/leadstory.module.css";

import leadStoryImg from "../public/images/news-image-2.png";

export default function LeadStory() {
  return (
    <react.Fragment>
        <div className="row my-1">
            <div className="col-md-12">
                <div className={`card bg-dark text-white ${styles['lead-story-card']}`} >
                    <Image src={leadStoryImg} className={styles['lead-story-card-image']} alt="lead-story" />
                    <div className={`card-img-overlay text-center ${styles['lead-story-img-overlay']}`}>
                      <h5 className={styles['card-title']}>Lorem ipsum dolor sit amet</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid quae amet nisi fugit reiciendis deserunt, sit, optio incidunt esse repellat quaerat error dignissimos excepturi, quo pariatur nulla corporis? Numquam!</p>
                      <p className="card-text">Last updated 3 mins ago</p>
                    </div>
                </div>
            </div>
        </div>
    </react.Fragment>
  )
}
