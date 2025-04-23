import MainLayout from "@/app/layouts/main-layout";
import CoinDetailsPage from "@/pages/coin-details";
import HomePage from "@/pages/home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path="coins/:id" element={<CoinDetailsPage />} />
				</Route>
				<Route path='*' element={<Navigate to='/' replace />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;