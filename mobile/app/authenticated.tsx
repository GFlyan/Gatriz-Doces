import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import Box from "../components/box";

type Params = {
  userName: string;
  userEmail: string;
  userProfileImageUrl: string;
};

type Info = {
  title: string,
  value: number,
  text: string;
}

const info: Info[] = [ 
  {title:"Consumo", value: 6, text: "Faltam 4 docinhos para você ganhar um brinde!"},
  {title:"Brindes Acumulados", value: 3, text: "Você possui 3 brindes acumulados!"},
  {title:"Brindes Resgatados", value: 5, text: "Você já resgatou 5 brindes!"}
]

export default function Auhtenticated() {
  const { userName, userEmail, userProfileImageUrl } = useLocalSearchParams<Params>();  
  console.log(userName, userEmail, userProfileImageUrl);
  return (
    <View style={{backgroundColor: "#CD9D86", height: "100%"}}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: 10, paddingTop: 25, gap: 12.5, backgroundColor: "#FAA471",  elevation: 5}}>
        <Image source={userProfileImageUrl} style={{ width: 40, height: 40, borderRadius: 999 }}/>
        <Text style={{fontSize: 16, color: "white"}}>{userName}</Text>
      </View>
      
      <View style={{marginHorizontal: 20, marginTop: 25, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 25}}>
        {info.map((item, index)=>(
          <Box key={index} title={item.title} value={item.value} text={item.text} />
        ))}

      </View>
    </View>
  );
}