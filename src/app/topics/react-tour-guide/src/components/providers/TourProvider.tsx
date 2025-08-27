"use client";
import { TourProvider as ReactTourProvider } from "@reactour/tour";
import type { ReactNode } from "react";

interface TourProviderProps {
	children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
	return (
		<ReactTourProvider
			steps={[]}
			showNavigation={false}
			showPrevNextButtons={false}
			showCloseButton={false}
			showBadge={false}
			disableDotsNavigation={true}
			className='tour-mask !p-1'
			ContentComponent={(props) => {
				const { steps, currentStep } = props;
				const content = steps[currentStep].content;
				return <>{typeof content === "function" ? content(props) : content}</>;
			}}
			styles={{
				popover: (base) => ({
					...base,
					"--reactour-accent": "#3982F4",
					borderRadius: "12px",
					boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
					padding: "0",
					backgroundColor: "white",
				}),
				maskArea: (base) => ({
					...base,
					rx: 8,
				}),
				badge: () => ({
					display: "none",
				}),
			}}
		>
			{children}
		</ReactTourProvider>
	);
};
