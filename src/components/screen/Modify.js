import React from 'react'
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import { TextInput, Avatar, Card, IconButton, Button } from 'react-native-paper'
import { getRealm } from '../../database/GetRealmApp'

export default function Modify({route}) {
  const {id, title, category, author} = route.params

  const [titre, setTitre] = React.useState(title)
  const [auteur, setAuteur] = React.useState(author)
  const [categorie, setCategorie] = React.useState(category)

  const modifyBook = async () => {
    const realm = await getRealm();
    try{
      realm.write(() => {
        realm.create(
          "Book",
          { _id: id, author: auteur,  category: categorie, title: titre},
          "modified"
        );
      });
      Alert.alert('Livre modifié')
    }catch(error){
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Titre du livre"
        value={titre}
        onChangeText={titre => setTitre(titre)}
        style={{
          backgroundColor: '#F8D69A'
        }}
      />

      <TextInput
        label="Auteur"
        value={auteur}
        onChangeText={auteur => setAuteur(auteur)}
        style={{
          backgroundColor: '#F8D69A'
        }}
      />

      <TextInput
        label="Catégorie"
        value={categorie}
        onChangeText={categorie => setCategorie(categorie)}
        style={{
          backgroundColor: '#F8D69A'
        }}
      />

      <Button style={styles.btnModify} icon="pencil-plus" mode="contained" onPress={() => modifyBook()}>
        Modifier
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      height: '100%',
      backgroundColor: '#FEC551'
  },

  btnModify:{
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
  }
});