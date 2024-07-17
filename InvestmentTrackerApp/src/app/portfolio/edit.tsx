import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import { ThemedTextInput } from "@/components/atoms/ThemedTextInput";
import { useState } from "react";

export default function StockScreen() {
  const [name, setName] = useState<string>("hello")

  return (
    <ThemedScrollView>
      <ThemedTextInput 
        height={50} 
        width={"100%"} 
        value={name}
        onChangeText={setName}
        placeholder={"Enter name of portfolio"}
      />
    </ThemedScrollView>
  );
}