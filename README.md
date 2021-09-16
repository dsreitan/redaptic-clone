# Redaptic clone

App for exploring how to map [json schema definitions](https://react-jsonschema-form.readthedocs.io/en/docs/usage/definitions/) to [rjsf field components](https://react-jsonschema-form.readthedocs.io/en/docs/advanced-customization/custom-widgets-fields/).

### Getting started

1. Make sure the CMS runs locally
2. `npm i`
3. `npm start`

### Basics 
- Get all schemas and select the one you like in [SchemaLoader.tsx](src/SchemaLoader.tsx)
- Use [uiSchema.ts](src/schemaForm/uiSchema.ts) to tell rjsf how to present the form 
- Fields are mapped to React components in [fields.ts](src/schemaForm/fields.ts) with definition `$ref` as key
- Form is rendered in [Editor.tsx](src/schemaForm/Editor.tsx)
- Load a document via `documentId` or changelog record in [DocumentLoader.tsx](src/DocumentLoader.tsx)
