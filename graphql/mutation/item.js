import {gql} from '@apollo/client';

export const ADD_NEW_ITEM = gql`
  mutation AddNewItem(
    $name: String!
    $category: String!
    $description: String!
    $tags: [String!]
    $images: [String!]!
  ) {
    addNewItem(
      item: {
        name: $name
        category: $category
        description: $description
        tags: $tags
        images: $images
      }
    ) {
      id
      name
    }
  }
`;
