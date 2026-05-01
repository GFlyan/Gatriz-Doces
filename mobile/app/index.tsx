import { View } from "react-native";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isSuccessResponse
} from '@react-native-google-signin/google-signin';

import { supabase } from '../utils/supabase';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function Index() {
  const [authenticated, setAuthenticated] = useState<string>("none");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const response = await GoogleSignin.signIn()
          if (isSuccessResponse(response)) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.data.idToken,
            })
            //console.log(error, data)
            const user = data?.user;
            if(user === null || undefined) throw new Error("User data is null or undefined");
            setUserName(user.user_metadata.name);
            setUserEmail(user.email?user.email:"");
            setUserProfileImageUrl(user.user_metadata.avatar_url);
            setAuthenticated("accepted");
          }
        } catch (error: any) {
          if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          } else if (error.code === statusCodes.NULL_PRESENTER) {
          } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          } else {
            // some other error happened
          }
          setAuthenticated("denied");
        }
      }}
    />
    {authenticated === "accepted" && <Redirect href={{
                                              pathname:"/authenticated",
                                              params: {
                                                        userName: userName,
                                                        userEmail: userEmail,
                                                        userProfileImageUrl: userProfileImageUrl
                                                      },
                                            }}/>}
    {authenticated === "denied" && <Redirect href="/error"/>}
    </View>
  );
}
