import React, { useState, useEffect } from 'react';
import { View,Platform, SafeAreaView,Modal,Pressable, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import { globalStyles } from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
import MinorHeader from '../Header/MinorHeader';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AddNewProduct = ({ navigation }) => {

  const [loadingTime, setLoadingTime] = useState(0);



  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



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




const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);

const [OngezaPichaOpen, setOngezaPichaOpen] = useState(false);
const [OngezaPichaClose, setOngezaPichaClose] = useState(false);





const [PichaYaPost, setPichaYaPost] = useState(null);
const [PichaYaPost2, setPichaYaPost2] = useState(null);
const [PichaYaPost3, setPichaYaPost3] = useState(null);
const [PichaYaPost4, setPichaYaPost4] = useState(null);
const [PichaYaPost5, setPichaYaPost5] = useState(null);
    


//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaPost(result.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 1" ,result);
  };


 const pickImage2 = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaPost2(result2.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
     //console.log("RESULT 2" ,result2);
  };


   const pickImage3 = async () => {
    let result3 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaPost3(result3.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 3" ,result3);
  };




 const pickImage4 = async () => {
    let result4 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaPost4(result4.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
     //console.log("RESULT 4" ,result4);
  };




 const pickImage5 = async () => {
    let result5 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaPost5(result5.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 5" ,result5);
  };

  //MWISHO WA PICK IMAGE FROM THE PHONE







const [Title, setTitle] = useState('');
const [Maelezo, setMaelezo] = useState('');

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  //const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
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
         //setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  console.log("PichaYaPost", PichaYaPost);

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye uwekaji wa taarifa mpya');
      setIsLoading(false);
    }
  };
const handleUpdate = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
        const formData = new FormData();
        
        if (Title) {
            formData.append('Title', Title);
        } else {
            showAlertFunction('Please enter post title');
            setIsLoading(false);
            return;
        }

        if (Maelezo) {
            formData.append('Maelezo', Maelezo);
        } else {
            showAlertFunction('Please enter post description ?');
            setIsLoading(false);
            return;
        }

        // Ongeza picha kwenye `FormData` tu kama imechaguliwa
        if (PichaYaPost) {
            formData.append('PichaYaPost', {
                uri: PichaYaPost,
                name: 'PichaYaPost.jpg',
                type: 'image/jpeg',
            });
        }



 if (selectedStatus) {
            formData.append('Status', selectedStatus);
        } else {
            showAlertFunction('Please select product category.');
            setIsLoading(false);
            return;
        }


     
      

        axios.post(EndPoint + '/AddDukaLakoView/', formData, {
            headers: {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            setIsLoading(false);
            showAlertFunction("Umefanikiwa Kutuma posti");
            setdisplayContentsState(true);
            //console.log("Well");
            setTitle('');
            setMaelezo('');
            setPichaYaPost('');
            



        }).catch(error => {
            setIsLoading(false);
            setdisplayContentsState(false);
            console.log("ERRORR", error);
            handleErrorMessage(error);
        });
    }
};






 return (


    <>{!fontsLoaded ? (<View/>):(

     


<LinearGradient
  colors={['#134e5e', '#71b280']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={globalStyles.container}
>
   
      
{isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Adding post</Text>
      <Text style={globalStyles.loaderCounter2}>please wait....</Text>
    </View>
  </View>
)}




         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Add New Post</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>


      <Text style={styles.label}>Post Title</Text>
      <TextInput value={Title} onChangeText={setTitle} 
      placeholder="title" 
      placeholderTextColor="wheat"
      style={styles.input} />




  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 0 ,
  marginBottom:30,
 }}>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'black',
            marginHorizontal:0,
            width:'100%',
          }

          ]}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Category
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedStatus}
    onValueChange={(itemValue) => setSelectedStatus(itemValue)}
    >
        {Status.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.Category} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}





  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Choose product image</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>
    {PichaYaPost && (
<Image source={{ uri: PichaYaPost }} style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}
</View>




{/*mwisho wa picha yako*/}





 

{/*mwanzo  wa field*/}
                <View style={{

                 marginTop:20 ,
                // backgroundColor:'red',

               }}>
        <Text style={{
         //fontSize:16,
          //marginLeft:20,
          color:'white',
           }}>
         Post description</Text>
        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
            <TextInput 
            style={globalStyles.ProjectBodyInputIcon}  
            placeholder='description'
            placeholderTextColor={COLORS.white}
            value={Maelezo}
        onChangeText={setMaelezo}
                       
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    
                </View>
              {/*mwisho wa field*/}




  

      <TouchableOpacity onPress={handleUpdate} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>




         <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
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
      

<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>



    </ScrollView>


 </LinearGradient> 









     )}</>





  );












};

export default AddNewProduct;

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { 
    fontWeight: 'bold',
     marginTop: 12 ,
     marginBottom:10,
     color:'white',
   },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
    borderRadius: 5,
    color:'wheat',
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 3,
    color:'white',
    //backgroundColor:'white',
  },
  genderButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedGender: {
    backgroundColor: '#aaa',
  },
  submitButton: {
    backgroundColor: '#015d68',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },


  dateRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
dateInput: {
  flex: 1,
  marginRight: 10,
  //color:'white',
},
dateTextreg:{
  color:'white',
},

});
