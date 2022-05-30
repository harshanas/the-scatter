import react, { useContext } from 'react'
import Link from 'next/link';

import { AccountContext }  from "../lib/context";
import styles from "../assets/styles/components/storyexcerpt.module.css";

export default function StoryExcerpt({ story, authorId }) {  
    const { walletAddr } = useContext(AccountContext);
    
    return (
        <react.Fragment>
            <div className={`card ${styles['news-story-excerpt-card']} mt-2`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-body">
                            <Link href={`/${authorId}/stories/${story.hash}`}>
                                <a className='nav-link'>
                                    <h5 className={styles['card-title']}>{ story.title }</h5>
                                </a>
                            </Link>
                            <div className={`${styles['story-meta']} mb-3`}>
                                <p className="text-muted mb-0">Published by {authorId}</p>
                                <span className="text-muted">on {story.createdAt }</span>
                            </div>
                            <p className="card-text">
                                { story.content.slice(0, 100) }...
                            </p>
                            {
                                walletAddr && authorId.toLowerCase() == walletAddr.toLowerCase() && (
                                    <Link href={`/${authorId}/stories/${story.hash}/${story.id}/edit`}>
                                        <button type="button" className="btn btn-outline-secondary btn-sm">Edit Story</button>
                                    </Link>
                                ) 
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </react.Fragment>
    )
}