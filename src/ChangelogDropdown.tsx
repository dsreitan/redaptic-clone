import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dropdown, IDropdownOption } from '@fluentui/react'

export interface ChangelogRecord { documentId: string, documentTitle: string }

interface Props {
  changelog?: Array<ChangelogRecord>,
  setDocumentId: Dispatch<SetStateAction<string | undefined>>
}

const ChangelogDropdown = ({ changelog, setDocumentId }: Props) => {
  if (!changelog) return <></>

  const [selectedOption, setSelectedOption] = useState<IDropdownOption>()

  const options = uniqueByDocumentId(changelog).map(record => {
    const option: IDropdownOption<ChangelogRecord> = {
      key: record.documentId,
      text: record.documentTitle,
      data: record
    }
    return option
  })

  const selectDocument = (option: IDropdownOption<ChangelogRecord>) => {
    setSelectedOption(option)
    setDocumentId(option.data?.documentId)
  }

  return (
    <Dropdown
      label="Nyeste dokumenter"
      selectedKey={selectedOption ? selectedOption.key : undefined}
      options={options}
      onChange={(_, option) => option && selectDocument(option)}
    />
  )
}

export default ChangelogDropdown

const uniqueByDocumentId = (list: Array<ChangelogRecord>) => list.filter((v, i, a) => a.findIndex(t => (t.documentId === v.documentId)) === i)
