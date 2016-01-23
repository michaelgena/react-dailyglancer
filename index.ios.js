'use strict';
 
var React = require('react-native');
var Explore = require('./Explore');
var New = require('./New');
var Profile = require('./Profile');
var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var MainApp = require('./MainApp');

var {
    AppRegistry,
    TabBarIOS,
    StyleSheet,
  	Text,
  	View,
    Image,
  	TouchableOpacity,
    Component
   } = React;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF058',
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

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}


var dailyglancer = React.createClass({
	getInitialState: function() {
    	return {loaded: true, data: null};
  	},

    componentWillMount: function() {
      fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction')
      .then(res => {
        this.setState({
          data: res,
          loaded: true
      	});
      })
  	},
 
    render: function() {
        if(this.state.loaded) {
      		return <MainApp />;
    	} else { 
      		 return (
  	    		<View style={styles.container}>
	        		<Text style={styles.description}>
        	  			
	        		</Text>
	    		</View>
        	);
    	}
    }
});
 
AppRegistry.registerComponent('dailyglancer', () => dailyglancer);
