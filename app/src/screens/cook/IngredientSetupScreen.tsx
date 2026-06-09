import { useState } from "react";
import { Camera, Plus, Search, Sparkles, X } from "lucide-react-native";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { KitchenCamera } from "../../components/camera/KitchenCamera";
import { Shell } from "../../components/layout/Shell";
import { PrimaryButton, SectionTitle } from "../../components/ui";
import { useCookingSession } from "../../context/CookingSessionContext";
import { pantry, tools } from "../../constants/cooking";
import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { Nav } from "../../types/navigation";

export function IngredientSetupScreen({ nav }: { nav: Nav }) {
  const {
    shots,
    setShots,
    selectedIngredients,
    detectedIngredients,
    isScanning,
    isGeneratingRecipe,
    toggleIngredient,
    addCustomIngredient,
    scanCurrentShots,
    generateCurrentRecipe,
  } = useCookingSession();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ingredientInput, setIngredientInput] = useState("");
  const selected = new Set(selectedIngredients);

  const addTypedIngredient = () => {
    addCustomIngredient(ingredientInput);
    setIngredientInput("");
  };

  const suggestRecipe = async () => {
    await generateCurrentRecipe();
    nav("recipe");
  };

  const runDemoScan = async () => {
    await scanCurrentShots();
  };

  return (
    <Shell nav={nav} active="setup">
      <Text style={styles.eyebrow}>Step 1 of 2</Text>
      <Text style={styles.serifTitle}>What do you{"\n"}have on hand?</Text>
      <Text style={[styles.bodyText, styles.mt8]}>
        Snap your fridge, or tap anything you've got - even loosely.
      </Text>

      <Pressable style={styles.scanCard} onPress={() => setCameraOpen(true)}>
        <View style={styles.rowTop}>
          <View style={styles.warmSolidBox}>
            <Camera size={20} color={colors.white} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.scanEyebrow}>Fastest way</Text>
            <Text style={styles.scanTitle}>Scan your fridge & pantry</Text>
            <Text style={styles.scanBody}>
              Snap a few photos - Remy adds likely ingredients to your basket.
            </Text>
          </View>
        </View>
        {shots.length > 0 && (
          <View style={styles.shotSummary}>
            <View style={styles.shotStack}>
              {shots.slice(0, 4).map((shot) => (
                <Image key={shot.id} source={{ uri: shot.uri }} style={styles.shotThumb} />
              ))}
            </View>
            <Text style={styles.scanBody}>
              <Text style={styles.whiteStrong}>
                {shots.length} photo{shots.length === 1 ? "" : "s"}
              </Text>{" "}
              attached - tap to add more
            </Text>
          </View>
        )}
      </Pressable>

      <View style={[styles.chipWrap, styles.mt12]}>
        <Pressable
          style={styles.lightChip}
          onPress={runDemoScan}
          disabled={isScanning}
          accessibilityLabel="Use demo scan"
        >
          <Text style={styles.lightChipText}>
            {isScanning ? "Scanning..." : "Use demo scan"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or build it by hand</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.searchBox}>
        <Search size={16} color={colors.earth600} />
        <TextInput
          placeholder="Add an ingredient, e.g. mushrooms"
          placeholderTextColor={colors.earth400}
          style={styles.searchInput}
          value={ingredientInput}
          onChangeText={setIngredientInput}
          onSubmitEditing={addTypedIngredient}
          returnKeyType="done"
        />
        <Pressable
          style={[
            styles.addButton,
            ingredientInput.trim() ? null : styles.recordButtonDisabled,
          ]}
          onPress={addTypedIngredient}
          disabled={!ingredientInput.trim()}
          accessibilityLabel="Add ingredient"
        >
          <Plus size={16} color={colors.earth800} />
        </Pressable>
      </View>

      {selected.size > 0 && (
        <View style={styles.mt20}>
          <SectionTitle title="In your basket" />
          <View style={styles.chipWrap}>
            {[...selected].map((name) => (
              <Pressable key={name} style={styles.darkChip} onPress={() => toggleIngredient(name)}>
                <Text style={styles.darkChipText}>{name}</Text>
                <X size={12} color={colors.canvas} />
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {detectedIngredients.length > 0 && (
        <View style={styles.mt20}>
          <SectionTitle title="Added from scan" />
          <View style={styles.chipWrap}>
            {detectedIngredients.map((ingredient) => (
              <View key={ingredient.name} style={styles.lightChip}>
                <Text style={styles.lightChipText}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <SectionTitle title="Common pantry" style={styles.mt24} />
      <View style={styles.pantryGrid}>
        {pantry.map((item) => {
          const active = selected.has(item.name);
          return (
            <Pressable
              key={item.name}
              style={[styles.pantryItem, active ? styles.pantryActive : null]}
              onPress={() => toggleIngredient(item.name)}
            >
              <Text style={styles.emojiMed}>{item.emoji}</Text>
              <Text style={[styles.pantryText, active ? styles.warmText : null]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Tools" style={styles.mt24} />
      <View style={styles.chipWrap}>
        {tools.map((tool) => (
          <View key={tool} style={styles.lightChip}>
            <Text style={styles.lightChipText}>{tool}</Text>
          </View>
        ))}
      </View>

      <View style={styles.pushBottom}>
        <PrimaryButton
          label={isGeneratingRecipe ? "Suggesting..." : "Suggest a recipe"}
          icon={Sparkles}
          onPress={suggestRecipe}
          dark
        />
        <Text style={styles.smallCenter}>
          {isScanning
            ? "Scanning your photos for ingredients."
            : "Recipe ideas use your tapped, typed, and scanned ingredients."}
        </Text>
      </View>

      <KitchenCamera
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        shots={shots}
        setShots={setShots}
        onDone={async () => {
          await scanCurrentShots();
        }}
      />
    </Shell>
  );
}
