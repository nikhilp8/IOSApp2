/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';

// get the available permissions from AppleHealthKit.Constants object
const PERMS = AppleHealthKit.Constants.Permissions;

// setup healthkit read/write permissions using PERMS
const healthKitOptions = {
    permissions: {
        read:  [
            PERMS.Workout,
            PERMS.Height,
            PERMS.Weight,
            PERMS.StepCount,
            PERMS.DateOfBirth,
            PERMS.BodyMassIndex,
            PERMS.ActiveEnergyBurned
        ],
        // write: [
        //     PERMS.StepCount
        // ],
    }
};
AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
  if (err) {
      console.log("error initializing Healthkit: ", err);
      return;
  }
  else {
    console.log('success in initializing healthkit')
  }

  let options = {
    startDate: (new Date(2018,4,27)).toISOString(),
    endDate: (new Date()).toISOString(),
    type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
  };
  AppleHealthKit.getSamples(options, (err, results) => {
    if (err) {
      return;
    }
    console.log('results', results)
  });

  AppleHealthKit.getDateOfBirth(null, (err, results) => {
    if (err) {
      return;
    }
      console.log(results)
    });

});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Health to Strava!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{healthKitOptions.permissions.read[0]}</Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
