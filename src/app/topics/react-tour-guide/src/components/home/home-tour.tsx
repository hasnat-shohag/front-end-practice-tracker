import { TourCard } from "@/components/tour-card";
import type { StepType } from "@reactour/tour";

interface TourDataProps {
	onFinishTour: () => void;
}

export const getHomeTourSteps = ({ onFinishTour }: TourDataProps) => {
	const steps: StepType[] = [
		{
			selector: "#deploy-button",
			content: (props) => {
				return (
					<TourCard
						heading={"deploy the project"}
						description={"Click the button below to deploy your project."}
						{...props}
					/>
				);
			},
			stepInteraction: false,
		},
		{
			selector: "#read-docs",
			content: (props) => {
				return (
					<TourCard
						heading={"Read the Docs"}
						description={"Read the documentation to learn more."}
						{...props}
					/>
				);
			},
			actionAfter: () => {
				onFinishTour();
				localStorage.setItem("knowledgebase-tour-completed", "true");
			},
		},
	];

	return steps;
};
