import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { TextInput, Avatar, Card, Button } from 'react-native-paper'
import 'react-native-get-random-values'
import { getRealm } from '../../database/GetRealmApp'
import { BSON } from 'realm'
import 'react-native-get-random-values'
import { useIsFocused } from '@react-navigation/native';
import { back } from 'react-native/Libraries/Animated/Easing'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default function HomePage({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(100).then(() => setRefreshing(false));
    }, []);

    const [titre, setTitre] = React.useState('')
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [listBook, setListBook] = React.useState([]);


    const getRealmApp = async () => {
        const realm = await getRealm();
        let addBook;
        realm.write(() => {
            addBook = realm.create("Book", {
                _id: BSON.ObjectID(),
                title: titre, 
                author: author, 
                category: category });
        })
        onRefresh()
    };

    const deleteData = async () => {
        const realm = await getRealm();
        realm.write(() => {
            realm.deleteAll();
          });
        onRefresh()
    }

    useEffect(async() => {
        const realm = await getRealm();
        const book = realm.objects('Book');
        setListBook(book)
      },[]);

      const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                itemId : item._id
            })}>
                <Card.Title
                    title={item.title}
                    subtitle={item.author}
                    left={(props) => <Avatar.Icon {...props} icon="book" />}
                    style={{
                        backgroundColor:"#4F4A41",
                        margin: 10,
                        borderRadius: 15,
                    }}
                    titleStyle={{
                        color: '#FEC551',
                    }}
                    subtitleStyle={{
                        color: 'white',
                    }}
                  />
            </TouchableOpacity>
        </View>
      );

      useIsFocused();

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerForm}>
                    <TextInput
                        label="Titre du livre"
                        value={titre}
                        onChangeText={titre => setTitre(titre)}
                        selectionColor= 'black'
                        style={{
                            backgroundColor:'#F8D69A'
                        }}
                    />

                    <TextInput
                        label="Auteur"
                        value={author}
                        onChangeText={author => setAuthor(author)}
                        selectionColor= 'black'
                        style={{
                            backgroundColor:'#F8D69A'
                        }}
                    />

                    <TextInput
                        label="Catégorie"
                        value={category}
                        onChangeText={category => setCategory(category)}
                        selectionColor= 'black'
                        style={{
                            backgroundColor:'#F8D69A'
                        }}
                    />
                </View>
                <View style={styles.containerBtn}>
                    <Button style={styles.btnAdd} icon="plus-thick" mode="contained" onPress={() => getRealmApp()}>
                        Ajouter
                    </Button>
                    <Button style={styles.btnRemove} icon="trash-can" mode="contained" onPress={() => deleteData()}>
                        supprimer
                    </Button>
                </View>
                <FlatList
                    data={listBook}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: "#FEC551",
        height: '100%'
    },

    containerBtn:{
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: '',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },

    btnAdd:{
        marginRight: 10,
        backgroundColor: '#4F4A41'
    },

    btnRemove: {
        backgroundColor: 'red',
    },
  });