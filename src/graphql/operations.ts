import { readFileSync } from "fs";

import {
  GetChronologyItemsQuery,
  GetChronologyItemsQueryVariables,
  GetErasQuery,
  GetErasQueryVariables,
  GetLibraryContentQuery,
  GetLibraryContentQueryVariables,
  GetLibraryContentsSlugsQuery,
  GetLibraryContentsSlugsQueryVariables,
  GetLibraryItemQuery,
  GetLibraryItemQueryVariables,
  GetLibraryItemsPreviewQuery,
  GetLibraryItemsPreviewQueryVariables,
  GetLibraryItemsSlugsQuery,
  GetLibraryItemsSlugsQueryVariables,
} from "graphql/operations-types";

const graphQL = async (query: string, variables?: string) => {
  const res = await fetch(`${process.env.URL_GRAPHQL}`, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
  });
  return (await res.json()).data;
};

function getQueryFromOperations(queryName: string): string {
  const operations = readFileSync("./src/graphql/operation.graphql", "utf8");
  let startingIndex = -1;
  let endingIndex = -1;
  const lines = operations.split("\n");
  lines.map((line, index) => {
    if (startingIndex === -1) {
      if (line.startsWith(`query ${queryName}(`)) startingIndex = index;
      if (line.startsWith(`query ${queryName} {`)) startingIndex = index;
    } else if (endingIndex === -1) {
      if (line.startsWith("query")) endingIndex = index;
    }
  });
  return lines.slice(startingIndex, endingIndex).join("\n");
}

export async function getEras(
  variables: GetErasQueryVariables
): Promise<GetErasQuery> {
  const query = getQueryFromOperations("getEras");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getChronologyItems(
  variables: GetChronologyItemsQueryVariables
): Promise<GetChronologyItemsQuery> {
  const query = getQueryFromOperations("getChronologyItems");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItemsPreview(
  variables: GetLibraryItemsPreviewQueryVariables
): Promise<GetLibraryItemsPreviewQuery> {
  const query = getQueryFromOperations("getLibraryItemsPreview");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItemsSlugs(
  variables: GetLibraryItemsSlugsQueryVariables
): Promise<GetLibraryItemsSlugsQuery> {
  const query = getQueryFromOperations("getLibraryItemsSlugs");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItem(
  variables: GetLibraryItemQueryVariables
): Promise<GetLibraryItemQuery> {
  const query = getQueryFromOperations("getLibraryItem");
  return await graphQL(query, JSON.stringify(variables));
}