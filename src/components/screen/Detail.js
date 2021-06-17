import React, {useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { getRealm } from '../../database/GetRealmApp'
import { useIsFocused } from '@react-navigation/native'

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
    const realm = await getRealm();
    const book = realm.objectForPrimaryKey("Book", itemId); 
    setBook(book)
  },[]);

  useIsFocused();

  return (
    <View style={styles.container}>
      <Card           
        style={{
            backgroundColor:"#4F4A41",
            borderRadius: 15,
            margin: 10,
          }}>
        <Card.Content>
          <Title style={{color: '#FEC551', fontSize: 30, textAlign: 'center'}}>{book.title}</Title>
          <Paragraph style={{color: 'white', textAlign: 'center'}}>{book.author}</Paragraph>
          <Paragraph style={{color: 'white', textAlign: 'center'}}>{book.category}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.containerBtn}>
        <Button style={styles.btnModify} icon="pencil-plus" mode="contained" onPress={() => navigation.navigate('Modify', {
          id: itemId,
          title: book.title,
          category: book.category,
          author: book.author
        })}>
          Modifier
        </Button>

        <Button style={styles.btnRemove} icon="trash-can" mode="contained" onPress={() => {
          deleteBook(),
            navigation.navigate('HomePage')
        }}>
          Supprimer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEC551',
    height: '100%'
  },

  containerBtn:{
    marginTop: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row'
  },

  btnModify:{
    marginRight: 10,
  },

  btnRemove:{
    backgroundColor: 'red',
  }
});