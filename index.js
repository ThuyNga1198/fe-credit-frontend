//import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator} from 'react-navigation';

import CameraEx from './screens/CameraEx';
import nhandien from './screens/nhandien';

import {CameraScreen,nhandienScreen} from './screenName';

const App=StackNavigator({
    CameraScreen:{
        screen: CameraEx

    },

    nhandienScreen:{
        screen: nhandien

    }
});

AppRegistry.registerComponent('tutorialProject',()=>App);
//export default App