import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class App extends React.Component {
  state = {
    jsonData: '',
    dateTime: '',
    greetings: '',
  };
  componentDidMount() {
    var hours = parseInt(new Date().getHours());

    if(hours>= 6 && hours <12) {
      this.setState({
        greetings: 'Good morning Sunshine! :) ... here is something for the day',
      });
    }
    else if(hours>= 12 && hours <=17) {
      this.setState({
        greetings: 'Good afternoon dear!',
      });
    }
    else if(hours>= 0 && hours < 6) {
      this.setState({
        greetings: 'Good night dear!',
      });
    } else {
       this.setState({
        greetings: hours,
      });
    }    

    fetch('http://quotes.rest/qod.json?category=love', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        if(json.error) {
          this.setState({
            jsonData: '',
          });
        } else {
            this.setState({
            jsonData: json.contents.quotes[0].quote,
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({
          jsonData: '',
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.greetings}</Text>
        <Text>{this.state.jsonData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight:20,
  },
});