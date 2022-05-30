import react from 'react'
import ReactMarkdown from 'react-markdown'

export default function Story({ story }) {
  
  return (
    <react.Fragment>
        <h1>
            { story.title }
        </h1>
        <div className="story-meta mb-3">
            <p className="text-muted mb-0">Published by {story.authorId}</p>
            {/* <span className="text-muted">on {story.createdAt }</span> */}
        </div>
        {/* <Image src={storyImg} className="img-fluid rounded-start" /> */}
        <ReactMarkdown>{ story.content }</ReactMarkdown>
    </react.Fragment>
  )
}