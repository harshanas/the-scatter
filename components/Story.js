import react from 'react'
import ReactMarkdown from 'react-markdown'

export default function Story({ story }) {
  console.log(story)
  return (
    <react.Fragment>
        <h1>
            { story.title }
        </h1>
        <h6 className="text-muted mb-3">Published by {story.authorId} on { story.timestamp } </h6>
        {/* <Image src={storyImg} className="img-fluid rounded-start" /> */}
        <ReactMarkdown>{ story.content }</ReactMarkdown>
    </react.Fragment>
  )
}