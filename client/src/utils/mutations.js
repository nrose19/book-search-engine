import { gql } from '@apollo/client';

export const USER_LOGIN = gql `
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOKS = gql `
    mutation saveBooks($input: savedBook!){
        saveBooks(input: $input){
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOKS = gql `
    mutation removeBook($bookId: ID!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            bookCount
            savedBooks{
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`