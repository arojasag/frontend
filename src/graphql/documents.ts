/**
 * This is the file in which we will define all GraphQL documents to send to the main API
 */

import { gql } from "@apollo/client";

/** Get Groups */
export const GET_GROUPS = gql `
  query fetchGroups {
    groups {
      id
      name
      description
      profilePic {
        data
        mimeType
      }
      isVerified
      isOpen
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($input: NewGroup!) {
    createGroup(input: $input) {
      id
      name
      description
      isVerified
      isOpen
      createdAt
      updatedAt
    }
  }
`;

/** Sign Up */
export const SIGN_UP = gql`
  mutation SignUp ($input: SignUp!){
    signUp(input: $input) {
        id
        email
        username
        isSuperUser
        authToken
    }
  }
`

export const LOGIN = gql`
  query Login ($input: Login!){
    login(input: $input) {
      email
      username
      authToken
    }
  }
`