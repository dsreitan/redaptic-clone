import { UiSchema } from '@rjsf/core';
import type { JSONSchema7 } from 'json-schema'

/**
  * Builds an rjsf UiSchema from json schema properties
  */
const createUiSchema = (schema: JSONSchema7) => {
  const uiSchema: UiSchema = {}

  for (const propKey in schema.properties) {

    // map to field component
    const ref = getRef(schema.properties[propKey])
    if (ref) {
      uiSchema[propKey] = ref
      continue
    }

    // hide readOnly props
    const readOnly = getReadOnly(schema.properties[propKey])
    if (readOnly) {
      uiSchema[propKey] = readOnly
    }
  }

  return uiSchema
}

export default createUiSchema

const getRef = (prop: any) => {
  const ref = `${prop.$ref}`
  if (ref.startsWith("#")) {
    return { "ui:field": ref }
  }
  return false
}

const getReadOnly = (prop: any) => {
  if (prop.readOnly) {
    return { "ui:widget": "hidden" }
  }
  return false
}