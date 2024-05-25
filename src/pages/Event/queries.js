import { gql } from "@apollo/client";
export const GET_EVENT = gql`
  query getEvent($id: ID) {
    event(id: $id) {
      _id
      title
      desc
      date
      from
      to
      participants {
        username
      }
      location {
        name
      }
      user {
        username
      }
    }
  }
`;

export const EVENTS_PARTICIPANT_SUBSCRIPTION = gql`
  subscription listenParticipant($id: ID) {
    createParticipant(event: $id) {
      username
    }
  }
`;
