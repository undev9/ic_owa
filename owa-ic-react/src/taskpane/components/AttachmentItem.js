import * as React from "react";
import { Checkbox, Label } from "office-ui-fabric-react";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { mergeStyles, mergeStyleSets } from "office-ui-fabric-react/lib/Styling";

const iconClass = mergeStyleSets({
  fontSize: 100,
  height: 100,
  width: 100,
  margin: "0 5px"
});

const colors = {
  wordBlue: "#2b579a",
  excelGreen: "#217346",
  powerpointRed: "#b7472a",
  pdfRed: "#FF3500",
  black: "#000000"
};

export default class AttachmentItem extends React.Component {
  _onChange = (event, checked) => {
    this.props.onAttachmentToggle(this.props.id, checked);
  };

  _getFileExtension = fileName => {
    const expression = /(?:\.([^.]+))?$/;
    return expression.exec(fileName)[1];
  };

  _getIconName = extension => {
    switch (extension) {
      case "doc":
      case "docx":
        return "WordDocument";
      case "xls":
      case "xlsx":
        return "ExcelDocument";
      case "ppt":
      case "pptx":
        return "PowerPointDocument";
      case "pdf":
        return "PDF";
      case "txt":
        return "TextDocument";
      case "png":
      case "jpg":
      case "jpeg":
        return "FileImage";
      case "rar":
      case "zip":
        return "ZipFolder";
      case "eml":
      case "msg":
        return "Mail";
      default:
        return "Document";
    }
  };

  _getIconColor = extension => {
    switch (extension) {
      case "doc":
      case "docx":
        return colors.wordBlue;
      case "xls":
      case "xlsx":
        return colors.excelGreen;
      case "ppt":
      case "pptx":
        return colors.powerpointRed;
      case "pdf":
        return colors.pdfRed;
      case "txt":
        return colors.black;
      case "png":
      case "jpg":
      case "jpeg":
        return colors.black;
      case "rar":
      case "zip":
        return colors.black;
      case "eml":
      case "msg":
        return colors.black;
      default:
        return colors.black;
    }
  };

  _getSizeString = bytes => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
      bytes = bytes + " bytes";
    } else if (bytes == 1) {
      bytes = bytes + " byte";
    } else {
      bytes = "0 bytes";
    }
    return bytes;
  };

  _renderLabelWithProps = () => {
    return (
      <>
        <FontIcon
          iconName={this._getIconName(this._getFileExtension(this.props.label))}
          style={{ marginLeft: 10, color: this._getIconColor(this._getFileExtension(this.props.label)) }}
        />
        <span style={{ marginLeft: 10 }}>
          {this.props.label} ({this._getSizeString(this.props.size)})
        </span>
      </>
    );
  };

  render() {
    return (
      <>
        <Checkbox
          label={this.props.label}
          onChange={this._onChange}
          checked={this.props.checked}
          onRenderLabel={this._renderLabelWithProps}
        />
      </>
    );
  }
}
