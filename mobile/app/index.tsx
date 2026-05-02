import { Text, View, Pressable } from "react-native";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Image } from "expo-image";
import { GoogleSignin, statusCodes, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { supabase } from '../utils/supabase';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function Index() {

  const [authenticated, setAuthenticated] = useState<boolean>();
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CD9D86"
      }}
    >
      
      <Image source={require('../assets/images/logo-gatriz.png')} style={{width: 150, height: 150, marginBottom:40}} />
      <Text style={{fontFamily: "DynaPuff_400Regular", fontSize: 20, color: "white", marginBottom:15}}>Realizar Login</Text>
      
      <Pressable
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices()
            const response = await GoogleSignin.signIn()
            if (isSuccessResponse(response)) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.data.idToken,
              })
              const user = data?.user;
              if(user === null || undefined) throw new Error("User data is null or undefined");
              setUserId(user.id);
              setUserName(user.user_metadata.name);
              setUserEmail(user.email?user.email:"");
              setUserProfileImageUrl(user.user_metadata.avatar_url);
              setAuthenticated(true);
            }
          } catch (error: any) {
            setAuthenticated(false);
          }
        }}
      >
        <Image source={require('../assets/images/logo-google.png')} style={{width: 50, height: 50, borderRadius: 999}}></Image>
      </Pressable>
      {authenticated  ? 
        <Redirect href={{
                          pathname:"/authenticated",
                          params: {
                                    userId: userId,
                                    userName: userName,
                                    userEmail: userEmail,
                                    userProfileImageUrl: userProfileImageUrl
                                  },
                        }}/> 
        : authenticated === false && <Redirect href="/error"/>
      }
    </View>
  );

}
