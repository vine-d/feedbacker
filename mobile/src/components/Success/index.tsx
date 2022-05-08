import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

export function Success(){
	return(
		<View style={styles.container}>
			<Image
				source={successImg}
				style={styles.title}
			/>
			<Text style={styles.title}>
				Thank you for your feedback
			</Text>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonTitle}>
					Send another feedback
				</Text>
			</TouchableOpacity>

			<Copyright/>
		</View>
	)
}
