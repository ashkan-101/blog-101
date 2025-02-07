import { Pagination } from "../types/Pagination.type";

export function paginateTool(pagination: Pagination) {
  const page = pagination.page 
  const take = pagination.take 
  const skip = (page - 1) * take

  return { take, skip };
}