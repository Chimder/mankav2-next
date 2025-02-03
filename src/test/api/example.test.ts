import { getMangaId, MangaResponse } from '@/shared/api/mangadex/generated'
import { createDynamicZodSchema } from '@/shared/lib/zod'
import { describe, expect, expectTypeOf, it } from 'vitest'

describe('getMangaId API', () => {
  it('api test getMangaId', async () => {
    const mangaId = 'b0b721ff-c388-4486-aa0f-c2b0bb321512'

    const result = await getMangaId(mangaId, {
      'includes[]': ['manga', 'cover_art', 'author'],
    })

    type Res = typeof result
    const dynamicSchema = createDynamicZodSchema(result)

    const validationResult = dynamicSchema.safeParse(result)
    console.log('SH', dynamicSchema)
    expect(validationResult.success).toBe(true)

    if (validationResult.success) {
      expect(validationResult.data.data?.id).toBe(mangaId)
      expect(validationResult.data.data?.attributes?.title).toBeTruthy()
    }
    // expect(result).toHaveProperty('data')
    // expect(result).toHaveProperty('response')
    // expect(result).toHaveProperty('result')

    // expect(result.data).toHaveProperty('id')
    // expect(result.data?.id).toBe(mangaId)

    // expect(result.data?.attributes?.title).toBeTruthy()
  })

  it('Error', async () => {
    await expect(getMangaId('invalid-id')).rejects.toThrow()
  })
})
