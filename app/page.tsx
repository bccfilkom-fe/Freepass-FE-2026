import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";

type TCanteen = {
	name: string;
	imgUrl: string;
	rating: number;
	status: "OPEN" | "CLOSED";
	description: string;
};

const CanteenCard = ({
	canteen,
	className,
}: {
	canteen: TCanteen;
	className?: string;
}) => {
	const StatusBadge = () => {
		if (canteen.status === "OPEN") {
			return <Badge variant={"default"}>Open</Badge>;
		} else {
			return <Badge variant={"secondary"}>Closed</Badge>;
		}
	};

	return (
		<Card
			className={cn(
				"hover:shadow-lg transition-shadow duration-300 ease-in-out",
				className,
			)}
		>
			<div className="aspect-[4/3] relative min-h-[200px]">
				<Image
					src={canteen.imgUrl}
					className="object-fit"
					alt="canteen icon"
					style={{
						filter: canteen.status === "CLOSED" ? "grayscale(100%)" : "none",
					}}
					fill
				/>
			</div>
			<CardHeader>
				<CardTitle>
					<h3>{canteen.name}</h3>
				</CardTitle>
				<CardDescription>
					<p>{canteen.description}</p>
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardFooter className="gap-4">
				<StatusBadge />
				<p>{canteen.rating}⭐</p>
			</CardFooter>
		</Card>
	);
};

const mockCanteens: TCanteen[] = [
	{
		name: "Canteen Foo",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFmfQySJx5a258fgxg_JPzHyilvaVuHeQcA&s",
		description: "A popular canteen known for its delicious food.",
		rating: 4.5,
		status: "OPEN",
	},
	{
		name: "Canteen Bar",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFmfQySJx5a258fgxg_JPzHyilvaVuHeQcA&s",
		description: "Great atmosphere and tasty meals.",
		rating: 4.2,
		status: "CLOSED",
	},
	{
		name: "Canteen Baz",
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFmfQySJx5a258fgxg_JPzHyilvaVuHeQcA&s",
		description: "Affordable and quick service.",
		rating: 4.0,
		status: "CLOSED",
	},
];

type TCartOverview = {
	totalItems: number;
};

const CartButton = (props: { cart: TCartOverview; className?: string }) => {
	const { cart, className } = props;
	return (
		<div
			className={cn(
				"rounded-full bg-primary p-2 max-w-[40%] min-w-[200px]",
				className,
			)}
		>
			<ShoppingBasket />
		</div>
	);
};

export default function Page() {
	return (
		<>
			<div className="py-2 w-full">
				<div className="container max-w-[90%] mx-auto flex flex-col py-4">
					<h1 className="text-xl">
						<span className="font-bold">Halo,</span>
						&nbsp;Dudung!
					</h1>
					<p className="text-muted-foreground mt-2">
						Mau makan apa nih hari ini?
					</p>
				</div>
			</div>
			<main className="w-screen">
				<div>
					<CanteenGrid className="bg-muted m-4 rounded-[2rem]" />
				</div>
			</main>
			<Navbar />
		</>
	);
}

function CanteenGrid({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4",
				className,
			)}
		>
			{mockCanteens.map((canteen) => (
				<CanteenCard key={canteen.name} canteen={canteen} />
			))}
		</div>
	);
}
