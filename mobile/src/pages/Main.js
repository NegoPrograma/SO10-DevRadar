import React, {useEffect, useState} from 'react';
import { StyleSheet,Image, View,Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'
function Main({navigation}){
    const [devs,setDevs] = useState([]);
    const [currentRegion,setCurrentRegion] = useState(null);
    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync();

            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }
        loadInitialPosition();
    },[]);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;


        const response = await api.get("/search",{
            params:{
                latitude,
                longitude,
                techs:"React Native"
            }
        })
        setDevs(response.data);
    }


    if(!currentRegion){
        return null;
    }
    return( 
    <>
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{latitude:-22.8380035, longitude: -43.071016199999995}}>
         <Image style={styles.avatar} source={{uri: 'https://avatars0.githubusercontent.com/u/34663906?s=460&v=4'}}/>

         <Callout onPress={()=>{
             //navegação
             //mudando de página, com nome da página e outro parametro pra informação adicional
             navigation.navigate('Profile', {github_username: 'NegoPrograma'});

         }}>
            <View style={styles.callout}>
                <Text style={styles.devName}>Isaac de Souza</Text>
                <Text  style={styles.devBio}>20 anos. Estudante de Ciência da Computação na UFF e aspirante a desenvolvedor back-end. </Text>
                <Text  style={styles.devTechs}>Node.js, React, C#</Text>
            </View>
         </Callout>
        </Marker>
    </MapView>

    <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput} 
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        />

        <TouchableOpacity onPress={()=>{}}style={styles.loadButton}>

            <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
    </View>
    </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius:100,
        borderWidth: 4,
        borderColor: '#19aff1'
    },
    callout:{
        width:260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio:{
        color: '#666',
        marginTop:5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top:20,
        right:20,
        left:20,
        zIndex:5,
        //display: flex é o padrão.
        flexDirection: 'row'
    },
    searchInput:{
        flex:1,
        height:50,
        backgroundColor:'#fff',
        color: '#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowOffset: {
            width:4,
            height:4,
        },
        elevation: 2,
    },
    loadButton: {
        width:50,
        height:50,
        backgroundColor: '#8E4DFF',
        borderRadius:25,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:15
    }
})

export default Main;