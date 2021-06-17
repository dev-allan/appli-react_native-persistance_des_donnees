import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { TextInput, Avatar, Card, Button } from 'react-native-paper'
import 'react-native-get-random-values'
import { getRealm } from '../../database/GetRealmApp'
import { BSON } from 'realm'
import 'react-native-get-random-values'
import { useIsFocused } from '@react-navigation/native';


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
                  />
            </TouchableOpacity>
        </View>
      );

      useIsFocused();

    return (
        <SafeAreaView>
            <View style={styles.containerForm}>
                <TextInput
                    label="Titre du livre"
                    value={titre}
                    onChangeText={titre => setTitre(titre)}
                />

                <TextInput
                    label="Auteur"
                    value={author}
                    onChangeText={author => setAuthor(author)}
                />

                <TextInput
                    label="Catégorie"
                    value={category}
                    onChangeText={category => setCategory(category)}
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
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    containerBtn:{
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row'
    },

    btnAdd:{
        marginRight: 10,
    },

    btnRemove: {
        backgroundColor: 'red',
    },
  });