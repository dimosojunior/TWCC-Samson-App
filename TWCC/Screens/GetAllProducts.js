

//textHeight


import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';

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

import COLORS  from '../Constant/colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {CustomCard} from '../RenderedComponents/CustomCard';

const { width, height } = Dimensions.get('window');






const GetAllProducts = ({ navigation }) => {

const [loadingTime, setLoadingTime] = useState(0);







  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [queryset, setQueryset] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isPending, setIsPending] = useState(true);

   const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable

const [input, setInput] = useState('');

  
 const showAlertFunction = (message) => {
    setAlertMessage(message);
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

  

// State variable to store the RoomClasses data
  const [Status, setStatus] = useState([]);
 const [selectedStatus, setSelectedStatus] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    //setPending2(true);
    fetch(`${EndPoint}/Add/AllProductsCategoryViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setStatus(data);
        //setPending2(false);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //setPending2(false);
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);

 const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        setUserData(JSON.parse(userDataJSON));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTokenAndData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      if (token) {
        //setcurrent_page(1); // Reset page when refetching
        getItems(token); // Start fetching from the first page
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsPending(true); // Set pending to true immediately when entering the screen
  //     fetchUserData();
  //     fetchTokenAndData();

  //     return () => {
  //       //setQueryset([]); // Reset queryset to avoid stale data
  //       setCurrentPage(1); // Reset pagination
  //       setEndReached(false); // Ensure endReached is reset for new focus
  //     };
  //   }, [])
  // );




useFocusEffect(
  useCallback(() => {
    let interval;
    setIsPending(true);
    setLoadingTime(0);

    // start timer
    interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
    }, 1000);

    fetchUserData();
    fetchTokenAndData();

    return () => {
      setCurrentPage(1);
      setEndReached(false);
      clearInterval(interval);
      setLoadingTime(0);
    };
  }, [])
);


const [JumlaYaWote, setJumlaYaWote] = useState(0);

const getItems = (token) => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setIsPending(false);
    return;
  } else {
    setIsLoading(true);
    //console.log('USERTOKEN', userToken);
    //setPending(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllDukaLakoView/?page=${current_page}&page_size=500`
    // console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Add the Authorization header here
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset && data.queryset.length > 0) {
          setQueryset(data.queryset);
           setJumlaYaWote(data.JumlaYaWote); // Set the total amount

        
        
          setIsLoading(false);
          setLoading(false);
          setCurrentPage(current_page + 1);
          setIsPending(false);

          // console.log("NEW CRRRENT", current_page);
          console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setIsPending(false);
          console.log("Error fetching data");;
        }
      });
  }
};








 const renderLoader = () => {
    return (
      isLoading ?
        <View style={globalStyles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  // useEffect(() => {
  //   setLoading(true)
  //   getItems();
  // }, []);




const removeUserSubmittedData = async (postId) => {
  setIsPending(true);
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("postId", postId);
    try {
       await axios.delete(EndPoint + `/DeleteKumbushoLaChanjoByUserItsSelfView/${postId}/delete/`, {
      //await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
       setQueryset(queryset.filter((item) => item.id !== postId));
      setIsPending(false);

      showAlertFunction('Umefanikiwa kufuta kumbusho');
      navigation.navigate('Historia Za Kumbusho Za Ratiba Ya Chanjo');  // Navigate back to the previous screen
    

    } catch (error) {
       setIsPending(false);
      showAlertFunction('Imeshindikana kufuta kumbusho');
     
      //console.log(error);
    }
  };





  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };




//-------------NI KWA AJILI YA KUEXPAND TEXT-----------

const [textHeight, setTextHeight] = useState({});
const [lineLimit, setLineLimit] = useState(3); // Number of lines to limit

const handleTextLayout = (itemId, event) => {
  const { height } = event.nativeEvent.layout;
  const lineHeight = 18; // Assuming a line height of 18 (you can adjust this based on your styling)
  const maxHeight = lineHeight * lineLimit; // Calculate the max height for 3 lines

  if (height > maxHeight) {
    setTextHeight(prev => ({ ...prev, [itemId]: height }));
  } else {
    setTextHeight(prev => ({ ...prev, [itemId]: 0 })); // No expansion needed if height is less than max
  }
};


   //const [isExpanded, setIsExpanded] = useState(false); // State to manage text expansion
const [expandedItems, setExpandedItems] = useState({}); // State to manage text expansion

  const toggleExpanded = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId], // Toggle the expanded state for the clicked item
    }));
  };

 

