import { z } from 'zod'

export const createDynamicZodSchema = (data: unknown): z.ZodType<any> => {
  if (typeof data === 'string') {
    return z.string()
  }
  if (typeof data === 'number') {
    return z.number()
  }
  if (typeof data === 'boolean') {
    return z.boolean()
  }
  if (Array.isArray(data)) {
    return z.array(createDynamicZodSchema(data[0]))
  }
  if (typeof data === 'object' && data !== null) {
    const schema = {} as Record<string, z.ZodType<any>>
    for (const key in data) {
      schema[key] = createDynamicZodSchema(data[key])
    }
    return z.object(schema)
  }
  return z.any()
}
