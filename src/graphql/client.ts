import { GraphQLClient } from "graphql-request";
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN as string;
export const useQuery = new GraphQLClient(process.env.HYGRAPH_API as string, {
    headers: {
        Authorization: `Bearer ${HYGRAPH_TOKEN}`, // Envia o token
    },
});
