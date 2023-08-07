import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
type IOptionResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
const calculatePagination = (option: IOptions): IOptionResult => {
  const page = Number(option.page || 1)
  const limit = Number(option.limit)
  const sortBy = option.sortBy || 'createdAt'
  const sortOrder = option.sortOrder || 'desc'
  const skip = (page - 1) * limit
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}
export const paginationHelpers = {
  calculatePagination,
}
