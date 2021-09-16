import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Dropdown, IDropdownOption } from '@fluentui/react'
import type { JSONSchema7 } from 'json-schema'
import { cmsGet } from './cmsApi';
import { params, setParamsAndReplaceHistory } from "./helpers"

let isInitialized = false
const typeParam = params.get("type")

export interface SchemaType { type: string, schemaUrl: string }

interface Props {
  setSchema: Dispatch<SetStateAction<JSONSchema7 | undefined>>,
  setDocumentType: Dispatch<SetStateAction<string | undefined>>
}

const SchemaLoader = ({ setSchema, setDocumentType }: Props) => {
  const [options, setOptions] = useState<IDropdownOption<SchemaType>[]>([])
  const [selectedOption, setSelectedOption] = useState<IDropdownOption<SchemaType>>()

  useEffect(() => {
    isInitialized === false && getSchemaTypes()
    isInitialized = true
  })

  const getSchemaTypes = async () => {
    const schemaTypes = await cmsGet<SchemaType[]>("/schemas")

    const options = schemaTypes.map(schemaType => {
      const option: IDropdownOption<SchemaType> = {
        key: schemaType.schemaUrl,
        text: schemaType.type,
        data: schemaType
      }
      return option
    })

    setOptions(options)

    const optionFromParam = options.find(x => x.data?.type === typeParam)
    optionFromParam && selectSchema(optionFromParam)
  }

  const selectSchema = async (option: IDropdownOption<SchemaType>) => {
    setSelectedOption(option)
    setParamsAndReplaceHistory("type", option.data?.type)
    setDocumentType(option.data?.type)

    if (option.data?.schemaUrl) {
      const schema = await cmsGet<JSONSchema7>(option.data?.schemaUrl)
      setSchema(schema)
    }
  }

  return (
    <Dropdown
      label="Velg skjema"
      selectedKey={selectedOption ? selectedOption.key : undefined}
      options={options}
      onChange={(_, option) => option && selectSchema(option)}
    />
  )
}

export default SchemaLoader
