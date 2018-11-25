import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import { Constants } from 'expo';

export default class CamButton extends React.Component {
  render() {
    return (
        <Card style={styles.container}>
          <View style={{...styles.container, backgroundColor: '#EEE', borderRadius: 10,}}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.toggle()}>
                <Text style={{fontWeight: 'bold', marginTop: -5}}> Add Item </Text>
              </TouchableOpacity>
          </View>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#36780b'
  },
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: -5,
    paddingTop: 20,
    paddingLeft: (Dimensions.get('window').width / 2) - 100,
    paddingBottom: 20,
    paddingRight: (Dimensions.get('window').width / 2) - 100,
  },
});
