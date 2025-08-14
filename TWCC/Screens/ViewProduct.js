import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Linking,Alert,
  Dimensions,
  Modal,
  Pressable,

  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {CustomCard} from '../RenderedComponents/CustomCard';
import MinorHeader from '../Header/MinorHeader';
import React, {useState,useCallback,useRef,memo, useEffect, useContext} from 'react';

import Html from 'react-native-render-html';
import { FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';


const {width, height} = Dimensions.get('window');





export default function ViewProduct ({navigation, route}) {

   const { 
    
    Title,
    id,
    Maelezo,
    LevelImage,
    phone,
    username,
    Location,
    Created,
    PichaYaPost,
    PichaYaPost2,
    PichaYaPost3,
    PichaYaPost4,
    PichaYaPost5,
    profile_image,
    Likes,
    UserRole,
    TickStatus,
    email
   } = route.params




 
  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


const ViewedUsernameProduct = username;

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);



 const [Maoni, setMaoni] = useState('');
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [MtoaMaoniEmail, setMtoaMaoniEmail] = useState('');
 const [MtoaMaoniUsername, setMtoaMaoniUsername] = useState('');
 const [MtoaMaoniPhone, setMtoaMaoniPhone] = useState('');
 const [isLoading2, setIsLoading2] = useState(false);


//FOR SEARCHING
const [input, setInput] = useState('');



 useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading2(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );



        const userData = userResponse.data;
        setIsLoading2(false);
        setMtoaMaoniEmail(userData.email);
        setMtoaMaoniUsername(userData.username);
        setMtoaMaoniPhone(userData.phone);
        
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  //const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading2(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo wakati wa utoaji wa maoni yako');
      setIsLoading2(false);
    }
  };


  const handleUpdate = async () => {
    setIsLoading2(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      
       

         if (Maoni) {
            formData.append('Maoni', Maoni);
        } else {
            showAlertFunction('Tafadhali andika maoni yako ?');
            setIsLoading2(false);
            return;
        }

     

      axios.post(EndPoint + '/AddMaoniView/', formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading2(false);
        showAlertFunction("Hongera kwa kutoa maoni, Maoni yako yamepokelewa kwetu na tunaahidi kuyafanyia kazi.");
        setIsModalVisible(false);
        setModalVisible(false);

        setMaoni('');
        //console.log("Well");
      }).catch(error => {
        setIsLoading2(false);
        setIsModalVisible(false);
        setModalVisible(false);
         handleErrorMessage(error);
        // showAlertFunction("Imeshindikana kutoa maoini yako");
        

        
      });
    }
  };


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"


//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'












    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };








 const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 








  return (

       <>{!fontsLoaded ? (<View/>):(

        <>
        {!isLoading2 ? (

        <LinearGradient
  colors={['#134e5e', '#71b280']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={globalStyles.container}
>
  
           <MinorHeader title="Mawasiliano"/>

           <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 
      >



              <View style={[globalStyles.bottomview,
                { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }


                ]}>
            



                <View style={{
                  flexDirection:'row',
                  width:'100%',
                  alignItems:'center',
                  justifyContent:'space-between',
                }}>
               <Text
                style={[
                  globalStyles.AppChaguaHudumaTextYoutubeChannel,
                  {
                    fontFamily:'Medium',
                    color:'white',
                    marginHorizontal:0,
                    width:'70%',


                  }
                ]}  
                
                >
                Taarifa  za {username}
                </Text>
               

                </View>













            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerYoutubeChannel} 
               
                >



          
      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerYoutubeChannel}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameYoutubeChannel,{
                    color:'white',
                  }]}

                 >{Title}</Text>




  

           <View 
                style={[globalStyles.AppItemImageContainerHomeScreen,
                  {
                    marginBottom:15,
                  }

                  ]}
              >
              {PichaYaPost && ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + PichaYaPost
                    }}
                      
                      >
                  </Image>
                  )}
                
                
               </View>


           {Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'white',
                fontFamily:'Light',
               }}>
                 {Maelezo}
               </Text>
                 
               </TouchableOpacity>
               )}

            <TouchableOpacity 

        //      onPress={() => {
        //    navigation.navigate('View Duka Lako', item);    
        // }} 
        >
           <View style={globalStyles.LeftBtnContainer}>
            <Text 
          style={[globalStyles.AppItemButtonTextHomeScreen,
            {
              width:'60%',
              marginTop:30,
               
              backgroundColor:'green',
              borderColor:'white',
              borderWidth:1,
              color:'white',
            
            }

            ]}
        >Posted on: {formatDate(Created)}</Text>
         </View>
         </TouchableOpacity>



                </View>
                <View>
                 
                </View>




<View>
  
      <View style={[globalStyles.menuWrapper, 
        {}]}>
       
  
  {username != MtoaMaoniUsername ? (  
<Text style={{
  marginTop:50,
  fontFamily:'Medium',
  color:'white',

}}>
  Unaweza kuwasiliana naye kupitia njia hizo hapo chini
</Text>


):(

<Text style={{
  marginTop:50,
  fontFamily:'Medium',
  color:'white',

}}>
  Watu wanaweza kuwasiliana na wewe kupitia njia zifuatazo
</Text>

)} 

 {phone && (
         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${phone}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="phone" color="yellow" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Piga Simu</Text>
          </View>
        </TouchableOpacity>)}

{phone && (
        <TouchableOpacity  onPress={() => sendTextMessage(phone, message)}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="message" color="red" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Mtumie ujumbe kawaida</Text>
          </View>
        </TouchableOpacity>)}



 {phone && (
        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {

          }]}>
            <FontAwesome name="whatsapp" color="blue" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Chati naye whatsapp</Text>
          </View>
        </TouchableOpacity>)}



          {email && (
         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${email}?subject=Hello ${username}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="email" color="white" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Mtumie email</Text>
          </View>
        </TouchableOpacity>)}

        





      </View>

</View>




              </View>
           </CustomCard>







                </View>

          {/*Mwisho wa item View*/}














               
                </View>























</ScrollView>



              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/icon.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>TWCC</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
        }}
      >
    <ScrollView 
    keyboardShouldPersistTaps="handled"
    >
   
        <View style={{ 
         flex: 1,
         marginTop:height/6,
         //justifyContent: 'center', 
         alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={[
            globalStyles.ModalViewViewProduct,
            {
              backgroundColor:'green',
              justifyContent: 'center', 
             alignItems: 'center',
             //height:height/4,
             width:'90%',


            }



            ]}>
          
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',
                color:'white',

              }
              ]}>
              
           Hello {MtoaMaoniUsername}, Unakaribishwa kutoa maoini yako kuhusiana na {username}, pamoja
            na huduma zake
            
            
            </Text>
   




{/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='Andika maoni yako'
                        placeholderTextColor={COLORS.white}
                        value={Maoni}
                    onChangeText={setMaoni}
                       
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



                


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':50,
              }

              ]}>

              <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'red',
                            marginRight:10,
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={() => {
                      setModalVisible(false);
                      setIsModalVisible(false); // Reset state when modal closes
                     
                    }}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Funga</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'black'
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={handleUpdate}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Tuma Maoni</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        
        </ScrollView>
      </Modal>



          </LinearGradient>

 ) : (
  <LotterViewScreen />
)}
</>



          )}</>

          );
}

const styles = StyleSheet.create({
 
});