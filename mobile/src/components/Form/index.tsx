import { ArrowLeft } from "phosphor-react-native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import { styles } from "./styles";
import * as FileSystem from "expo-file-system";

interface Props {
	feedbackType: FeedbackType
	onFeedbackCancel: () => void
	onFeedbackSent: () => void
}

export function Form( {feedbackType,onFeedbackCancel,onFeedbackSent}: Props) {
	const [ screenshot, setScreenshot ] = useState<string|null>(null)
	const [ isSendindFeedback, setIsSendingFeedback ] = useState(false)
	const [ comment, setComment ] = useState("")
	const feedbackTypeInfo = feedbackTypes[feedbackType]

	function handleScreenshot(){
		captureScreen({
			format: "png",
			quality: 0.8,
		})
		.then(uri => setScreenshot(uri))
		.catch(error => console.log(error))
	}

	function handleRemoveScreenshot(){
		setScreenshot(null)
	}

	async function handleSubmitFeedback(){
		if(isSendindFeedback){
			return
		}
		setIsSendingFeedback(true)
		const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

		try{
			await api.post('/feedbacks', {
				type: feedbackType,
				screenshot: `data:image/png;base64, ${screenshotBase64}`,
				comment,
			})
			onFeedbackSent()
		}catch(error){
			console.log(error)
			setIsSendingFeedback(false)
		}
	}

	return(
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onFeedbackCancel}>
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
				autoCorrect={false}
				onChangeText={setComment}
			/>
			<View style={styles.footer}>
				<ScreenshotButton
					screenshot={screenshot}
					onTakeShoot={handleScreenshot}
					onRemoveShoot={handleRemoveScreenshot}
				/>
				<Button
					isLoading={isSendindFeedback}
					onPress={handleSubmitFeedback}
				/>
			</View>
		</View>
	)
}