//---kwaajili ya kufilter data based on Category-------------
const [selectedCategory, setSelectedCategory] = useState('all');

const fetchProductsByCategory = async (categoryId) => {
  setIsPending(true);
  try {
    const token = await AsyncStorage.getItem('userToken');
    let url = `${EndPoint}/FilterDukaLakoCategoryView/?page=1&page_size=500`;

    if (categoryId !== 'all') {
      url += `&status_id=${categoryId}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Token ${token}` },
    });
    const data = await res.json();
    setQueryset(data.queryset || []);
    setIsPending(false);
  } catch (error) {
    console.error(error);
    setIsPending(false);
  }
};

// Component ya category button
const CategoryButton = ({ title, onPress, isActive }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: isActive ? '#71b280' : '#e0e0e0',
      borderRadius: 20,
      marginRight: 10,
    }}
  >
    <Text style={{ color: isActive ? 'white' : 'black', fontFamily: 'Medium' }}>
      {title}
    </Text>
  </TouchableOpacity>
);




const CartCard = ({item, index}) => {
  
 //mwanzo wa search
   if (input === ""){


  return (

      
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={[globalStyles.UserInfoContainer,{
              padding:10,
            }]}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}

        
             
             {/*mwanzo wa right info*/}
           <View style={[
            globalStyles.UserInfoRightContainer,
            {
              width:'75%',
            }
            ]
          }>
           {item.username && (
             <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:0,
                      padding:10,
                    }

                    ]}

                 >{item.Title}</Text>


      
               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaPost && ( 
                  <Image

                  style={[globalStyles.AppItemImageHomeScreen,{
                    paddingHorizontal:10,
                  }]}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaPost
                    }}
                      
                      >
                  </Image>
                 
                )}
               </View>








  {item.Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'white',
                fontFamily:'Light',
               }}
               //numberOfLines={isExpanded ? 0 : 3}
                numberOfLines={expandedItems[item.id] ? undefined : 3}
          onLayout={(event) => handleTextLayout(item.id, event)}
               >
                 {item.Maelezo}
               </Text>
                {textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'white',
                      //color:textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] ? 'white' : 'green',
                    }

                    ]}>Read more -></Text>
                </TouchableOpacity>
              )}
              {expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'red',
                    }

                    ]}> Close</Text>
                </TouchableOpacity>
              )}
                 
               </TouchableOpacity>
               )}


                  <TouchableOpacity 

                  style={[globalStyles.AppItemButtonHomeScreen,
                    {
                      width:'90%',
                    //padding:5,
                   // borderRadius:6,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    padding:10,
                    }


                    ]}

                 
                >
            {/*mwanzo wa view ya left*/}
              <TouchableOpacity 

             onPress={() => {
           navigation.navigate('View Product', item);    
        }}


        

         >
           <View style={globalStyles.LeftBtnContainer}>
          {/*  <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>*/}
            <FontAwesome name='eye' 
            size={20}
            color="black" 
            style={[globalStyles.AppItemButtonTextHomeScreen,
              {
                backgroundColor:'blue',
                color:'white'
              }

              ]}
            
       />
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}



           {/*mwanzo wa view ya comment*/}
         <TouchableOpacity 
          onPress={() => navigation.navigate('All Chatting Screen', item)}
          >
         <View style={[globalStyles.RightBtnContainer,
          {
            backgroundColor:'green',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:8,
            paddingHorizontal:10,
            borderRadius:8,
          }

          ]}>
         <View>
          {/* <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> 4
         </Text>*/}
         <Text 
          style={{
            color:'white',
            marginRight:10,
          }}
        >{item.comment_count}</Text>
         </View>
        
        <View>
           <FontAwesome name='comment-o' 
      size={20}
      color="white" 
            
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya comment*/}


      
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           

           )

    // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if (item.Title.toLowerCase().includes(input.toLowerCase())) {

  return (

      
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={[globalStyles.UserInfoContainer,{
              padding:10,
            }]}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}

        
             
             {/*mwanzo wa right info*/}
           <View style={[
            globalStyles.UserInfoRightContainer,
            {
              width:'75%',
            }
            ]
          }>
           {item.username && (
             <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:0,
                      padding:10,
                    }

                    ]}

                 >{item.Title}</Text>


      
               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaPost && ( 
                  <Image

                  style={[globalStyles.AppItemImageHomeScreen,{
                    paddingHorizontal:10,
                  }]}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaPost
                    }}
                      
                      >
                  </Image>
                 
                )}
               </View>








  {item.Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'white',
                fontFamily:'Light',
               }}
               //numberOfLines={isExpanded ? 0 : 3}
                numberOfLines={expandedItems[item.id] ? undefined : 3}
          onLayout={(event) => handleTextLayout(item.id, event)}
               >
                 {item.Maelezo}
               </Text>
                {textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'white',
                      //color:textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] ? 'white' : 'green',
                    }

                    ]}>Read more -></Text>
                </TouchableOpacity>
              )}
              {expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'red',
                    }

                    ]}> Close</Text>
                </TouchableOpacity>
              )}
                 
               </TouchableOpacity>
               )}


                  <TouchableOpacity 

                  style={[globalStyles.AppItemButtonHomeScreen,
                    {
                      width:'90%',
                    //padding:5,
                   // borderRadius:6,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    padding:10,
                    }


                    ]}

                 
                >
            {/*mwanzo wa view ya left*/}
              <TouchableOpacity 

             onPress={() => {
           navigation.navigate('View Product', item);    
        }}


        

         >
           <View style={globalStyles.LeftBtnContainer}>
          {/*  <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>*/}
            <FontAwesome name='eye' 
            size={20}
            color="black" 
            style={[globalStyles.AppItemButtonTextHomeScreen,
              {
                backgroundColor:'blue',
                color:'white'
              }

              ]}
            
       />
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}



           {/*mwanzo wa view ya comment*/}
         <TouchableOpacity 
          onPress={() => navigation.navigate('All Chatting Screen', item)}
          >
         <View style={[globalStyles.RightBtnContainer,
          {
            backgroundColor:'green',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:8,
            paddingHorizontal:10,
            borderRadius:8,
          }

          ]}>
         <View>
          {/* <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> 4
         </Text>*/}
         <Text 
          style={{
            color:'white',
            marginRight:10,
          }}
        >{item.comment_count}</Text>
         </View>
        
        <View>
           <FontAwesome name='comment-o' 
      size={20}
      color="white" 
            
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya comment*/}


      
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           

           )




 // hili bano la chini ni la if ya pili mwisho
  }


}
  
