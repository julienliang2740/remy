import React, { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, Mic, Pause, RefreshCw, ShieldAlert } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { VideoView, useVideoPlayer } from "expo-video";

import { colors } from "../../constants/theme";
import { styles, webVideoStyle } from "../../styles/styles";
import type { RecordedVideo } from "../../types/cooking";
import { PrimaryButton } from "../ui";

export function NativeVideoRecorder({
  onRecorded,
}: {
  onRecorded: (video: RecordedVideo) => void;
}) {
  const cameraRef = useRef<CameraView>(null);
  const recordingStartedAt = useRef<number | null>(null);
  const isRecordingRef = useRef(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasPermission = cameraPermission?.granted && microphonePermission?.granted;

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (isRecordingRef.current) {
        cameraRef.current?.stopRecording();
      }
    };
  }, []);

  const requestPermissions = async () => {
    setError(null);
    const camera = cameraPermission?.granted
      ? cameraPermission
      : await requestCameraPermission();
    const microphone = microphonePermission?.granted
      ? microphonePermission
      : await requestMicrophonePermission();

    if (!camera.granted || !microphone.granted) {
      setError("Camera and microphone permissions are required to record.");
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    setError(null);
    setIsRecording(true);
    recordingStartedAt.current = Date.now();

    try {
      const recording = await cameraRef.current.recordAsync();
      if (!recording?.uri) return;

      onRecorded({
        uri: recording.uri,
        createdAt: new Date().toISOString(),
        durationMs: recordingStartedAt.current ? Date.now() - recordingStartedAt.current : 0,
        platform: Platform.OS,
      });
    } catch {
      setError("Recording failed. Try again.");
    } finally {
      recordingStartedAt.current = null;
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    cameraRef.current?.stopRecording();
  };

  if (!cameraPermission || !microphonePermission) {
    return <RecordingBackdrop title="Preparing camera" body="Checking device access..." />;
  }

  if (!hasPermission) {
    return (
      <>
        <RecordingBackdrop
          title="Camera and mic access"
          body="Remy needs both permissions to record video with audio."
        />
        <View style={styles.recordingBottom}>
          <View style={styles.recordingPanel}>
            <View style={styles.recordingTitleRow}>
              <ShieldAlert size={18} color={colors.warm} />
              <Text style={styles.recordingTitle}>Permissions needed</Text>
            </View>
            {error && <Text style={styles.recordingError}>{error}</Text>}
            <PrimaryButton label="Allow camera and mic" icon={Mic} onPress={requestPermissions} warm />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        mode="video"
        mute={false}
      />
      <RecordingStatusOverlay isRecording={isRecording} />
      <View style={styles.recordingBottom}>
        <View style={styles.recordingPanel}>
          <View style={styles.recordingTitleRow}>
            <Camera size={18} color={colors.warm} />
            <Text style={styles.recordingTitle}>
              {isRecording ? "Recording video and audio" : "Ready to record"}
            </Text>
          </View>
          <Text style={styles.recordingBody}>
            {isRecording
              ? "Keep cooking in frame. Tap stop when you are finished."
              : "This is the watch-you-cook placeholder. It records a temporary clip only; leaving this screen clears it."}
          </Text>
          {error && <Text style={styles.recordingError}>{error}</Text>}
          <Pressable
            style={[styles.recordButton, isRecording ? styles.stopButton : null]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View style={styles.recordButtonIcon}>
              {isRecording ? (
                <Pause size={18} color={colors.white} />
              ) : (
                <Camera size={18} color={colors.white} />
              )}
            </View>
            <Text style={styles.recordButtonText}>
              {isRecording ? "Stop recording" : "Start recording"}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export function WebVideoRecorder({
  onRecorded,
}: {
  onRecorded: (video: RecordedVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingStartedAt = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      recorderRef.current?.state === "recording" && recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const attachStream = (stream: MediaStream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const requestStream = async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("This browser does not support in-page video recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      attachStream(stream);
      setIsReady(true);
    } catch {
      setError("Camera and microphone access was blocked.");
    }
  };

  useEffect(() => {
    requestStream();
  }, []);

  const startRecording = async () => {
    if (!streamRef.current) {
      await requestStream();
    }
    if (!streamRef.current || isRecording) return;

    chunksRef.current = [];
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
      ? "video/webm;codecs=vp8,opus"
      : "video/webm";
    const recorder = new MediaRecorder(streamRef.current, { mimeType });
    recorderRef.current = recorder;
    recordingStartedAt.current = Date.now();

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const uri = URL.createObjectURL(blob);
      onRecorded({
        uri,
        createdAt: new Date().toISOString(),
        durationMs: recordingStartedAt.current ? Date.now() - recordingStartedAt.current : 0,
        platform: "web",
        mimeType,
      });
      recordingStartedAt.current = null;
      setIsRecording(false);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
  };

  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        {React.createElement("video", {
          ref: (node: HTMLVideoElement | null) => {
            videoRef.current = node;
            if (node && streamRef.current) node.srcObject = streamRef.current;
          },
          autoPlay: true,
          muted: true,
          playsInline: true,
          style: webVideoStyle,
        })}
      </View>
      {!isReady && (
        <RecordingBackdrop
          title="Camera and mic access"
          body="Allow access in your browser to record video with audio."
        />
      )}
      <RecordingStatusOverlay isRecording={isRecording} />
      <View style={styles.recordingBottom}>
        <View style={styles.recordingPanel}>
          <View style={styles.recordingTitleRow}>
            <Camera size={18} color={colors.warm} />
            <Text style={styles.recordingTitle}>
              {isRecording ? "Recording video and audio" : "Ready to record"}
            </Text>
          </View>
          <Text style={styles.recordingBody}>
            {isRecording
              ? "Keep this browser tab open. Tap stop when you are finished."
              : "This is the watch-you-cook placeholder. It creates a temporary browser clip that clears when you leave."}
          </Text>
          {error && <Text style={styles.recordingError}>{error}</Text>}
          <Pressable
            style={[
              styles.recordButton,
              isRecording ? styles.stopButton : null,
              !isReady && !error ? styles.recordButtonDisabled : null,
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={!isReady && !error}
          >
            <View style={styles.recordButtonIcon}>
              {isRecording ? (
                <Pause size={18} color={colors.white} />
              ) : (
                <Camera size={18} color={colors.white} />
              )}
            </View>
            <Text style={styles.recordButtonText}>
              {isRecording ? "Stop recording" : error ? "Try again" : "Start recording"}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export function RecordedVideoPlayer({
  recordedVideo,
  onRecordAgain,
}: {
  recordedVideo: RecordedVideo;
  onRecordAgain: () => void;
}) {
  return (
    <>
      {Platform.OS === "web" ? (
        <View style={StyleSheet.absoluteFill}>
          {React.createElement("video", {
            src: recordedVideo.uri,
            controls: true,
            playsInline: true,
            style: webVideoStyle,
          })}
        </View>
      ) : (
        <NativeRecordedVideoPlayer uri={recordedVideo.uri} />
      )}
      <View style={styles.recordingBottom}>
        <View style={styles.recordingPanel}>
          <View style={styles.recordingTitleRow}>
            <CheckCircle2 size={18} color={colors.leaf} />
            <Text style={styles.recordingTitle}>Recording ready</Text>
          </View>
          <Text style={styles.recordingBody}>
            {formatDuration(recordedVideo.durationMs)} captured. This clip is temporary and
            ready to be wired to save or send later.
          </Text>
          <Pressable style={styles.secondaryRecordButton} onPress={onRecordAgain}>
            <RefreshCw size={16} color={colors.earth950} />
            <Text style={styles.secondaryRecordButtonText}>Record again</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

function NativeRecordedVideoPlayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (playerInstance) => {
    playerInstance.loop = true;
  });

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls
    />
  );
}

function RecordingBackdrop({ title, body }: { title: string; body: string }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#5a4838", "#241a12", "#0a0604"]}
        start={{ x: 0.15, y: 0.15 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.recordingBackdropContent}>
        <View style={styles.cameraIconLarge}>
          <Camera size={28} color={colors.warm} />
        </View>
        <Text style={styles.recordingBackdropTitle}>{title}</Text>
        <Text style={styles.recordingBackdropBody}>{body}</Text>
      </View>
    </View>
  );
}

function RecordingStatusOverlay({ isRecording }: { isRecording: boolean }) {
  if (!isRecording) return null;

  return (
    <View style={styles.recordingStatus}>
      <View style={styles.recordingDot} />
      <Text style={styles.recordingStatusText}>Recording</Text>
    </View>
  );
}

function formatDuration(durationMs: number) {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
