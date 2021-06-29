import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

export default function ProfileHeaderRight(props) {

  
  return (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate("UploadForm", {
        //   file: chosenPhoto,
        // })
      }
    >
      <Icon name="settings-sharp" style={{}} />
    </TouchableOpacity>
  )
}