return (

    <>{!fontsLoaded ? (<View/>):(


   

<LinearGradient
  colors={['#134e5e', '#71b280']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={globalStyles.container}
>
     



  <Header title="Historia Zako"/>

      





   {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Loading data</Text>
      <Text style={globalStyles.loaderCounter}> please wait...</Text>
    </View>
  </View>
)}




 <Text
style={[globalStyles.AppChaguaHudumaTextHomeScreen,{
  color:'white',
  fontFamily:'Bold',
}]}  

>TANZANIA WOMEN CHAMBER OF COMMERCE</Text>


 <Text
style={[globalStyles.AppChaguaHudumaTextHomeScreen,{
  color:'wheat',
  fontFamily:"Medium",
}]}  

>For empowering women in business</Text>







 <View style={globalStyles.searchbarOtherPages}>
            <View style={globalStyles.searchbarIconContainerOtherPages}>
              <Ionicons
                name="search-outline"
                size={25}
                color={COLORS.black}
                style={globalStyles.AppIConHomeScreenOtherPages}
              />
            </View>
            <View style={globalStyles.searchbarInputContainerOtherPages}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="product name"
                placeholderTextColor="black"
                style={globalStyles.AppInputHomeScreenOtherPages}
              />
            </View>
          </View>



{/* Categories List */}
<View style={{ marginVertical: 10, marginHorizontal: 20 }}>
  <FlatList
    data={[{ id: 'all', Category: 'All' }, ...Status]}
    keyExtractor={(item) => item.id.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
      <CategoryButton
        title={item.Category}
        isActive={selectedCategory === item.id}
        onPress={() => {
          setSelectedCategory(item.id);
          fetchProductsByCategory(item.id);
        }}
      />
    )}
  />
</View>

  
   {queryset && queryset.length > 0 ? (

    <>
 {setLoading===true?(<ActivityIndicator/>):(
      <>
      
       <FlatList
        data={queryset}
        renderItem={CartCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

        ListFooterComponent={renderLoader}
        onEndReached={getItems}
        onEndReachedThreshold={0.5}
      />


      </>
      )}
       


</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={[globalStyles.noitemText,{
    color:'white',
  }]}>There is no any post is added !!
  </Text>


  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImageHomePage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>




</View>

  )} 







{/*mwanzo kwaajili ya kupress order*/}









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
                    <Image source={require('../assets/icon.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>AgroTm</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />




















     </LinearGradient> 


 

    )}</>
  );
};

export default GetAllProducts;

const styles = StyleSheet.create({});
