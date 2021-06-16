import React, { useEffect } from 'react'
import { View, Button, StyleSheet, FlatList, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

import { BookSchema } from '../../schemas/BookSchema'
import realm from "../../database/GetRealmApp"
import 'react-native-get-random-values'
import { getRealm } from '../../database/GetRealmApp'
import { BSON } from 'realm'
import 'react-native-get-random-values'

// const Item = ({ title, author, category }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//       <Text>{author}</Text>
//       <Text>{category}</Text>
//     </View>
//   );

export default function HomePage() {
    const [titre, setTitre] = React.useState('')
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [listBook, setListBook] = React.useState([]);

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
            <Text>Titre : </Text>
            <Item title={item.title} />
            <Text>Auteur : </Text>
            <Item author={item.author}/>
            <Text>Categorie : </Text>
            <Item category={item.category}/>
        </View>
      );

      const Item = ({ title, author, category }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text>{author}</Text>
          <Text>{category}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
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

            <Button title="Ajouter" onPress={() => getRealmApp()}/>
            <Button title="Supprimer tout" onPress={() => deleteData()}/>

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
    //   marginTop: 30,
    //   marginBottom: 'auto',
    },
  });