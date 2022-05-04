import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from './Steps/FeedbackContentStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problem',
        image: {
            source: bugImageUrl,
            alt: 'Bug image'
        }
    },
    IDEA: {
        title: 'Idea',
        image: {
            source: ideaImageUrl,
            alt: 'Lamp image'
        }
    },
    OTHER: {
        title: 'Other',
        image: {
            source: thoughtImageUrl,
            alt: 'Thought image'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
	const [FeedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
	function handleRestartFeedback(){
		setFeedbackType(null)
	}

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
			
			{ !FeedbackType ? (
				<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
			) : (
				<FeedbackContentStep
					feedbackType={FeedbackType}
					onFeedbackRestartRequested={handleRestartFeedback}
				/>
			)
			}

			<footer className="text-xs text-neutral-400">
				Made with ♥ by vine
			</footer>
		</div>
	)
}