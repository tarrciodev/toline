import { gql } from "graphql-request";
export const GET_ALL_POSTS = gql`
    query getPosts($first: Int, $skip: Int) {
        postsConnection(first: $first, skip: $skip) {
            aggregate {
                count
            }
            edges {
                node {
                    title
                    slug
                    createdAt
                    content {
                        html
                    }
                    excerpt
                    cover {
                        url
                    }
                }
            }
            pageInfo {
                pageSize
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;

export const GET_POST_BY_SLUG = gql`
    query postBySlug($slug: String!) {
        post(where: { slug: $slug }) {
            title
            slug
            createdAt
            content {
                json
            }
            excerpt
            cover {
                url
            }
        }
    }
`;
