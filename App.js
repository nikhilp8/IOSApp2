/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList,ScrollView, SectionList, Alert } from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';

// get the available permissions from AppleHealthKit.Constants object
const PERMS = AppleHealthKit.Constants.Permissions;

// setup healthkit read/write permissions using PERMS
const healthKitOptions = {
  permissions: {
    read: [
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

var testResult;

AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
  if (err) {
    console.log("error initializing Healthkit: ", err);
    return;
  }
  else {
    console.log('success in initializing healthkit')
  }

  // let options = {
  //   startDate: (new Date()).toISOString(),
  //   endDate: (new Date((new Date()).getTime() - 24 * 60 * 60 * 1000)).toISOString(),
  //   type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
  // };

  let options = {
    startDate: (new Date(2019,1,11)).toISOString(),
    endDate: (new Date(2019,4,26)).toISOString(),
    type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
  };

  AppleHealthKit.getSamples(options, (err, results) => {
    if (err) {
      console.log('no workout sample data', err)
      return;
    }
    // testResult = results;
    console.log('workout results', results)
  });

  let optionsWeight = {
    unit: 'pound'
  };

  AppleHealthKit.getLatestWeight(optionsWeight, (err, results) => {
    if (err) {
      console.log("error getting latest weight: ", err);
      return;
    }
    console.log('latest weight', results)
  });

  AppleHealthKit.getDateOfBirth(null, (err, results) => {
    if (err) {
      return;
    }

    console.log('dob resultl', results)
  });

  AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
    if (err) {
      console.log('error with step count')
      return;
    }
    console.log('daily step count', results)
});
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  
  GetSectionListItem=(item)=>{
    Alert.alert(item)
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Health to Strava!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{healthKitOptions.permissions.read[0]}</Text>
        {/* <Text>{testData ? `${testData}`: 'failed'}</Text> */}
        <ScrollView>
        <SectionList
          sections={[
            { title: 'April 2019', data: ['Outdoor Run', 'Indoor Cycle', 'Pool Swim'] },
            { title: 'March 2019', data: ['Outdoor Run', 'Indoor Cycle', 'Pool Swim', 'Outdoor Run', 'Indoor Cycle', 'Pool Swim'] },
            // { title: 'February 2019', data: ['Outdoor Run', 'Indoor Cycle', 'Outdoor Run', 'Indoor Cycle', 'Pool Swim'] },
            // { title: 'January 2019', data: ['Outdoor Run', 'Indoor Cycle', 'Pool Swim','Outdoor Run', 'Indoor Cycle', 'Pool Swim'] },
            // { title: 'December 2019', data: ['Outdoor Run', 'Indoor Cycle', 'Pool Swim'] },
          ]}
          renderSectionHeader={({ section }) => <Text style={styles.SectionHeader}> {section.title} </Text>}
          renderItem={({ item }) => <Text style={styles.SectionListItemS} onPress={this.GetSectionListItem.bind(this, item)}> {item} </Text>}
          keyExtractor={(item, index) => index}
        />
        </ScrollView>
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
  SectionHeader:{
    backgroundColor : 'black',
    fontSize : 20,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold'
 },
  SectionListItemS:{
    fontSize : 16,
    padding: 6,
    color: '#000',
    backgroundColor : '#F5F5F5'
}
});
