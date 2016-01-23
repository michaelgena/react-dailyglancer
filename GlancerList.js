'use strict';
 
var React = require('react-native');
var GlanceDetail = require('./GlanceDetail');
var REQUEST_URL = "http://dailyglancer.com/action/get_feed_urls.php?PgeToken=";
 
var {
	Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;
 
var styles = StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 380,
        height: 350
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8
    },
    content: {
        color: '#656565',
        margin: 5
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
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
 
class GlancerList extends Component {
	
	constructor(props) {
       super(props);
       this.state = {
       		isLoading: true,
           	dataSource: new ListView.DataSource({
               	rowHasChanged: (row1, row2) => row1 !== row2
           	})
       };
   	}

    render() {
    	if (this.state.isLoading) {
           return this.renderLoadingView();
       	}
       
    	return (
       		<ListView
            	dataSource={this.state.dataSource}
            	renderRow={this.renderGlancer.bind(this)}
            	style={styles.listView}
            	/>
    	);
	}
	
	renderLoadingView() {
    	return (
        	<View style={styles.loading}>
           	 <ActivityIndicatorIOS
           	     size='large'/>
           	 <Text>
           	     Loading glances...
        	    </Text>
        	</View>
    	);
	}
	
	renderGlancer(glance) {
		return (
			<View>
				<Text>{glance}</Text>
			</View>
	 	);
	
	  /* var imgUri = "";
	   if(glance.PgeOgImage != ""){
	   	imgUri = glance.PgeOgImage;
	   }else{
	   	imgUri = glance.IfrUrl;
	   }
       return (
            <TouchableHighlight onPress={() => this.showGlanceDetail(glance)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: imgUri}}
                            style={styles.thumbnail} />
                    </View>
                     <View style={styles.rightContainer}>
                        <Text style={styles.title}>{glance.PgeTitle}</Text>
                        <Text style={styles.content}>{glance.IfrDescription}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
       */
   }
    
    componentDidMount() {
    	this.fetchData();
   	}
   	
   	fetchData() {
   		console.log("Request: ["+REQUEST_URL+this.props.glanceMaker.PgeToken+"]");
       fetch(REQUEST_URL+this.props.glanceMaker.PgeToken)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.urls),
               isLoading: false
           });
       })
       .done();
   	}
   	
	showGlanceDetail(glance) {
    	   this.props.navigator.push({
        	 	title: glance.volumeInfo.title,
           		component: GlanceDetail,
           		passProps: {glance}
       		});
   	}
}
 
module.exports = GlancerList;