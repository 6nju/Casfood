
import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Test1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Test1</Text>
            </View>
        )
    }
}

export default Test1