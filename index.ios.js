'use strict';
 
var React = require('react-native');
var Explore = require('./Explore');
var New = require('./New');
var Profile = require('./Profile');

var {
    AppRegistry,
    TabBarIOS,
    Component
   } = React;
 
class dailyglancer extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'explore'
        };
    }
 
    render() {
        return (
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
        );
    }
}
 
AppRegistry.registerComponent('dailyglancer', () => dailyglancer);
