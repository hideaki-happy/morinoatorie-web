import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// 配色（森のアトリエに準拠）
const COLOR = {
  bg: "#1b3a2b",
  bgLight: "#2d6a4f",
  green: "#40916c",
  greenLight: "#52b788",
  cream: "#f5efe6",
  orange: "#f4a261",
  orangeDeep: "#e76f51",
  terminalBg: "#0f1f17",
  terminalText: "#e8f5ee",
} as const;

const FONT_JP =
  '"Noto Sans JP", "游ゴシック", YuGothic, "Hiragino Sans", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO =
  '"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace';

// 葉っぱ模様の背景（控えめに）
const ForestBackdrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 20%, ${COLOR.bgLight} 0%, ${COLOR.bg} 60%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at 10% 80%, ${COLOR.green}22 0%, transparent 30%),
                            radial-gradient(circle at 90% 70%, ${COLOR.greenLight}1f 0%, transparent 35%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// シーン1: タイトル
const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const subOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [25, 60], [0, 320], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_JP,
      }}
    >
      <div
        style={{
          color: COLOR.orange,
          fontSize: 36,
          letterSpacing: 8,
          opacity: subOpacity,
          marginBottom: 24,
        }}
      >
        SAMPLE VIDEO
      </div>
      <div
        style={{
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
          color: COLOR.cream,
          fontSize: 128,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        Claude Code の使い方
      </div>
      <div
        style={{
          marginTop: 32,
          height: 4,
          width: lineWidth,
          background: COLOR.greenLight,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          marginTop: 28,
          color: COLOR.greenLight,
          fontSize: 30,
          opacity: subOpacity,
        }}
      >
        ターミナルで、自然言語で、コーディング。
      </div>
    </AbsoluteFill>
  );
};

// 番号バッジ
const StepBadge: React.FC<{ step: number; label: string; opacity: number }> = ({
  step,
  label,
  opacity,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      opacity,
      fontFamily: FONT_JP,
    }}
  >
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        background: COLOR.orange,
        color: COLOR.bg,
        fontSize: 40,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {step}
    </div>
    <div style={{ color: COLOR.greenLight, fontSize: 32, letterSpacing: 4 }}>
      {label}
    </div>
  </div>
);

// ターミナル風カード（タイピングアニメーション付き）
const Terminal: React.FC<{
  prompt: string;
  command: string;
  output?: string;
  typeStartFrame: number;
}> = ({ prompt, command, output, typeStartFrame }) => {
  const frame = useCurrentFrame();
  const typed = Math.max(
    0,
    Math.min(command.length, Math.floor((frame - typeStartFrame) / 1.2))
  );
  const showCursor = Math.floor(frame / 15) % 2 === 0;
  const outputOpacity = interpolate(
    frame,
    [typeStartFrame + command.length * 1.2 + 6, typeStartFrame + command.length * 1.2 + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        background: COLOR.terminalBg,
        borderRadius: 16,
        padding: "28px 36px",
        width: 1200,
        boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
        fontFamily: FONT_MONO,
        border: `1px solid ${COLOR.green}66`,
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <span style={dotStyle("#ff5f56")} />
        <span style={dotStyle("#ffbd2e")} />
        <span style={dotStyle("#27c93f")} />
      </div>
      <div style={{ color: COLOR.terminalText, fontSize: 36, lineHeight: 1.6 }}>
        <span style={{ color: COLOR.greenLight }}>{prompt}</span>{" "}
        <span>{command.slice(0, typed)}</span>
        <span style={{ opacity: showCursor ? 1 : 0 }}>▍</span>
      </div>
      {output ? (
        <div
          style={{
            marginTop: 18,
            color: COLOR.greenLight,
            fontSize: 28,
            opacity: outputOpacity,
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          {output}
        </div>
      ) : null}
    </div>
  );
};

const dotStyle = (color: string): React.CSSProperties => ({
  display: "inline-block",
  width: 14,
  height: 14,
  borderRadius: 7,
  background: color,
});

// シーン2: インストール
const SceneInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 36 }}
    >
      <StepBadge step={1} label="インストール" opacity={fadeIn} />
      <Terminal
        prompt="$"
        command="npm install -g @anthropic-ai/claude-code"
        typeStartFrame={10}
      />
    </AbsoluteFill>
  );
};

// シーン3: 起動
const SceneLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 36 }}
    >
      <StepBadge step={2} label="起動する" opacity={fadeIn} />
      <Terminal
        prompt="$"
        command="claude"
        output="✻ Welcome to Claude Code!\n  プロジェクトの準備ができました。"
        typeStartFrame={10}
      />
    </AbsoluteFill>
  );
};

// シーン4: 自然言語で指示
const ScenePrompt: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 36 }}
    >
      <StepBadge step={3} label="話しかけるだけ" opacity={fadeIn} />
      <Terminal
        prompt=">"
        command="トップページにヒーロー画像を追加してください"
        output="📝 site/index.html を編集しました\n🎨 style.css にスタイルを追加しました"
        typeStartFrame={10}
      />
    </AbsoluteFill>
  );
};

// シーン5: 締め
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const subOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_JP,
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`,
          opacity: pop,
          color: COLOR.cream,
          fontSize: 110,
          fontWeight: 700,
          letterSpacing: 6,
          textAlign: "center",
        }}
      >
        さあ、はじめましょう。
      </div>
      <div
        style={{
          marginTop: 36,
          color: COLOR.orange,
          fontSize: 32,
          letterSpacing: 8,
          opacity: subOpacity,
        }}
      >
        claude.ai / code
      </div>
      <div
        style={{
          marginTop: 64,
          color: COLOR.greenLight,
          fontSize: 24,
          opacity: subOpacity,
          letterSpacing: 4,
        }}
      >
        森のアトリエ × Remotion
      </div>
    </AbsoluteFill>
  );
};

// メインコンポジション
export const ClaudeCodeIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLOR.bg }}>
      <ForestBackdrop />
      {/* 0-3秒 */}
      <Sequence from={0} durationInFrames={90}>
        <SceneTitle />
      </Sequence>
      {/* 3-6秒 */}
      <Sequence from={90} durationInFrames={90}>
        <SceneInstall />
      </Sequence>
      {/* 6-9秒 */}
      <Sequence from={180} durationInFrames={90}>
        <SceneLaunch />
      </Sequence>
      {/* 9-12秒 */}
      <Sequence from={270} durationInFrames={90}>
        <ScenePrompt />
      </Sequence>
      {/* 12-15秒 */}
      <Sequence from={360} durationInFrames={90}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
