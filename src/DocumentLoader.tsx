import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IDocument, cmsGet } from './cmsApi'
import { TextField } from '@fluentui/react'
import ChangelogDropdown, { ChangelogRecord } from './ChangelogDropdown'

interface Props {
  documentType: string | undefined,
  setDocument: Dispatch<SetStateAction<IDocument | undefined>>
}

const DocumentLoader = ({ documentType, setDocument }: Props) => {
  const [changelog, setChangelog] = useState<Array<ChangelogRecord>>()
  const [documentId, setDocumentId] = useState<string | undefined>()

  useEffect(() => {
    setChangelog([])
    setDocumentId(undefined)
    setDocument(undefined)
    documentType && getChangelog()
  }, [documentType])

  const getChangelog = async () => {
    const changelog = await cmsGet<Array<ChangelogRecord>>(`/changelog?ChangelogRecordTypes=Created&ChangelogRecordTypes=Updated&DocumentTypes=${documentType}`)
    setChangelog(changelog)
  }

  useEffect(() => {
    documentId && getDocument()
  }, [documentId])

  const getDocument = async () => {
    const document = await cmsGet<IDocument>(`/documents/${documentId}?Revision=Current`)
    if (document._id === documentId) {
      setDocument(document)
    }
  }

  return (
    <>
      <ChangelogDropdown changelog={changelog} setDocumentId={setDocumentId} />

      <TextField
        label="Dokument ID"
        value={documentId}
        onChange={(_, newValue) => setDocumentId(newValue)}
      />
    </>
  )
}

export default DocumentLoader
