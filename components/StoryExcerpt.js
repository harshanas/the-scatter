import react from 'react'
import Link from 'next/link'

import styles from "../assets/styles/components/storyexcerpt.module.css";

export default function StoryExcerpt({ post }) {  
    
    return (
        <react.Fragment>
            <div className={`card ${styles['news-story-excerpt-card']} mt-2`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-body">
                            <Link href={`/${post.authorId}/stories/${post.id}`}>
                                <a>
                                    <h5 className={styles['card-title']}>{ post.title }</h5>
                                </a>
                            </Link>
                            <p class="text-muted">Published by {post.authorId} on {post.date}</p>
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