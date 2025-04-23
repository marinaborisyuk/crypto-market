import Header from "@/widgets/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;