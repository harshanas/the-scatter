import Image from 'next/image'
import react from 'react'

import styles from "../styles/components/story.module.css";

import storyImg from "../public/images/news-image-1.png";

export default function Story() {
  return (
    <react.Fragment>
        <h1 className={styles['story-title']}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </h1>
        <h6 className="text-muted">Posted on 22nd May 2022 at 17:45:00 </h6>
        <Image src={storyImg} className="img-fluid rounded-start" />
        <p className="mt-3"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut.</p>
        <p className=""> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque perferendis mollitia, aperiam tempora soluta, laudantium dolorum hic odit nostrum, recusandae iure. Aliquid ipsam repudiandae fugit, molestias magni culpa officia eaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, assumenda reprehenderit cupiditate quod distinctio natus modi temporibus deleniti debitis consequatur excepturi cumque, tempore placeat magnam doloribus totam exercitationem consequuntur aut.</p>
    </react.Fragment>
  )
}
