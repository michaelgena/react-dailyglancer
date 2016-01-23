'use strict';
 var REQUEST_URL = "http://dailyglancer.com/react/get_glance_makers_by_token.php?PgePrntToken=2e1058f32da92fa136ce12e24462e1d1";
 var GlancerList = require('./GlancerList');
 
const React = require('react-native');
var Actions = require('react-native-router-flux');

const {
  Dimensions,
  StyleSheet,
  ScrollView,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
  Image,
  Text,
  Component,
  NavigatorIOS
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#FDF058',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    /*fontSize: 14,
    fontWeight: '300',*/
    paddingTop: 5,
  },
	listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});



class Menu extends Component {
	
	

	constructor(props) {
       super(props);
       this.state = {
       		isLoading: true,
           	dataSource: new ListView.DataSource({
               	rowHasChanged: (row1, row2) => row1 !== row2
           	})
       };
   	}

	renderLoadingView() {
	
    	return (
    	<ScrollView scrollsToTop={false} style={styles.menu}>
        	<View style={styles.loading}>
           	 <ActivityIndicatorIOS
           	     size='small'/>
          
        	</View>
         </ScrollView>
    	);
	}
	
	componentDidMount() {
    	this.fetchData();
   	}
	
	fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.glance_makers),
               isLoading: false
           });
           
       })
       .done();
   	}

  render() { 	
  	if (this.state.isLoading) {
           return this.renderLoadingView();
       	}
       
    	return (
    	<ScrollView scrollsToTop={false} style={styles.menu}>
       		<ListView
            	dataSource={this.state.dataSource}
            	renderRow={this.renderGlanceMaker.bind(this)}
            	style={styles.item}
            	/>
       </ScrollView>
      
    	);
    }
  
  	renderGlanceMaker(glanceMaker) {
  		console.log(glanceMaker.PgeToken);
       return (
            <TouchableHighlight onPress={()=>Actions.glancerList({data:glanceMaker.PgeToken, title:glanceMaker.PgeTitle })}  underlayColor='#dddddd'>
                <View>
                	<Text style={styles.item}>{glanceMaker.PgeTitle}</Text>
                </View>
            </TouchableHighlight>
       );
   	}
   
    /*return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <Text style={styles.item}>About</Text>
        <Text style={styles.item}>Contacts</Text>
      </ScrollView>
    );
  }*/
};

Menu.contextTypes = {
  	menuActions: React.PropTypes.object.isRequired
};

module.exports = Menu;