import { StyleSheet, View } from 'react-native';

import Portfolio from '@/watermelonDB/Portfolio';
import { useState } from 'react';
import { FormRow } from './FormRow';
import { createPorfolio, updatePortfolio } from '@/db/portfolioDB';
import { router } from 'expo-router';
import { ThemedButton } from '@/components/atoms/ThemedButton';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PortfolioFormProps =  {
	portfolio?: Portfolio,
  afterOperation: () => void,

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioForm({ portfolio, afterOperation, lightColor, darkColor }: PortfolioFormProps) {
  const buttonActiveBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveBackground');
  const buttonActiveText = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveText');

  const [systemError, setSystemError] = useState<string>("")
  const [title, setTitle] = useState<string>(portfolio?.title || "")
  const [titleError, setTitleError] = useState<string>("")
  const [description, setDescription] = useState<string>(portfolio?.description || "")
  
  const titleEmptyErrorMsg: string = "Title is required"

  const validateInput = (): boolean => {
    if (title.length === 0) {
      setTitleError(titleEmptyErrorMsg)
      return false
    }
    setTitleError("")
    return true
  }

  const createNew = async (): Promise<Portfolio | undefined> => {
    try {
      // const portfolio = await createPorfolio(title, description)
      return portfolio
    } catch (error) {
      setSystemError("Failed to create portfolio. Please try again.")
    }
    return undefined
  }

  const updateExisiting = async (id: string): Promise<Portfolio | undefined> => {
    try {
      // const portfolio = await updatePortfolio(id, title, description)
      return portfolio
    } catch (error) {
      setSystemError("Failed to create portfolio. Please try again.")
    }
    return undefined
  }

  const onSubmit = async () => {
    if (!validateInput()) {
      return
    }

    console.log('onSubmit', title, description)
    let newPortfolio: Portfolio | undefined
    if (portfolio === undefined || portfolio === null) {
      newPortfolio = await createNew()
    } else {
      newPortfolio = await updateExisiting(portfolio!.id)
    }

    if (portfolio === undefined || portfolio === null) {
      return
    }

    afterOperation()
    router.back()
  }

  return <View style={styles.container}>
    <FormRow 
      label={"Name*"}
      value={title}
      placeholder={"Name of portfolio"}
      onChange={setTitle}
      errorText={titleError}
    />
    <FormRow 
      label={"Description"}
      value={description}
      placeholder={"Description"}
      onChange={setDescription}
      errorText={""}
    />
    <View style={styles.button}>
      <ThemedButton 
        buttonOnPress={onSubmit}
        backgroundColor={buttonActiveBackground}
        textColor={buttonActiveText}
        label={"Save"}
        labelType={'b1'}
        width={"100%"}
        height={45}
      />     
    </View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  button: {
    marginTop: 30
  }
});