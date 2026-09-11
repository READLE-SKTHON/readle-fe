import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import FooterLayout from "@/layouts/FooterLayout";
import RoomLayout from "@/layouts/RoomLayout";

import SplashPage from "./pages/auth/SplashPage";
import LoginPage from "./pages/auth/LoginPage";

import GamePage from "@/pages/game/GamePage";
import HomePage from "@/pages/home/HomePage";
import MyPage from "@/pages/my/MyPage";
import RankingPage from "@/pages/ranking/RankingPage";
import ReviewPage from "@/pages/review/ReviewPage";
import ReviewTypePage from "@/pages/review/ReviewTypePage";
import ReviewPlayPage from "@/pages/review/ReviewPlayPage";
import ReviewResultPage from "@/pages/review/ReviewResultPage";

import SoloIntroPage from "@/pages/game/SoloGame/SoloIntroPage";
import SoloGamePage from "@/pages/game/SoloGame/SoloGamePage";
import SoloReadingPage from "./pages/game/SoloGame/SoloReadingPage";
import FriendGamePage from "@/pages/game/FriendGame/FriendGamePage";
import CreateRoomPage from "@/pages/game/FriendGame/CreateRoomPage";
import InviteRoomPage from "@/pages/game/FriendGame/InviteRoomPage";
import JoinRoomPage from "@/pages/game/FriendGame/JoinRoomPage";
import WaitingRoomPage from "@/pages/game/FriendGame/WaitingRoomPage";
import GamePlayPage from "@/pages/game/FriendGame/GamePlayPage";
import GameResultPage from "@/pages/game/FriendGame/GameResultPage";
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
          <Route path="/login" element={<LoginPage />} />

          <Route path="/game/solo" element={<SoloIntroPage />} />
          <Route path="/game/solo/reading" element={<SoloReadingPage />} />
          <Route path="/game/solo/play" element={<SoloGamePage />} />
          <Route path="/game/solo/result" element={<SoloResultPage />} />

          <Route path="/game/friend" element={<FriendGamePage />} />
          <Route path="/game/friend/create" element={<CreateRoomPage />} />
          <Route path="/game/friend/join" element={<JoinRoomPage />} />

          {/* 참여 중인 방 정보 필요한 페이지 */}
          <Route element={<RoomLayout />}>
            <Route path="/game/friend/invite" element={<InviteRoomPage />} />
            <Route path="/game/friend/waiting" element={<WaitingRoomPage />} />
            <Route path="/game/friend/play" element={<GamePlayPage />} />
            <Route path="/game/friend/result" element={<GameResultPage />} />
          </Route>

          <Route path="/review/types" element={<ReviewTypePage />} />
          <Route path="/review/play/:typeId" element={<ReviewPlayPage />} />
          <Route path="/review/result" element={<ReviewResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
