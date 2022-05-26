import Image from 'next/image'
import react from 'react'
import Link from 'next/link'

import styles from "../styles/components/storyexcerpt.module.css";

import newsImageOne from "../public/images/news-image-1.png";

export default function StoryExcerpt({ post, content }) {  
    
    return (
        <react.Fragment>
            <div className={`card ${styles['news-story-excerpt-card']} mt-2`}>
                <div className="row">
                    <div className="col-md-4">
                        <Image src={newsImageOne} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <Link href={`/stories/`+post.title}>
                                <a>
                                    <h5 className={styles['card-title']}>{ post.title }</h5>
                                </a>
                            </Link>
                            <p className="card-text">
                                { post.content }
                            </p>
                            </div>
                    </div>
                </div>
            </div>
        </react.Fragment>
    )
}

