'use strict';
 
var React = require('react-native');
var Explore = require('./Explore');
var New = require('./New');
var Profile = require('./Profile');
var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var Actions = require('react-native-router-flux');


var {
    AppRegistry,
    TabBarIOS,
    StyleSheet,
  	Text,
  	View,
    Image,
  	TouchableOpacity,
    Component,
    Navigator
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

class MainApp extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'explore',
            isOpen: false, 
        };
    }
    
    toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen,
    	});
  	}

  	updateMenuState(isOpen) {
    	this.setState({ isOpen, });
  	}
 
    render() {
    	
    
    	const menu = <Menu navigator={navigator}/>;
        return (
        	 <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        
        	
        
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'explore'}
                    systemIcon="recents"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'explore'
                        });
                    }}>
                    <Explore/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'new'}
                    systemIcon="search"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'new'
                        });
                    }}>
                    <New/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'profile'}
                    systemIcon="contacts"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'profile'
                        });
                    }}>
                    <Profile/>
                </TabBarIOS.Item>
            </TabBarIOS>
            
            <Button style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: 32, height: 32, }} />
        </Button>
      </SideMenu>
        );
    }
}
 
module.exports = MainApp;