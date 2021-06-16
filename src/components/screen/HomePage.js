import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { TextInput, Avatar, Card, Button } from 'react-native-paper'
import 'react-native-get-random-values'
import { getRealm } from '../../database/GetRealmApp'
import { BSON } from 'realm'
import 'react-native-get-random-values'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { useIsFocused } from '@react-navigation/native';


export default function HomePage({ navigation }) {
    const [titre, setTitre] = React.useState('')
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [listBook, setListBook] = React.useState([]);

    useIsFocused()

    const getRealmApp = async () => {
        const realm = await getRealm();
        const book = realm.objects('Book');
        console.log(book)
        let addBook;
        realm.write(() => {
            addBook = realm.create("Book", {
                _id: BSON.ObjectID(),
                title: titre, 
                author: author, 
                category: category });
        })
        return book
    };

    const deleteData = async () => {
        const realm = await getRealm();
        realm.write(() => {
            realm.deleteAll();
          });
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

    return (
        <View style={styles.container}>
                        <View style={styles.containerForm}>
                <KeyboardAwareScrollView style={styles.container}>
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
                </KeyboardAwareScrollView>
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
                keyExtractor={(item, index) => 'd' + index.toString()}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },

    containerForm: {
        // marginTop: '50%',
    },

    containerBtn:{
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row'
    },

    btnAdd:{
        marginRight: 10,
    },

    btnRemove: {
        backgroundColor: 'red',
    }
  });