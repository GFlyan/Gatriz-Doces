import { View, Text } from "react-native";

type BoxProps = {
  title: string,
  value: number,
  text: string;
}

export default function Box({ title, value, text }: BoxProps) {

    return(
        <View style={{width: "100%", display: "flex", flexDirection: "column", gap: 12}}>
            <Text style={{color: "white", fontSize: 20, fontFamily: 'DynaPuff_400Regular'}}>{title}</Text>
            <View style={{ display: "flex", flexDirection:"row", alignItems: "center", width: "100%", height: 120, backgroundColor: "#FAA471", borderRadius: 20, overflow: "hidden", gap:20, paddingHorizontal: 22,  elevation: 5}}>
                <View style ={{ width: 75, height: 75, borderRadius: 15, backgroundColor: "#54EFDD", display: "flex", alignItems: "center", justifyContent: "center", elevation: 5}}>
                    <Text style={{color: "white", fontSize: 35, fontFamily: 'DynaPuff_400Regular'}}>{value}</Text>
                </View>
                <Text style={{color: "white", width: "70%", fontSize: 17, fontFamily: 'DynaPuff_400Regular'}}>{text} </Text>
            </View>
        </View>
    ); 

}