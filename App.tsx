import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [number , setNumber] = useState(0)



  // useEffect(() => {
  //   link = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number
  //   fetch(link)
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
      
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
    console.log('Logs every minute');

    link = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + number

    console.log(link)

    setNumber(number + 1)
    console.log(number)

    fetch(link)
      .then((response) => response.json())
      .then((json) => {
      console.log(data)
      setData([ ...data , json ])
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }, 2000);
    return () => {
      clearInterval(interval)

    }; 
  }, [ number ])
  return (


    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        
          <FlatList
            data={data.hits}
            keyExtractor={({ created_at }, index) => created_at}
            renderItem={({ item }) => (
              <Text style ={{ fontSize : 20 }}>{item.created_at + ' => ' + item.title}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};