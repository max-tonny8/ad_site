import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { UpdateImage, UploadImage } from "../generated/ImageApp/ImageApp"

export function createUpdateImageEvent(
  imageId: BigInt,
  image: string,
  description: string,
  published: string,
  tags: string,
  photographer: Address
): UpdateImage {
  let updateImageEvent = changetype<UpdateImage>(newMockEvent())

  updateImageEvent.parameters = new Array()

  updateImageEvent.parameters.push(
    new ethereum.EventParam(
      "imageId",
      ethereum.Value.fromUnsignedBigInt(imageId)
    )
  )
  updateImageEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  updateImageEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  updateImageEvent.parameters.push(
    new ethereum.EventParam("published", ethereum.Value.fromString(published))
  )
  updateImageEvent.parameters.push(
    new ethereum.EventParam("tags", ethereum.Value.fromString(tags))
  )
  updateImageEvent.parameters.push(
    new ethereum.EventParam(
      "photographer",
      ethereum.Value.fromAddress(photographer)
    )
  )

  return updateImageEvent
}

export function createUploadImageEvent(
  imageId: BigInt,
  image: string,
  description: string,
  published: string,
  tags: string,
  photographer: Address
): UploadImage {
  let uploadImageEvent = changetype<UploadImage>(newMockEvent())

  uploadImageEvent.parameters = new Array()

  uploadImageEvent.parameters.push(
    new ethereum.EventParam(
      "imageId",
      ethereum.Value.fromUnsignedBigInt(imageId)
    )
  )
  uploadImageEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  uploadImageEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  uploadImageEvent.parameters.push(
    new ethereum.EventParam("published", ethereum.Value.fromString(published))
  )
  uploadImageEvent.parameters.push(
    new ethereum.EventParam("tags", ethereum.Value.fromString(tags))
  )
  uploadImageEvent.parameters.push(
    new ethereum.EventParam(
      "photographer",
      ethereum.Value.fromAddress(photographer)
    )
  )

  return uploadImageEvent
}
