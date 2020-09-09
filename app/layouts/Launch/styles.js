
import { Dimensions, StyleSheet } from 'react-native'
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    position: {
        position: 'absolute',
        bottom: 10,
    },
    button: {
        paddingTop: -20,
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
      },
    textButton: {
        color: '#fff',
        fontSize: 20,

    },
    imgBackground: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height, 
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        width:20,
        height:20,
        backgroundColor:'#fff'
    },
    active: {
         backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    inactive: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
})

export { styles }