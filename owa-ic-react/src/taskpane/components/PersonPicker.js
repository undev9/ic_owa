import * as React from "react";
import { IBasePickerSuggestionsProps, NormalPeoplePicker, ValidationState } from "office-ui-fabric-react/lib/Pickers";

export default class PersonPicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <NormalPeoplePicker key={"normal"}></NormalPeoplePicker>
      </>
    );
  }
}
