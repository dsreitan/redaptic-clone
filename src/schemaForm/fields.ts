import ActivityLayoutField from './fieldComponents/ActivityLayoutField'
import CultureCodeField from './fieldComponents/CultureCodeField'
import DamImageField from './fieldComponents/DamImageField'
import HumanReadableIdField from './fieldComponents/HumanReadableIdField'

/**
  * Maps schema property type definitions to field components
  */
const fields = {
  "#/definitions/CultureCode": CultureCodeField,
  "#/definitions/HumanReadableId": HumanReadableIdField,
  "#/definitions/DamImage": DamImageField,
  "#/definitions/ActivityLayout": ActivityLayoutField,
}

export default fields
