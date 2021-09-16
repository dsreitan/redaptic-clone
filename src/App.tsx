import React, { useState } from 'react'
import { IDocument, cmsPut } from './cmsApi'
import type { JSONSchema7 } from 'json-schema'
import SchemaLoader from './SchemaLoader'
import Editor from './schemaForm/Editor'
import DocumentLoader from './DocumentLoader'

const App = () => {
  const [documentType, setDocumentType] = useState<string>()
  const [schema, setSchema] = useState<JSONSchema7>()
  const [document, setDocument] = useState<IDocument>()

  const putDocument = async (formData: any) => {
    const response = await cmsPut<{ ok: boolean, document: IDocument | undefined }>(`/documents/${formData._id}`, formData)
    response.ok && response.document && setDocument(response.document)
  }

  return (
    <>
      <SchemaLoader setSchema={setSchema} setDocumentType={setDocumentType} />

      <DocumentLoader documentType={documentType} setDocument={setDocument} />

      <br />
      <hr />

      <Editor schema={schema} formData={document} onFormSubmit={putDocument} />
    </>
  )
}

export default App
