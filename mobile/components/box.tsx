import { View, Text } from "react-native";

type BoxProps = {
  title: string,
  value: number,
  text: string;
}

export default function Box({ title, value, text }: BoxProps) {
    return(
        <View style={{width: "100%", display: "flex", flexDirection: "column", gap: 5}}>
            <Text style={{color: "white"}}>{title}</Text>
            <View style={{ display: "flex", flexDirection:"row", alignItems: "center", width: "100%", height: 125, backgroundColor: "#FAA471", borderRadius: 12.5, overflow: "hidden", gap:12.5, paddingHorizontal: 12.5,  elevation: 5}}>
                <View style ={{ width: 100, height: 100, borderRadius: 10, backgroundColor: "#54EFDD", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: "white", fontSize: 35}}>{value}</Text>
                </View>
                <Text style={{color: "white", width: "65%"}}>{text} </Text>
            </View>
        </View>
    ); 

}