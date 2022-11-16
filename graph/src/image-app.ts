import {
  UploadImage as ImageUploadedEvent,
  UpdateImage as ImageUpdatedEvent,
} from "../generated/ImageApp/ImageApp";

import { Image } from "../generated/schema";

export function handleUploadImage(event: ImageUploadedEvent): void {
  let imageS = new Image(event.params.imageId.toString());
  imageS.image = event.params.image;
  imageS.description = event.params.description;
  imageS.published = event.params.published;
  imageS.tags = event.params.tags;
  imageS.photographer = event.params.photographer;
  imageS.createdAt = event.block.timestamp;
  imageS.updatedAt = event.block.timestamp;
  imageS.save();
}

export function handleUpdateImage(event: ImageUpdatedEvent): void {
  let imageS = new Image(event.params.imageId.toString());
  if (imageS) {
    imageS.image = event.params.image;
    imageS.description = event.params.description;
    imageS.published = event.params.published;
    imageS.tags = event.params.tags;
    imageS.photographer = event.params.photographer;
    imageS.updatedAt = event.block.timestamp;
    imageS.save();
  }
}
