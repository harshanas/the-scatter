import { ipfs, json } from '@graphprotocol/graph-ts'
import {
  PostCreated as PostCreatedEvent,
  PostUpdated as PostUpdatedEvent
} from "../generated/TheScatter/TheScatter"
import { Story } from "../generated/schema"

export function handlePostCreated(event: PostCreatedEvent): void {
  let story = new Story(event.params.id.toString());
  story.title = event.params.title;
  story.contentHash = event.params.hash;
  story.isPublished = true;
  story.author = event.params.author;
  let data = ipfs.cat(event.params.hash);
  if (data) {
    let value = json.fromBytes(data).toObject()
    if (value) {
      const content = value.get('content')
      if (content) {
        story.postContent = content.toString()
      }
    }
  }
  story.createdAtTimestamp = event.block.timestamp;
  story.save()
}

export function handlePostUpdated(event: PostUpdatedEvent): void {
  let story = Story.load(event.params.id.toString());
  if (story) {
    story.title = event.params.title;
    story.contentHash = event.params.hash;
    story.isPublished = event.params.isPublished;
    let data = ipfs.cat(event.params.hash);
    if (data) {
      let value = json.fromBytes(data).toObject()
      if (value) {
        const content = value.get('content')
        if (content) {
          story.postContent = content.toString()
        }
      }
    }
    story.updatedAtTimestamp = event.block.timestamp;
    story.save()
  }
}
