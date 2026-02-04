import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, Search } from "lucide-react";
import Link from "next/link";

/**
 * Custom 404 Not Found Page
 * Displayed when a route doesn't exist
 */
export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
			<Card className="max-w-md w-full shadow-lg">
				<CardHeader className="text-center space-y-4 pb-4">
					<div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
						<AlertCircle className="w-8 h-8 text-destructive" />
					</div>
					<div className="space-y-2">
						<CardTitle className="text-4xl font-bold">404</CardTitle>
						<CardTitle className="text-xl">Page Not Found</CardTitle>
					</div>
					<CardDescription className="text-base">
						Oops! The page you're looking for doesn't exist. It might have been
						moved or deleted.
					</CardDescription>
				</CardHeader>
            <CardFooter className="flex flex-col sm:flex-row pt-2">
					<Button asChild variant="outline" className="flex-1" size="lg">
						<Link href="/canteens" className="gap-2">
							<Search className="w-4 h-4" />
							Browse Canteens
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
