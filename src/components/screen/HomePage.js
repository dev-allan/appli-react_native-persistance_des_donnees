import React from 'react'
import { TextInput } from 'react-native-paper';

export default function HomePage() {
    const [text, setText] = React.useState('');
  return (
    <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
}