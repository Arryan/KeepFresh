process.nextTick = setImmediate;
import * as React from 'react';
import {
  Dimensions,
  Alert,
  Image,
  Text,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';

import FoodItem from './components/FoodItem';
import CamButton from './components/CamButton';
import Cam from './components/Cam';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cameraOn: false,
      loading: false,
      food: [
        // {
        //   name: 'Apple',
        //   url:
        //     'https://bcpuppets.ca/wp-content/uploads/2018/09/apple-worm-100x100.jpg',
        //   pantryExpiration: '2-4 weeks',
        //   refrigarator: '1-2 months',
        //   id: 0
        // },
        // {
        //   name: 'Orange',
        //   url:
        //     'http://www.laceupforchange.org.za/wp-content/uploads/2017/02/fruit-orange.jpg',
        //   pantryExpiration: '2-4 weeks',
        //   refrigarator: '1-2 months',
        //   id: 1
        // },
      ],
    };
  }

  toggleCam = e => {
    this.setState({
      cameraOn: !this.state.cameraOn,
    });
  };

  pushItem = newItem => {
    this.setState({
      food: [...this.state.food, { ...newItem, id: this.state.food.length }],
    });
    this.setLoading(false);
    console.log(newItem);
  };

  popItem = i => {
    let newFood = this.state.food.filter(item => item.id !== i);
    this.setState({
      food: newFood,
    });
  };

  setLoading = s => {
    this.setState({
      loading: s,
    });
    if (!s) this.setState({ cameraOn: false });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Image
            source={require('./assets/icons/loading-icon.gif')}
            style={{
              marginTop: 50,
              maxHeight: 150,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
          />
        ) : (
          <ScrollView>
            <Image
              style={{
                flex: 1,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                height: 100,
                width: 100,
              }}
              source={require('./assets/icons/app-icon.png')}
            />
            {this.state.food.length ? (
              this.state.food.map((item, i) => (
                <FoodItem
                  item={item}
                  key={i}
                  popItem={this.popItem.bind(this)}
                />
              ))
            ) : (
              <View style={styles.container}>
                <Card style={styles.empty}>
                  <Text style={styles.emptyText}>Your pantry is empty</Text>
                </Card>
              </View>
            )}
          </ScrollView>
        )}
        <View
          style={
            this.state.cameraOn
              ? { height: Dimensions.get('window').height }
              : { height: 100 }
          }
        >
          {this.state.cameraOn ? (
            <Cam
              pushItem={this.pushItem.bind(this)}
              toggle={this.toggleCam.bind(this)}
              setLoading={this.setLoading.bind(this)}
              style={{ flex: 3 }}
            />
          ) : (
            <CamButton
              setLoading={this.toggleCam.bind(this)}
              toggle={this.toggleCam.bind(this)}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#35b234',
    flexDirection: 'column',
  },
  empty: {
    marginTop: Dimensions.get('window').height / 4,
    paddingTop: 10,
    paddingBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    marginLeft: Dimensions.get('window').width / 2 - 75,
    fontWeight: 'bold',
  },
});
