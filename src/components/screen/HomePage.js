import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import { TextInput } from 'react-native-paper'

import { BookSchema } from '../../schemas/BookSchema'
import realm from "../../database/GetRealmApp"
import { getRealm } from '../../database/GetRealmApp'


export default function HomePage() {
    const [titre, setTitre] = React.useState('')
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');

    const getRealmApp = async () => {
        const realm = await getRealm();
        const book = realm.objects('Book');
        return book
    };

    useEffect(() => {
        getRealmApp().then(data => {
            console.log('book', data)
        })
    },[])

    // realm.write(() => {
    //     BookSchema = realm.create("Book", { author: author, category: category, title: titre });
    // });
    
    return (
        <View>
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

            <Button title="Envoyer" onPress={() =>     realm.write(() => {
                BookSchema = realm.create('Book',{ author: author, category: category, title: titre });
            })}/>
        </View>
    );
}