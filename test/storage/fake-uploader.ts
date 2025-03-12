import { Uploader, UploadParams } from '@/domain/application/storage/uploader'
import { randomUUID } from 'node:crypto'

interface Upload {
  photoName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ photoName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID()

    this.uploads.push({
      photoName,
      url,
    })

    return { url }
  }
}
