import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import AuthContext from '../../context/authContext';
import gql from "graphql-tag";
import {ApolloClient, InMemoryCache, ApolloProvider, useMutation} from '@apollo/client';

const LOGIN = gql`
    mutation signIn($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export const Login = () => {
    const [signInHandler, {data, loading, error}] = useMutation(LOGIN);
    const [dataToken, setDataToken] = useState(null);
    const {signIn} = useContext(AuthContext)


    if (data && !dataToken) {
        setDataToken(data);
    }

    useEffect(() => {
        signIn(dataToken)
    }, [dataToken]);

    if (loading) {
        return <ActivityIndicator size="large"/>
    }

    return (
        <View>
            <TouchableOpacity onPress={() => signInHandler({
                variables: {
                    email: "v.tyshkevych@ism.nl",
                    password: 'h1a2n3z4!',
                },
            })}>
                <Text>login</Text>
            </TouchableOpacity>
        </View>
    )
}
