import React from 'react'
import { View, Button } from 'react-native'
import { TextInput } from 'react-native-paper'

import { BookSchema } from '../../schemas/BookSchema'
import Realm from "realm"


export default function HomePage() {
    const [titre, setTitre] = React.useState('')
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');

    const addBook = () => {realm.write(() => {
    // Assign a newly-created instance to the variable.
        BookSchema = realm.create("Book", { author: author, category: category, title: titre });
    })};
    
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

            <Button title="Envoyer" onPress={() => addBook()}/>
        </View>
    );
}