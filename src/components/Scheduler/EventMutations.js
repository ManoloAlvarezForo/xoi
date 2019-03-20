import gql from 'graphql-tag'

/**
 * GraphQL Mutation to save a New Calendar Event to the Database using an Input Event Object.
 */
export const ADD_EVENT = gql`
mutation AddEvent($event: InputEvent) {
	addEvent(event: $event){
    id
    title
    date
    timeFrom
    timeTo
    description
    }
}
`











