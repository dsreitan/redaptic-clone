import React from 'react'
import { withTheme } from '@rjsf/core';
import { Theme as FluentUITheme } from '@rjsf/fluent-ui';
import type { JSONSchema7 } from 'json-schema'
import fields from './fields';
import createUiSchema from './uiSchema';

const Form = withTheme(FluentUITheme);

interface Props { schema?: JSONSchema7, formData?: object, onFormSubmit: (formData: any) => void }

const Editor = ({ schema, formData, onFormSubmit }: Props) => {
  if (!schema) return <></>

  return (
    <Form
      schema={schema}
      uiSchema={createUiSchema(schema)}
      formData={formData}
      fields={fields}
      onChange={e => console.debug("form changed", e)}
      onSubmit={e => onFormSubmit(e.formData)}
      onError={e => console.error(e)}
    />
  )
}

export default Editor
