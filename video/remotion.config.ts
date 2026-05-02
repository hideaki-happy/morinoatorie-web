import { Config } from "@remotion/cli/config";

// 動画書き出し時の共通設定
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(1);
