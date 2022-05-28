import Image from 'next/image'
import react from 'react'

export default function Story({ story }) {
  return (
    <react.Fragment>
        <h1>
            { story.title }
        </h1>
        <h6 className="text-muted mb-3">Published by {story.authorId} on { story.timestamp } </h6>
        {/* <Image src={storyImg} className="img-fluid rounded-start" /> */}
        <p> { story.content }</p>
    </react.Fragment>
  )
}