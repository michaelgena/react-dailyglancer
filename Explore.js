'use strict';

var React = require('react-native');
var GlanceList = require('./GlanceList');

var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF058'
    }
});

class Explore extends Component {
    render() {
        return (
  	    	<NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'My Recent Glances',
            component: GlanceList
            }}/> 
        );
    }
}

module.exports = Explore;