export const filterConstants = {
  // content: ['safe', 'suggestive'],
  status: [
    { id: 'ongoing', name: 'ongoing' },
    { id: 'completed', name: 'completed' },
    { id: 'hiatus', name: 'hiatus' },
    { id: 'cancelled', name: 'cancelled' },
  ],

  sortBy: [
    {
      name: 'Best Match',
      type: 'relevance',
      order: 'desc',
    },
    {
      name: 'Latest Upload',
      type: 'latestUploadedChapter',
      order: 'desc',
    },
    {
      name: 'Oldest Upload',
      type: 'latestUploadedChapter',
      order: 'asc',
    },
    {
      name: 'Title Ascending',
      type: 'title',
      order: 'asc',
    },
    {
      name: 'Title Descending',
      type: 'title',
      order: 'desc',
    },
    {
      name: 'Highest Rating',
      type: 'rating',
      order: 'desc',
    },
    {
      name: 'Lowest Rating',
      type: 'rating',
      order: 'asc',
    },
    {
      name: 'Most Follows',
      type: 'followedCount',
      order: 'desc',
    },
    {
      name: 'Recently Added',
      type: 'createdAt',
      order: 'desc',
    },
    {
      name: 'Oldest Added',
      type: 'createdAt',
      order: 'asc',
    },
  ],
}

export const OffsetFilter = 34
export const OffsetFilterTitle = 96
