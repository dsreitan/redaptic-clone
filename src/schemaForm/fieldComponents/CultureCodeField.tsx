import { FieldProps } from '@rjsf/core'
import React from 'react'
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

const CultureCodeField = (props: FieldProps) => {
  const options = props.schema.enum?.map((value) => {
    const cultureCode = value as string

    const option: IChoiceGroupOption = {
      key: cultureCode,
      ...getCultureCodeNameAndImage(cultureCode),
    }

    return option
  })

  return <ChoiceGroup
    onChange={(_, option) => props.onChange(option?.key)}
    label="Språk"
    defaultSelectedKey={props.formData}
    options={options} />
}

export default CultureCodeField

const getCultureCodeNameAndImage = (cultureCode: string) => {
  switch (cultureCode) {
    case "nb-NO": return { text: "Bokmål", selectedImageSrc: noFlag, imageSrc: noFlag }
    case "nn-NO": return { text: "Nynorsk", selectedImageSrc: noFlag, imageSrc: noFlag }
    case "en-GB": return { text: "English", selectedImageSrc: gbFlag, imageSrc: gbFlag }
    default: throw new Error(`Invalid culture code ${cultureCode}`)
  }
}

const noFlag = "https://lipis.github.io/flag-icon-css/flags/4x3/no.svg"
const gbFlag = "https://lipis.github.io/flag-icon-css/flags/4x3/gb.svg"