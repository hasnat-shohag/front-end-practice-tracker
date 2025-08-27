import type { PopoverContentProps } from "@reactour/tour";
import type { FC, ReactNode } from "react";
import { Button } from "../ui/button";

interface TourCardProps extends PopoverContentProps {
	heading?: string;
	description: string | ReactNode;
	noInteractions?: boolean;
}

export const TourCard: FC<TourCardProps> = ({
	heading,
	description,
	setIsOpen,
	setCurrentStep,
	currentStep = 0,
	steps,
	noInteractions = false,
	...restProps
}) => {
	// const dispatch = useDispatch();

	const stepsLength = steps.length;

	const handleNext = () => {
		if (setCurrentStep) {
			if (stepsLength - 1 === currentStep) {
				setIsOpen?.(false);
			} else {
				setCurrentStep(currentStep + 1);
			}
		}
	};

	const handleSkip = () => {
		// dispatch(skipTour(true));
		setIsOpen?.(false);
	};

	return (
		<>
			<div className='flex items-center justify-between'>
				<h4 className='text-lg text-primary-800 font-semibold'>{heading}</h4>
			</div>
			<div className='mt-2'>{description}</div>

			<div className='mt-3 flex items-center gap-2 justify-center'>
				<Button onClick={handleSkip} variant='outline' size='sm'>
					Skip
				</Button>
				<div className='text-sm font-medium min-w-[50px] text-center'>
					{currentStep + 1 + "/" + stepsLength}
				</div>
				{!noInteractions && (
					<Button onClick={handleNext} className='shrink' size='sm'>
						{currentStep == stepsLength - 1 ? "Finish" : "Next"}
					</Button>
				)}
			</div>
		</>
	);
};
