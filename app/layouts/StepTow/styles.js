
import { Dimensions, StyleSheet } from 'react-native'
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height, 
    },
    icon: {
        width: 100, 
        height: 68,
        alignSelf: 'stretch',
    },
    wrapIcon: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 50
    },
    wrap: {
        flex: 1, 
        position: 'relative'
    },
    formGroup: {
        flexDirection: 'column', 
        marginBottom: 16, 
        paddingHorizontal: 16
    },
    labelInput: {
        fontSize: 13, 
        color: '#757F8C', 
        marginBottom: 5
    },
    itemInput: {
        flexDirection: 'row', 
        borderColor: '#757F8C',
        borderBottomWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        margin: 0, 
        padding: 0, 
        flex: 1, 
        height: 40, 
        paddingLeft: 8, 
        fontSize: 16
    },
    btnWrap: {
        marginHorizontal: 16,
        marginTop: 12
    },
    btn: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 4,
        backgroundColor: '#613EEA', 
        height: 48, 
        position: 'relative'
    },
    textBtn: {
        
    }
})

export { styles }