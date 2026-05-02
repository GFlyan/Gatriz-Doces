import { View, Text, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { UserServices } from "@/services/userServices";
import Box from "../components/box";

type Params = {
  userId: string,
  userName: string,
  userEmail: string,
  userProfileImageUrl: string;
};

export default function Auhtenticated() {
  const { userId, userName, userProfileImageUrl } = useLocalSearchParams<Params>();  

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sequence, setSequence] = useState<number[]>();
  const user = new UserServices(userId);

  async function connect() {
    setLoading(true);
    try {
      const userPurchaseProgress = await user.getUserPurchaseProgress(); 
      const notRescuedUserAwards = await user.getNotRescuedUserAwards();
      const rescuedUserAwards = await user.getRescuedUserAwards();
      setSequence([userPurchaseProgress, notRescuedUserAwards, rescuedUserAwards]);
    } catch(error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    connect();
  }, [])

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const titles: string[] = ["Consumo", "Brindes Acumulados", "Brindes Resgatados"];

  function userPurchaseProgressText(userPurchaseProgress: number): string {
    const rest = 10-userPurchaseProgress!;
    return `${rest === 1 ? `Falta ${rest} docinho` : `Faltam ${rest} docinhos`} para você ganhar um brinde!`
  }

  function notRescuedUserAwardsText(notRescuedUserAwards: number): string {
    return notRescuedUserAwards ? `Você possui ${notRescuedUserAwards} ${notRescuedUserAwards === 1 ? 'brinde acumulado' : 'brindes acumulados'}!` : 'Você não possui nenhum brinde acumulado.' 
  }

  function rescuedUserAwardsText(rescuedUserAwards: number): string {
    return rescuedUserAwards ? `Você já resgatou ${rescuedUserAwards} ${rescuedUserAwards === 1 ? 'brinde' : 'brindes'}!` : 'Você ainda não resgatou nenhum brinde.' 
  }

  return (
    <>
      {error ? 
      <Redirect href="/error"/>: 
      <View style={{backgroundColor: "#CD9D86", height: "100%"}}>
        {loading ? 
        <View style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Animated.Image source={require('../assets/images/logo-gatriz.png')} style={{width: 150, height: 150, transform: [{ scale }]}} />
        </View>:
        <>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", padding: 13, paddingTop: 30, gap: 12.5, backgroundColor: "#FAA471",  elevation: 5, width: '100%'}}>
            <Image source={userProfileImageUrl} style={{ width: 40, height: 40, borderRadius: 999 }}/>
            <Text style={{fontSize: 20, color: "white", fontFamily: 'DynaPuff_400Regular', overflow: 'hidden', width: '80%'}} numberOfLines={1} ellipsizeMode="tail">{userName}</Text>
          </View>
        
          {sequence &&
            <View style={{margin:20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 17}}>
              {sequence.map((item, index)=>(
                <Box key={index} title={titles[index]} value={item} text={!index?userPurchaseProgressText(item) : (index === 1 ? notRescuedUserAwardsText(item) : rescuedUserAwardsText(item))} />
              ))}
            </View>
          }
        </>}
        </View>
      }
    </>
  );
}