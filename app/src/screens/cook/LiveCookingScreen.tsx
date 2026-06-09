import { ChevronLeft, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";

import { IconButton } from "../../components/ui";
import {
  NativeVideoRecorder,
  RecordedVideoPlayer,
  WebVideoRecorder,
} from "../../components/recording/VideoRecorder";
import { colors } from "../../constants/theme";
import { useCookingSession } from "../../context/CookingSessionContext";
import { createCookingGuideSession } from "../../services/cookingService";
import { styles } from "../../styles/styles";
import type { RecordedVideo } from "../../types/cooking";
import type { Nav } from "../../types/navigation";

export function LiveCookingScreen({ nav }: { nav: Nav }) {
  const { recipe } = useCookingSession();
  const [recordedVideo, setRecordedVideo] = useState<RecordedVideo | null>(null);
  const [guideStatusLabel, setGuideStatusLabel] = useState("Record video + audio");

  useEffect(() => {
    let active = true;

    createCookingGuideSession(recipe).then((session) => {
      if (active) setGuideStatusLabel(session.statusLabel);
    });

    return () => {
      active = false;
    };
  }, [recipe]);

  useEffect(() => {
    return () => {
      if (Platform.OS === "web" && recordedVideo?.uri.startsWith("blob:")) {
        URL.revokeObjectURL(recordedVideo.uri);
      }
    };
  }, [recordedVideo?.uri]);

  return (
    <SafeAreaView style={styles.liveSafe}>
      <View style={styles.liveViewport}>
        {recordedVideo ? (
          <RecordedVideoPlayer
            recordedVideo={recordedVideo}
            onRecordAgain={() => setRecordedVideo(null)}
          />
        ) : Platform.OS === "web" ? (
          <WebVideoRecorder onRecorded={setRecordedVideo} />
        ) : (
          <NativeVideoRecorder onRecorded={setRecordedVideo} />
        )}

        <View style={styles.liveTop}>
          <IconButton icon={ChevronLeft} dark onPress={() => nav("recipe")} />
          <View style={styles.liveCenter}>
            <View style={styles.livePill}>
              <Text style={styles.livePillText}>
                {recordedVideo ? "Playback ready" : guideStatusLabel}
              </Text>
            </View>
            <View style={styles.dots}>
              {Array.from({ length: 12 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i < 4 ? styles.dotWarm : i === 4 ? styles.dotActive : styles.dotMuted,
                  ]}
                />
              ))}
            </View>
          </View>
          <IconButton icon={X} dark onPress={() => nav("feedback")} />
        </View>
      </View>
    </SafeAreaView>
  );
}
