import {useContext} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import AuthContext from '../../context/authContext';
import gql from "graphql-tag";
import {ApolloClient, InMemoryCache, ApolloProvider, useMutation, useQuery} from '@apollo/client';

const CUSTOMER = gql`
    query {customer {
        firstname
        lastname
        suffix
        email
    }}`;

export const Customer = () => {
    const {loading, error, data} = useQuery(CUSTOMER);

    if (loading) {
        return <ActivityIndicator size="large"/>
    }
    return (
        <View>
            <Text>{data.customer.email}</Text>
            <Text>{data.customer.firstname}</Text>
            <Text>{data.customer.lastname}</Text>
        </View>
    );
}
