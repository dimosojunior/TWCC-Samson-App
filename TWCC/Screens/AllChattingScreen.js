
import { COLORS, SIZES } from '../Screens/src/Constant';
//import ChatHeader from '../../Component/Header/ChatHeader';
// create a component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  ImageBackground,
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';


import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


const AllChattingScreen = ({ navigation, route }) => {
 const { 
    
    Title,
    id,
    PichaYaPost,
    PichaYaPost2,
    PichaYaPost3,
    PichaYaPost4,
    PichaYaPost5
   } = route.params

  const post_id = id;



  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable




  
 const showAlertFunction = (message2) => {
    setAlertMessage(message2);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });




  const [queryset, setQueryset] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [isPending2, setIsPending2] = useState(false);
  const [isPending3, setIsPending3] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token);
      getItems(token); // Fetch items on mount
    });
  }, []);




const [userData, setUserData] = useState({});
  //const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    // if (userToken) {
     
    //  getItems();
    // }

  }, [userToken]);


  const checkLoggedIn = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         setMaelezo(userData.Maelezo);
          setLocation(userData.Location);

          // Set selectedMkoa moja kwa moja kwa kutumia ID
        setSelectedMkoa(userData.Mkoa.id);

        setSelectedAinaYaKuku(userData.AinaYaKuku.id);
         setSelectedRole(userData.Role.id);

         setprofile_image(userData.profile_image);
         setIsPicked(false);
        
         // Set selectedMkoa and selectedAinaYaKuku based on user data
        //  const mkoa = Mkoa.find(m => m.id === userData.Mkoa.id);
        // const ainaYaKuku = AinaYaKuku.find(a => a.id === userData.AinaYaKuku.id);

        // setSelectedMkoa(mkoa ? mkoa.id : null);
        // setSelectedAinaYaKuku(ainaYaKuku ? ainaYaKuku.id : null);


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
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      //showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading(false);
    }
  };




  const getItems = async (token) => {
    setIsPending(true);
    const url = `${EndPoint}/GetChatMessagesView/?post_id=${post_id}`;
    try {
      const res = await axios.get(url);
      
      // Set messages in the correct nested format
      setQueryset(res.data.queryset);
      setIsPending(false);
    } catch (error) {
      console.log("Error fetching messages:", error);
      setIsPending(false);
    }
  };

  const sendMessage = async () => {
    setIsPending2(true);
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      const formData = new FormData();
      formData.append('message', message);
      if (replyMessage) formData.append('replyTo', replyMessage.id);

      try {
        const response = await axios.post(`${EndPoint}/AddChatMessageView/${post_id}/`, formData, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data' }
        });

        // Update local state with the new message
        if (replyMessage) {
          setQueryset(prev => 
            prev.map(msg => 
              msg.id === replyMessage.id 
              ? { ...msg, replies: [...(msg.replies || []), response.data] } 
              : msg
            )
          );
        } else {
          setQueryset(prev => [...prev, { ...response.data, replies: [] }]);
        }

        setMessage('');
        setReplyMessage(null);
      } catch (error) {
        console.log("Message not sent:", error);
      } finally {
        setIsPending2(false);
      }
    }
  };

  const handleReply = (message) => {
    setReplyMessage(message);
  };





