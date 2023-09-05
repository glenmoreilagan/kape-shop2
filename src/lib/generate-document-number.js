import { uuid, v4 } from 'uuid'

export const generateDocumentNumber = () => {
  return Buffer.from(v4()).toString('base64', 0, 12)
}
