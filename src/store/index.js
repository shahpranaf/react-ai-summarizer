import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { articleApi } from "./apis/articleApi";

const store = configureStore({
    reducer: {
            [articleApi.reducerPath]: articleApi.reducer 
        },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(articleApi.middleware)
    }
})

export * from './apis/articleApi';

export {store}
export {useLazyGetSummaryQuery} from './apis/articleApi'