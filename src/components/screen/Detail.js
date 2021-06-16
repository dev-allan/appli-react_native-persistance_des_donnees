import React, {useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { getRealm } from '../../database/GetRealmApp'

export default function Detail({route, navigation}) {
  const { itemId } = route.params

  const [book, setBook] = React.useState([])

  const deleteBook = async () => {
    const realm = await getRealm();
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey("Book", itemId));
    });
  }

  useEffect(async() => {
    const id = itemId
    const realm = await getRealm();
    const book = realm.objectForPrimaryKey("Book", id); 
    setBook(book)
  },[]);

  return (
    <Card>
    <Card.Content>
      <Title>{book.title}</Title>
      <Paragraph>{book.author}</Paragraph>
      <Paragraph>{book.category}</Paragraph>
    </Card.Content>
    <Button title="Modifier" onPress={() => navigation.navigate('Modify',{
      id: itemId,
      title : book.title,
      category : book.category,
      author : book.author
    })}/>
    <Button title="Supprimer" onPress={() => {
      deleteBook(),
      forceUpdate(),
      navigation.navigate('HomePage')
    }}/>
  </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
});