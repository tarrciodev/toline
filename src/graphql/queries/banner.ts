import { gql } from "graphql-request";

export const GET_BANNER = gql`
    query GetBanner {
        banners {
            title
            avaialbleAt
            isLive
            url
            description
            cover {
                url
            }
        }
    }
`;
