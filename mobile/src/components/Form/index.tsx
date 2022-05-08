import { ArrowLeft } from "phosphor-react-native";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";

interface Props {
	feedbackType: FeedbackType
}

export function Form( {feedbackType}: Props) {
	const feedbackTypeInfo = feedbackTypes[feedbackType]
	return(
		<View style={styles.container} >
			<View style={styles.header}>
				<TouchableOpacity>
					<ArrowLeft
						size={24}
						weight="bold"
						color={theme.colors.text_secondary}
					/>
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Image
						style={styles.image}
						source={feedbackTypeInfo.image}
					/>
					<Text style={styles.titleText}>
						{feedbackTypeInfo.title}
					</Text>

				</View>

			</View>
			<TextInput
				multiline
				style={styles.input}
				placeholder="Something is wrong? We want to fix it. Please let us know in details what is happening..."
				placeholderTextColor={theme.colors.text_secondary}
			/>
			<View style={styles.footer}>
				<ScreenshotButton
					screenshot={""}
					onTakeShoot={()=>{}}
					onRemoveShoot={()=>{}}
				/>
				<Button isLoading={false} />
			</View>
		</View>
	)
}
