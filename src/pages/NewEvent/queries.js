import { gql } from "@apollo/client";
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
    }
  }
`;

export const GET_LOCATİONS = gql`
  query getLocations {
    locations {
      _id
      name
      desc
    }
  }
`;

export const NEW_EVENT_MUTATİON = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      _id
      title
    }
  }
`;
