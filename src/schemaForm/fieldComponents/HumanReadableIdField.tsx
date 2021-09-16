import { Label } from '@fluentui/react'
import { FieldProps } from '@rjsf/core'
import React from 'react'

const HumanReadableIdField = (props: FieldProps) =>
  <Label disabled>{props.formData}</Label>

export default HumanReadableIdField
