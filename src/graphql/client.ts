import { GraphQLClient } from "graphql-request";
export const useQuery = new GraphQLClient(process.env.HYGRAPH_API as string);
