import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

const articleApi = createApi({
    reducerPath: 'article',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', RAPID_API_KEY );
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com' );

            return headers;
        }
    }),
    endpoints(builder) {
        return {
            getSummary: builder.query({
                query: (article) => ({
                    url: '/summarize',
                    params: {
                        url: article.url,
                        length: 3
                    },
                    method: 'GET'
                })
            })
        }
    }
})


export const { useLazyGetSummaryQuery } = articleApi;

export {articleApi};