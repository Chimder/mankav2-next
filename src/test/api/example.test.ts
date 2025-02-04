import fs from 'node:fs'
import path from 'node:path'
import { getMangaId } from '@/shared/api/mangadex/generated'
import jsonDiff from 'json-diff'
import { describe, expect, it } from 'vitest'

describe('getMangaId API', () => {
  const snapshotFile = 'get-manga-id.json'
  const snapshotPath = path.resolve(__dirname, '../json', snapshotFile)
  it('Compare json getMangaId', async () => {
    const mangaId = 'b0b721ff-c388-4486-aa0f-c2b0bb321512'
    const result = await getMangaId(mangaId, {
      'includes[]': ['manga', 'cover_art', 'author'],
    })

    const expectedJson = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))

    const diffResult = jsonDiff.diff(result, expectedJson)

    if (diffResult) {
      console.log(jsonDiff.diffString(result, expectedJson))
      expect.fail('Changed API')
      // expect(diffResult).toBeNull()
    }
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('response')
    expect(result).toHaveProperty('result')

    expect(result.data).toHaveProperty('id')
    expect(result.data?.id).toBe(mangaId)

    expect(result.data?.attributes?.title).toBeTruthy()
  })

  it('Error', async () => {
    await expect(getMangaId('invalid-id')).rejects.toThrow()
  })
})
