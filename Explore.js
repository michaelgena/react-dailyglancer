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
        flex: 1
    }
});

class Explore extends Component {
    render() {
        return (
  	    	<NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'My recent Glances',
            component: GlanceList
            }}/> 
        );
    }
}

module.exports = Explore;