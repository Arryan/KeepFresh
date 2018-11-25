import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Constants } from 'expo';

export default class FoodItem extends React.Component {
  render() {
    const {
      imgSrc,
      url,
      name,
      pantryExpiration,
      refrigarator,
    } = this.props.item;
    return (
      <View style={styles.container}>
        <Card style={styles.container}>
          <View style={styles.container}>
            <View style={{ paddingLeft: 50 }}>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>{(pantryExpiration && pantryExpiration != '--') ? "Pantry:" + pantryExpiration : ' '}</Text>
              <Text>{(refrigarator && refrigarator != '--') ? "Refrig:" + refrigarator : ' '}</Text>
              <Text>{((!pantryExpiration || pantryExpiration == '--') && (!refrigarator || refrigarator == '--')) ? "Expiration not found" : ' '}</Text>
            </View>
            <Image
              source={{ uri: url }}
              style={{
                minWidth: 100,
                maxWidth: 100,
                minHeight: 100,
                maxHeight: 100,
                flex: 1,
                paddingRight: 30,
                borderRadius: 10,
              }}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 5,
    alignItems: 'flex-start',
    flexDirection: 'row-reverse',
  },
});
