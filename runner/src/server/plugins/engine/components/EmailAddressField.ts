import { InputFieldsComponentsDef } from "@xgovformbuilder/model";

import { FormModel } from "../models";
import { FormData, FormSubmissionErrors } from "../types";
import { FormComponent } from "./FormComponent";
import {
  getStateSchemaKeys,
  getFormSchemaKeys,
  addClassOptionIfNone,
} from "./helpers";

export class EmailAddressField extends FormComponent {
  constructor(def: InputFieldsComponentsDef, model: FormModel) {
    super(def, model);
    this.schema["email"] = true;
    addClassOptionIfNone(this.options, "govuk-input--width-20");
  }

  getFormSchemaKeys() {
    return getFormSchemaKeys(this.name, "string", this);
  }

  getStateSchemaKeys() {
    return getStateSchemaKeys(this.name, "string", this);
  }

  getViewModel(formData: FormData, errors: FormSubmissionErrors) {
    const schema = this.schema;
    const viewModel = super.getViewModel(formData, errors);

    // maxlength continues to be applied for emails as it is consistent with the email
    // format being validated by default HTML form validationl. This should be removed
    // as a bigger change with the `novalidate` attribute which can then consistenly apply server side `max` validation
    if ("max" in schema && schema.max) {
      viewModel.attributes = {
        maxlength: schema.max,
      };
    }

    viewModel.type = "email";
    viewModel.autocomplete = "email";

    return viewModel;
  }
}
