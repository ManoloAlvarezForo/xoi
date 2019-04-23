import React from 'react';
import { Query } from 'react-apollo';

const graphQLSelectSuggestions = ({ query, getItemProps, item: Item }) => {
    return <Query query={GET_APPLICANTS_BY_FILTER}
        variables={{ query }}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return data.applicantsByFilter;
        }}
    </Query>
}


export default graphQLSelectSuggestions;