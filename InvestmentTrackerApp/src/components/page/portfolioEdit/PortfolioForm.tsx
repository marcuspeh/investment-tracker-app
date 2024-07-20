import { StyleSheet, View } from 'react-native';

import Portfolio from '@/watermelonDB/Portfolio';
import { useState } from 'react';
import { FormRow } from './FormRow';

export type PortfolioFormProps =  {
	portfolio?: Portfolio,
  afterOperation: () => void,

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioForm({ portfolio, afterOperation, lightColor, darkColor }: PortfolioFormProps) {
  const [title, setTitle] = useState<string>(portfolio?.title || "")
  const [titleError, setTitleError] = useState<string>("")
  const [description, setDescription] = useState<string>(portfolio?.description || "")
  
  const titleEmptyErrorMsg: string = "Title is required"

  const onSubmit = () => {
    if (title.length === 0) {
      setTitleError(titleEmptyErrorMsg)
      return
    }
    console.log('onSubmit', title, description)
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
  </View>
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});