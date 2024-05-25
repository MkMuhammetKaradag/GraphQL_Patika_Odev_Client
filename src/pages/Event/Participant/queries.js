import { gql } from "@apollo/client";

export const NEW_PARTİCİPANT_MUTATİON = gql`
  mutation createParticipant($data: CreateParticipantInput!) {
    createParticipant(data: $data) {
      _id
    }
  }
`;
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
    }
  }
`;