const removeUserSubmittedData = async (postId) => {

  setIsPending3(true);
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("postId", postId);
    try {
       await axios.delete(EndPoint + `/DeleteYourChatMessageView/${postId}/delete/`, {
      //await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
       setQueryset(queryset.filter((item) => item.id !== postId));
      //setIsPending(false);
      setIsPending3(false);

      //showAlertFunction('Umefanikiwa kufuta kumbusho');
     // navigation.navigate('Historia Za Kumbusho Za Kusafisha Banda');  // Navigate back to the previous screen
    

    } catch (error) {
      setIsPending3(false);
       //setIsPending(false);
      //showAlertFunction('Imeshindikana kufuta kumbusho');
     
      //console.log(error);
    }
  };



  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Tarehe: ${day}/${month}/${year},  ${hours}:${minutes}`;
  };

 

// Step 1: Add state for tracking reply visibility
  const [showReplies, setShowReplies] = useState({});

   // Function to toggle replies for a specific comment
  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // Toggle the visibility
    }));
  };



  const renderReply = (reply) => (
    <View key={reply.id} style={{ 
      flexDirection: 'row', marginVertical: 5,
       marginLeft: 30,
       // backgroundColor:'grey',
        }}>
     

        {reply.SenderImage ? ( 
                  <Image

                  style={{ width: 30, height: 30, borderRadius: 15 }}
                   source={{
                      uri: EndPoint + '/' + reply.SenderImage
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={{ width: 30, height: 30, borderRadius: 15 }}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{

        }}>{reply.sender}</Text>
        <Text>{reply.message}</Text>
        <Text style={{ fontSize: 12, color: 'grey' }}>{formatDate(reply.created_at)}</Text>
      </View>
    </View>
  );

  const renderMessage = ({ item }) => (
    <View style={{ 
      flexDirection: 'column', marginVertical: 5,

       }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        //backgroundColor:'red'
         elevation: 1,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? 'black' : 'black',
    shadowOpacity: 1,
    shadowRadius: 2,
    //borderWidth:.2,
    borderColor:COLORS.green,
    padding:10,
    borderRadius: 10,
    borderTopRightRadius:0,
         }}>

       {/* <Image
          source={{ uri: EndPoint + '/' + (item.SenderImage || 'assets/profile.jpg') }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />*/}

          {item.SenderImage ? ( 
                  <Image

                  style={{ width: 40, height: 40, borderRadius: 20 }}
                   source={{
                      uri: EndPoint + '/' + item.SenderImage
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={{ width: 40, height: 40, borderRadius: 20 }}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{
            color:'green',
            fontFamily:'Medium',
          }}>{item.sender}</Text>
          <Text>{item.message}</Text>
          <Text style={{ fontSize: 12, color: 'grey' }}>{formatDate(item.created_at)}</Text>
        </View>

        {/* mwanzo wa Reply button*/}
        <View style={{

        }}>
        <TouchableOpacity onPress={() => handleReply(item)}>
          <Text style={{ color: 'blue' }}>Reply</Text>
        </TouchableOpacity>


{username === item.sender && (
   <TouchableOpacity
onPress={() => removeUserSubmittedData(item.id)}
style={{
    //marginRight:20,
    //marginBottom:20,
    marginTop:15,
}}
>

{!isPending3 && (
<MaterialCommunityIcons

        style={{
            // marginHorizontal: 15,
            //color: COLORS.white
        }}
        name="delete"
        size={17}
          //color="black" 
          color="red" 
        
    />
  
    )}

</TouchableOpacity>
)}


        </View>
          {/* mwisho wa Reply button*/}


      </View>

      <View style={{
        backgroundColor:'wheat',
      }}>
        
       {showReplies[item.id] && item.replies && item.replies.map(renderReply)}
       </View>


{/* Toggle replies button */}
{/* Show "View Replies" button only if there are replies */}
    {item.replies && item.replies.length > 0 && (
      <TouchableOpacity onPress={() => toggleReplies(item.id)} style={{ padding: 5, marginLeft: 50 }}>
        <Text style={{ color: showReplies[item.id] ? 'red' : 'blue' }}>
          {showReplies[item.id] ? "Close Replies" : "View Replies..."}
        </Text>
      </TouchableOpacity>
      )}


    </View>
  );

  return (

           <>{!fontsLoaded ? (<View/>):(




    <View style={{ flex: 1 }}>


        {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Loading data</Text>
      <Text style={globalStyles.loaderCounter}> please wait</Text>
    </View>
  </View>
)}



    {queryset && queryset.length > 0 ? (

                  <>


      <FlatList
        data={queryset}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
         style={{ 
                    flex: 1,
                    marginTop:15,
                    marginBottom:20,
                    marginHorizontal:15,
                }}
      />
      {replyMessage && (
        <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>Reply message: {replyMessage.message}</Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)}>
            <Text style={{ color: 'red' }}>Close</Text>
          </TouchableOpacity>
        </View>
      )}



</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{

    justifyContent:'center',
    alignItems:'center',
    flex:1,
   }]}>

  <Text style={[globalStyles.noitemText,{
    color:'white',
  }]}>
  No message yet!
  </Text>

 


</View>

  )} 




      <View style={{ flexDirection: 'row',
       alignItems: 'center', padding: 10,
       width:'100%',
        }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Write message"
           placeholderTextColor = "black"
           multiline={true}
          style={{ flex: 1, 
            borderWidth: 1, 
            borderColor: 'green',
             padding: 10, 
             borderRadius: 5, 
             width:'80%',
             marginRight:10,
           }}
        />
        <TouchableOpacity 
        onPress={sendMessage} 
        disabled={isPending2}
        style={{
          width:'10%'
        }}
        >
          {isPending2 ?  <ActivityIndicator size="large" color="green" /> :  <FontAwesome
                        style={{
                            // marginHorizontal: 15,
                            color: "green",
                            fontFamily:"Medium",
                            // backgroundColor:'black',
                            // padding:10,
                        }}
                        name="paper-plane-o"
                        size={30}
                          //color="black" 
                          color="green" 
                        
                    />}
        </TouchableOpacity>
      </View>





 <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Vyakula Stores"
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
                    <Image source={require('../assets/i2.jpg')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>TWCC</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


    </View>





    )}</>
  );
};

export default AllChattingScreen;
