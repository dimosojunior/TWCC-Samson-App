
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SigninScreen from '../AccountScreens/SigninScreen';
import SignupScreen from '../AccountScreens/SignupScreen';

import SendSMS from '../AccountScreens/SendSMS';
import WatejaWote from '../Screens/WatejaWote';
import ViewMteja from '../Screens/ViewMteja';


import ChangePasswordScreen from '../AccountScreens/ChangePasswordScreen';

import WelcomeScreen from '../Screens/WelcomeScreen';
import HomeScreen from '../Screens/HomeScreen';

import GetAllProducts from '../Screens/GetAllProducts';
import AddNewProduct from '../Screens/AddNewProduct';

import AllChattingScreen from '../Screens/AllChattingScreen';
import ViewProduct from '../Screens/ViewProduct';

import PaymentScreen from '../Screens/PaymentScreen';
//import PaymentScreen from '../Screens/PaymentScreen';
import PaymentInfo from '../Screens/PaymentInfo';

const Stack = createStackNavigator();

function MyStack( {navigation}){

  // hii ni kwa ajili ya zile slide za mwanzo km mtu ameshaingia na akaziona
// basi akiingia kwa mara ya pili asizione tena
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
  useEffect(() => {
    async function check(){

     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else {
      setIsAppFirstLaunched(false);
    }



    }
    check()
   
  }, []);

// mwisho hap wa hizo codes za slides za mwanzo

 


  return (

  isAppFirstLaunched != null &&(
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

 //<NavigationContainer>
    <Stack.Navigator
    //initialRouteName="Home Stack"
      screenOptions={{
      	headerShown:false,
        headerStyle:{
          backgroundColor:"green",
           //height:100,

        },
        headerTintColor:"white",
        headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      >

{isAppFirstLaunched && (
<Stack.Screen
      name="Welcome Screen"
      component={WelcomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

)}


 <Stack.Screen
      name="Signup Stack"
      component={SignupScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Signin Stack"
      component={SigninScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />









       <Stack.Screen
      name="Send SMS"
      component={SendSMS}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

         <Stack.Screen
      name="Wateja Wote"
      component={WatejaWote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


            <Stack.Screen
      name="View Mteja"
      component={ViewMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

      


       <Stack.Screen
      name="Badili Password"
      component={ChangePasswordScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
























       <Stack.Screen
      name="Get All Products"
      component={GetAllProducts}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="Add New Product"
      component={AddNewProduct}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="All Chatting Screen"
      component={AllChattingScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



   <Stack.Screen
      name="View Product"
      component={ViewProduct}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="Payment Screen"
      component={PaymentScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="Payment Info"
      component={PaymentInfo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />







      </Stack.Navigator>
      //	</NavigationContainer>

      ) 
//bano la kufunga if is first launched



    );
  }
  export default MyStack;