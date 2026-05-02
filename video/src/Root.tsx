import { Composition } from "remotion";
import { ClaudeCodeIntro } from "./ClaudeCodeIntro";

// 15秒・30fps で構成（合計 450 フレーム）
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeCodeIntro"
        component={ClaudeCodeIntro}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
