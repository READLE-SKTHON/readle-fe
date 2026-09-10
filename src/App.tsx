import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import FooterLayout from "@/layouts/FooterLayout";

import SplashPage from "./pages/auth/SplashPage";

import GamePage from "@/pages/game/GamePage";
import HomePage from "@/pages/home/HomePage";
import MyPage from "@/pages/my/MyPage";
import RankingPage from "@/pages/ranking/RankingPage";
import ReviewPage from "@/pages/review/ReviewPage";

import SoloIntroPage from "@/pages/game/SoloGame/SoloIntroPage";
import SoloGamePage from "@/pages/game/SoloGame/SoloGamePage";
import SoloReadingPage from "./pages/game/SoloGame/SoloReadingPage";
import FriendGamePage from "@/pages/game/FriendGame/FriendGamePage";
import SoloResultPage from "@/pages/game/SoloGame/SoloResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* 푸터 필요한 페이지 */}
          <Route element={<FooterLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/my" element={<MyPage />} />
          </Route>
          {/* 푸터 필요 없는 페이지는 나중에 여기아래에 */}
          <Route path="/" element={<SplashPage />} />

          <Route path="/game/solo" element={<SoloIntroPage />} />
          <Route path="/game/solo/reading" element={<SoloReadingPage />} />
          <Route path="/game/solo/play" element={<SoloGamePage />} />
          <Route path="/game/solo/result" element={<SoloResultPage />} />

          <Route path="/game/friend" element={<FriendGamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
