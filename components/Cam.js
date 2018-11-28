import recognizer from './Clarifai';
import React from 'react';

import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class Cam extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      this.props.setLoading(true);
      const photo = await this.camera.takePictureAsync({
        base64: true,
        ratio: '1:1',
      });
      const { uri, base64 } = photo;
      recognizer(base64)
        .then(async n => {
          try {
            let response = await fetch(
              'https://ejohnston.lib.id/eatsafe@dev/?food=' + n
            );
            let responseJson = await response.json();
            this.props.pushItem({
              name: n,
              url: uri,
              pantryExpiration: responseJson['Pantry'],
              refrigarator: responseJson['Refrigerator'],
            });
            this.props.setLoading(false)

          } catch (err) {
            console.error(err);
          }
        })
        .catch(e => console.warn(e));
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  marginTop: 20,
                  flexDirection: 'column-reverse',
                }}
                onPress={() => this.props.toggle()}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.snap}
              style={{
                height: 50,
                width: 50,
                marginBottom: 50,
                opacity: 0.7,
                borderRadius: 10,
                backgroundColor: '#FFF',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Text />
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
}
