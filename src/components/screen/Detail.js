import React, {useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
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
    <View style={styles.container}>
      <Card>
      <Card.Content>
        <Title>{book.title}</Title>
        <Paragraph>{book.author}</Paragraph>
        <Paragraph>{book.category}</Paragraph>
      </Card.Content>
    </Card>
    <View style={styles.containerBtn}>
        <Button style={styles.btnModify} icon="pencil-plus" mode="contained" onPress={() => navigation.navigate('Modify',{
          id: itemId,
          title : book.title,
          category : book.category,
          author : book.author
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
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginTop: 50,
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