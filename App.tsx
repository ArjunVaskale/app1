import React, { useEffect, useRef, useState,FC } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


function HomeScreen({navigation}:{navigation:any}) {

  const [data, setData] = useState<any>({})
  const [isLoading, setLoading] = useState(true)
  const [inputText, setInputText] = useState<string>("")
  const [number, setNumber] = useState(0)
  const [filterdata , setFilterData] = useState<any>()


  const onChangeTextFun = (t:string) => {
    let text = t.toLowerCase()
    if (text) {
      let filterName = data.filter((temp:any) => {
        console.log(temp.title , text)
        return JSON.stringify(temp).includes(text);
      })
      setFilterData(filterName)
    }else{
      setFilterData(data)
    }
  }

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number)
      .then((response) => response.json())
      .then((val) => {
        setData(val.hits)
        setFilterData(val.hits)
        setLoading(false)
        setNumber(number + 1)
        // console.log('values are ' + val.hits[0].title)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
      fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number)
        .then((response) => response.json())
        .then((val) => {
          setData([...data, ...val.hits] )
          setFilterData([...data, ...val.hits] )
          // console.log('values are ' + val.hits[0].title)
          setNumber(number + 1)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, 10000);
    return () => {
      clearInterval(interval)
    };
  }, [number])


  return (


    <View style={styles.container}>
      {isLoading ? <Text>Loading Data...</Text> :
        (


          <View style={{ flex:1 , flexDirection: 'column', justifyContent: 'center' , alignItems:'center' }}>

            <TextInput style={{ borderWidth: 2, margin:10 ,padding:10 , height: 50, width: 400 }}
              placeholder="Search"
              onChangeText={onChangeTextFun}
            />

            <FlatList
              data={filterdata}
              // keyExtractor={({ created_at }, index) => created_at}
              renderItem={({ item }) => (
                <View>
                  <TouchableHighlight onPress={() => {navigation.navigate('Json',
                                                { data : JSON.stringify({"Titla":item.title ,
                                                "URL":item.url,
                                                "Created Time":item.created_at,
                                                "Tags":item._tags,
                                                "Author":item.author
                                                }) })}}>
                  <Text style={styles.item}>Title:-{item.title}
                                            URL:-{item.url}
                                            Created Time:-{item.created_at}
                                            Tags:-{item._tags}
                                            Author:-{item.author}

                                            
                  </Text>
                  
                </TouchableHighlight>
                </View>

              )}
            />
          </View>
        )}

      

    </View>
  );
};


function JsonScreen({route , navigation}:{route:any , navigation:any}) {
   const { data } = route.params ;


  return (
    <View style={{flex:1 ,justifyContent:'center' , alignItems:'center' }}>
      <Text style={{backgroundColor:'skyblue' ,margin:5 , padding:10}}> JSON DATA VIEW </Text>
      <Text style={{backgroundColor:'lightblue' ,margin:5 , padding:10}}>{data}</Text>
    </View>
  )
}
const Stack = createNativeStackNavigator();

function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Json' component={JsonScreen}/>

          </Stack.Navigator>
        </NavigationContainer>
        );
}


export default withTheme(App);

        const styles = StyleSheet.create({
          container :{
          flex : 1 ,
        justifyContent : 'center' ,
        alignItems : 'center'
        },
        item :{
          backgroundColor:'lightblue',
        padding:20,
     
        marginVertical : 10,
        marginHorizontal:10
  }

})



  // useEffect(() => {
  //   link = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number
  //   fetch(link)
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
      
  // }, []);



  // const url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0'
  // const fetchdata = async() => {
  //    try{

  //      const response = await fetch(url);
  //      const json = await response.json();
  //      console.log(json)
  //      setData(json)


  //    }
  //    catch(error){
  //      console.log(error)
  //    }
  // }
  // fetchdata()\

  // temp.title.toLowerCase().match(text)


