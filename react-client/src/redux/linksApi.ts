import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LinkRecordType } from '@/shared/LinkRecordType'
import { API_URL } from '@/shared/urls'

export const linksApi = createApi({
  reducerPath: 'linksApi',
  tagTypes: ['Links'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getLinks: builder.query<LinkRecordType[], void>({
      query: () => 'links',
      transformResponse: (response: { data: LinkRecordType[] }) =>
        response.data,
      providesTags: result =>
        result
          ? [
              ...result.map(({ uid }) => ({ type: 'Links', uid } as const)),
              { type: 'Links', id: 'LIST' }
            ]
          : [{ type: 'Links', id: 'LIST ' }]
    }),
    addLink: builder.mutation<LinkRecordType, Partial<LinkRecordType>>({
      query(body) {
        return {
          url: 'links',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Links', id: 'LIST' }]
    }),
    updateLink: builder.mutation<LinkRecordType, Partial<LinkRecordType>>({
      query(data) {
        const { uid, ...body } = data
        return {
          url: `links/${uid}`,
          method: 'PUT',
          body
        }
      },
      invalidatesTags: (result, error, { uid }) => [{ type: 'Links', uid }]
    }),
    removeLink: builder.mutation<void, string>({
      query: uid => ({
        url: `links/${uid}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, uid) => [{ type: 'Links', uid }]
    })
  })
})

export const {
  useGetLinksQuery,
  useAddLinkMutation,
  useUpdateLinkMutation,
  useRemoveLinkMutation
} = linksApi
