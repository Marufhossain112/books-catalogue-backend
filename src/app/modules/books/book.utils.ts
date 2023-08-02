import { Book } from './books.model'

const findLastBookId = async () => {
  const lastBook = await Book.findOne().sort({ createdAt: -1 }).lean()
  // eslint-disable-next-line no-undefined
  console.log('lastBook', lastBook)
  return lastBook?.id
}
export const generateBookId = async (): Promise<string> => {
  const currentId = (await findLastBookId()) || '0'.toString().padStart(5, '0')
  console.log('currentId', currentId)
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  console.log(incrementedId, 'increamenteeId')
  return incrementedId
}
