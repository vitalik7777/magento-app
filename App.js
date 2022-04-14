import {useState, useEffect, useMemo} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';


import {ApolloClient, InMemoryCache, ApolloProvider, useMutation} from '@apollo/client';

import AuthContext from "./context/authContext";
import {Customer} from "./components/customer";
import {Login} from "./components/login";


export default function App() {
    const [userToken, setUserToken] = useState(null);

    const client = new ApolloClient({
        uri: 'https://nrcwebwinkel.nl/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: userToken ? `Bearer ${userToken}` : ''
        }
    });

    const signIn = (data) => {
        if (data) {
            setUserToken(data.generateCustomerToken.token);
        }
    };

    const authContext = useMemo(() => {
        return {
            signIn,
        }
    }, [signIn]);

    useEffect(() => {
        if (userToken) {
            signIn();
        }
    }, [])

    return (
        <AuthContext.Provider value={authContext}>
            <ApolloProvider client={client}>
                <View style={styles.container}>
                    {userToken ? <Customer/> : <Login/>}
                </View>
            </ApolloProvider>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
