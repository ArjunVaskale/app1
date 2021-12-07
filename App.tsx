import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


export type Props = {

  data: string;
  isLoading: boolean;
  link: string;
  number: number;
  text: string;
  onChangeText: (text: string) => void;


};

function HomeScreen({navigation}) {

  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [inputText, setInputText] = useState()
  const [number, setNumber] = useState(0)

  const onChangeTextFun = (t) => {
    let text = t.toLowerCase()
    let fullData = data
    let filterName = fullData.filter((temp) => {
      return temp.title.toLowerCase().match(text)
    })
    setData(filterName)
    setInputText(t)
    console.log(filterName[0])
    if (inputText.length == 0) {
      setData(fullData)

    }
  }
  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number)
      .then((response) => response.json())
      .then((val) => {
        setData(val.hits)
        setLoading(false)
        setNumber(number + 1)
        console.log('values are ' + val.hits[0].title)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
      fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number)
        .then((response) => response.json())
        .then((val) => {
          setData([...data, ...val.hits])
          console.log('values are ' + val.hits[0].title)
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
      {isLoading ? <Text>Loading...</Text> :
        (


          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

            <TextInput style={{ borderWidth: 2, marginTop: 50, height: 70, width: 400, padding: 10 }}
              placeholder="Type Here..."
              onChangeText={onChangeTextFun}
            />

            <FlatList
              data={data}
              // keyExtractor={({ created_at }, index) => created_at}
              renderItem={({ item }) => (
                <View>
                  <TouchableHighlight onPress={() => {navigation.navigate('Json',{ data : JSON.stringify({"Titla":item.title ,
                                                                                                          "URL":item.url,
                                                                                                          "Created Time":item.created_at,
                                                                                                          "Tags":item._tags,
                                                                                                          "Author":item.author
                                                                                                          }) })}}>
                  <Text style={styles.item}>Title:-{item.title}<br/>
                                            URL:-{item.url}<br />
                                            Created Time:-{item.created_at}<br />
                                            Tags:-{item._tags}<br />
                                            Author:-{item.author}<br />

                                            
                  </Text>
                </TouchableHighlight>
                </View>

              )}
            />
          </View>
        )}
      <Text>hello dudu</Text>

    </View>
  );
};


function JsonScreen({route , navigation}) {
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
export default App;

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


