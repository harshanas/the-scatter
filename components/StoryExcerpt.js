import react from 'react'
import Link from 'next/link';

import styles from "../assets/styles/components/storyexcerpt.module.css";

export default function StoryExcerpt({ story, authorId }) {  

    return (
        <react.Fragment>
            <div className={`card ${styles['news-story-excerpt-card']} mt-2`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-body">
                            <Link href={`/${authorId}/stories/${story.id}`}>
                                <a>
                                    <h5 className={styles['card-title']}>{ story.title }</h5>
                                </a>
                            </Link>
                            <p className="text-muted mb-0">Published by {authorId}</p>
                            <span className="text-muted">on {story.timestamp}</span>
                            <p className="card-text">
                                { story.content }
                            </p>
                            </div>
                    </div>
                </div>
            </div>
        </react.Fragment>
    )
}