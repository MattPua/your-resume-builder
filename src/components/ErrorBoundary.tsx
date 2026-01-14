import { Component, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onReset?: () => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
		if (this.props.onReset) {
			this.props.onReset();
		}
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
					<div className="flex items-start gap-3">
						<AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
						<div className="flex-1 min-w-0">
							<h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
								Something went wrong
							</h3>
							<p className="text-sm text-red-700 dark:text-red-300 mb-3">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
							<Button
								onClick={this.handleReset}
								size="sm"
								variant="outline"
								className="text-red-700 border-red-300 hover:bg-red-100 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-900/40"
							>
								Try again
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
