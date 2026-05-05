import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Error() {
  return (
    <View style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#CD9D86", padding: 10, gap:20}}>
      
      <Image source={require('../assets/images/logo-gatriz.png')} style={{width: 150, height: 150}}/>
      <View style={{width: "100%", padding: 35, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAA471", borderRadius: 25, gap: 35, elevation: 5}}>
        <View>
          <Text style={{fontFamily: 'DynaPuff_400Regular', fontSize: 20, color: "white"}}>Lamentemos, atualmente estamos enfrentando alguns erros... </Text>
          <Text style={{fontFamily: 'DynaPuff_400Regular', fontSize: 20, color: "white", marginTop: 20}}>Entre em contato conosco!</Text>
        </View>
        <Link href='https://wa.me/556196947048'>
          <Image source={require('../assets/images/logo-whatsapp.avif')} style={{width: 50, height: 50, borderRadius: 999}}/>
        </Link>
      </View>
    </View>
  );
}