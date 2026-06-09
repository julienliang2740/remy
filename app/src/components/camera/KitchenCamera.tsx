import React from "react";
import { CheckCircle2, Camera, ImagePlus, ShieldAlert, X } from "lucide-react-native";
import { Image, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { labelCycle } from "../../constants/cooking";
import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { CapturedShot } from "../../types/cooking";
import { IconButton } from "../ui";
import { Bullet, FauxCamera } from "./CameraPrimitives";

export function KitchenCamera({
  open,
  onClose,
  shots,
  setShots,
  onDone,
  isDoneLoading,
  scanError,
}: {
  open: boolean;
  onClose: () => void;
  shots: CapturedShot[];
  setShots: React.Dispatch<React.SetStateAction<CapturedShot[]>>;
  onDone?: () => void | Promise<void>;
  isDoneLoading?: boolean;
  scanError?: string | null;
}) {
  const [permissionError, setPermissionError] = React.useState<string | null>(null);
  const [doneBusy, setDoneBusy] = React.useState(false);
  const doneDisabled = shots.length === 0 || Boolean(isDoneLoading) || doneBusy;

  const addAssets = (assets: ImagePicker.ImagePickerAsset[]) => {
    setShots((current) => {
      const next = assets.map((asset, index) => ({
        id: `${Date.now()}-${asset.assetId ?? index}`,
        uri: asset.uri,
        label: labelCycle[(current.length + index) % labelCycle.length],
      }));
      return [...current, ...next];
    });
  };

  const takePhoto = async () => {
    setPermissionError(null);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setPermissionError("Camera is blocked");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.82,
      allowsEditing: false,
    });
    if (!result.canceled) addAssets(result.assets);
  };

  const uploadPhotos = async () => {
    setPermissionError(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setPermissionError("Photo library is blocked");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.82,
    });
    if (!result.canceled) addAssets(result.assets);
  };

  const handleDone = async () => {
    if (doneDisabled) return;

    setDoneBusy(true);
    try {
      await onDone?.();
      onClose();
    } catch {
      // The parent context stores the visible scan error.
    } finally {
      setDoneBusy(false);
    }
  };

  return (
    <Modal visible={open} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.cameraSafe}>
        <View style={styles.cameraTop}>
          <IconButton icon={X} dark onPress={onClose} />
          <View style={styles.livePill}>
            <Text style={styles.livePillText}>Scan your kitchen</Text>
          </View>
          <View style={styles.iconButtonSpacer} />
        </View>

        <View style={styles.cameraViewport}>
          <FauxCamera />
          <View style={styles.permissionPanel}>
            <View style={styles.cameraIconLarge}>
              {permissionError ? (
                <ShieldAlert size={28} color={colors.warm} />
              ) : (
                <Camera size={28} color={colors.warm} />
              )}
            </View>
            <Text style={styles.cameraTitle}>
              {permissionError ? permissionError : "Show Remy your kitchen"}
            </Text>
            <Text style={styles.cameraBody}>
              Snap a few photos - the fridge, the pantry, what's on the counter.
              Remy will piece together what you can cook.
            </Text>
            {scanError && <Text style={styles.cameraErrorText}>{scanError}</Text>}
            <View style={styles.cameraBullets}>
              <Bullet>Photos never leave your device until you tap Done.</Bullet>
              <Bullet>You can retake or remove any shot.</Bullet>
              <Bullet>Remy skips anything it isn't sure about.</Bullet>
            </View>
          </View>
        </View>

        {shots.length > 0 && (
          <View style={styles.cameraShots}>
            <View style={styles.rowBetween}>
              <Text style={styles.cameraShotTitle}>
                {shots.length} shot{shots.length === 1 ? "" : "s"} captured
              </Text>
              <Pressable onPress={() => setShots([])}>
                <Text style={styles.cameraClear}>Clear</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {shots.map((shot) => (
                <View key={shot.id} style={styles.cameraThumbWrap}>
                  <Image source={{ uri: shot.uri }} style={styles.cameraThumb} />
                  <Text style={styles.cameraThumbLabel}>{shot.label}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.cameraControls}>
          <IconButton icon={ImagePlus} dark onPress={uploadPhotos} />
          <Pressable style={styles.shutter} onPress={takePhoto}>
            <View style={styles.shutterInner}>
              <Camera size={24} color={colors.earth950} />
            </View>
          </Pressable>
          <Pressable
            style={[styles.doneButton, doneDisabled ? styles.doneDisabled : null]}
            onPress={doneDisabled ? undefined : handleDone}
            disabled={doneDisabled}
          >
            <Text
              style={[
                styles.doneText,
                doneDisabled ? styles.doneTextDisabled : null,
              ]}
            >
              {isDoneLoading || doneBusy ? "Scanning" : "Done"}
            </Text>
            <CheckCircle2
              size={16}
              color={doneDisabled ? "rgba(255,255,255,0.4)" : colors.white}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
