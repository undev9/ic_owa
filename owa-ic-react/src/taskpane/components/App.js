import * as React from "react";
import { PrimaryButton, DefaultButton, Label, TextField } from "office-ui-fabric-react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import ApiService from "./ApiService";
import AttachmentItem from "./AttachmentItem";
import { initializeIcons } from "@uifabric/icons";
import { channelList, statusList, priorityList } from "./Dataset";
initializeIcons();

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ticketId: undefined,
      channel: undefined,
      status: undefined,
      subject: "",
      priority: undefined,
      client: undefined,
      description: "",
      responsibleParty: [],
      module: undefined,
      category: undefined,
      subCategory: undefined,
      clientReportedIssue: false,
      creator: undefined,
      emailId: "",
      conversationId: "",
      clientList: [],
      teamMemberList: [],
      moduleList: [],
      attachments: [],
      attachmentToken: "",
      ewsUrl: "",
      validation: {
        channel: undefined,
        status: undefined,
        subject: undefined,
        priority: undefined,
        client: undefined,
        description: undefined,
        responsibleParty: undefined,
        module: undefined,
        category: undefined,
        subCategory: undefined,
        clientReportedIssue: undefined,
        creator: undefined,
        emailId: undefined,
        conversationId: undefined,
      },
      saveState: "unsaved",
    };
  }

  componentDidMount() {
    this.fetchClients();
    this.fetchModules();
    this.fetchTeamMembers();
    this.fetchSelectedItemDetailsWrapper();
  }

  getAttachments = (result, userContext) => {
    if (Office.context.mailbox.item.attachments.length === 0) {
      this.setState({
        attachments: [],
        attachmentToken: result.value,
        ewsUrl: Office.context.mailbox.ewsUrl,
      });
      return;
    }

    let itemAttachments = Office.context.mailbox.item.attachments;
    itemAttachments.map(x => (x.selected = false));

    this.setState({
      attachments: itemAttachments,
      attachmentToken: result.value,
      ewsUrl: Office.context.mailbox.ewsUrl,
    });
  };

  fetchClients = async () => {
    ApiService.getClients().then(clients => {
      let clientArray = clients.map(client => {
        return {
          key: client.id,
          text: client.name,
          data: {
            active: client.active,
            bcmResources: client.bcmResources,
            rcmResources: client.rcmResources,
            arResources: client.arResources,
            productionResources: client.productionResources,
            cchResources: client.cchResources,
          },
        };
      });
      this.setState({ clientList: clientArray });
    });
  };

  fetchModules = async () => {
    ApiService.getModules().then(modules => {
      this.setState({ moduleList: modules });
    });
  };

  fetchTeamMembers = async () => {
    ApiService.getTeamMembers().then(teamMembers => {
      var teamMemberArray = teamMembers.map(teamMember => {
        return {
          key: teamMember.id,
          text: teamMember.name,
          data: {
            email: teamMember.email,
          },
        };
      });

      this.setState({ teamMemberList: teamMemberArray });
    });
  };

  fetchSelectedItemDetailsWrapper = () => {
    if (Office.context.mailbox === undefined) {
      setTimeout(() => {
        this.fetchSelectedItemDetailsWrapper();
      }, 1000);
    } else {
      this.fetchSelectedItemDetails();
    }
  };

  fetchSelectedItemDetails = () => {
    this.setState({
      subject: Office.context.mailbox.item.subject,
      emailId: Office.context.mailbox.item.itemId,
      conversationId: Office.context.mailbox.item.conversationId,
    });

    ApiService.getTicketByEmailId(Office.context.mailbox.item.itemId).then(result => {
      if (result === null) {
        this.setState({ ticketId: 0 });
      } else {
        this.setState({ ticketId: result.ticketId });
      }
    });

    Office.context.mailbox.getCallbackTokenAsync(this.getAttachments);

    Office.context.mailbox.item.body.getAsync("text", res => {
      this.setState({ description: res.value.trim() });
    });
  };

  distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  getModules = () => {
    return this.state.moduleList === undefined
      ? []
      : this.state.moduleList
          .map(x => x.module)
          .filter(this.distinct)
          .map(x => {
            return {
              key: x,
              text: x,
            };
          });
  };

  getCategories = () => {
    if (this.state.moduleList === undefined) return [];
    if (this.state.module === undefined) {
      return [];
    }

    return this.state.moduleList
      .filter(x => x.module === this.state.module.key)
      .map(x => x.category)
      .filter(this.distinct)
      .map(x => {
        return {
          key: x,
          text: x,
        };
      });
  };

  getSubCategories = () => {
    if (this.state.moduleList === undefined) return [];
    if (this.state.module === undefined || this.state.category === undefined) {
      return [];
    }

    return this.state.moduleList
      .filter(x => x.module === this.state.module.key && x.category === this.state.category.key)
      .map(x => x.subCategory)
      .filter(this.distinct)
      .map(x => {
        return {
          key: x,
          text: x,
        };
      });
  };

  onSaveClicked = async () => {
    this.validate().then(() => {
      this.isValid().then(isValid => {
        if (isValid) {
          this.setState({ saveState: "saving" });
          setTimeout(() => {
            this.saveTicket().then(result => console.log(result));
          }, 3000);
        } else {
          console.log("failed validation");
        }
      });
    });
  };

  saveTicket = async () => {
    let ticket = {
      ticketId: this.state.ticketId,
      channel: this.state.channel,
      status: this.state.status,
      subject: this.state.subject,
      priority: this.state.priority,
      client: this.state.client,
      description: this.state.description,
      responsibleParty: this.state.responsibleParty,
      module: this.state.module,
      category: this.state.category,
      subCategory: this.state.subCategory,
      clientReportedIssue: this.state.clientReportedIssue,
      creator: this.state.creator,
      emailId: this.state.emailId,
      conversationId: this.state.conversationId,
      attachments: this.state.attachments,
      ewsUrl: this.state.ewsUrl,
      attachmentToken: this.state.attachmentToken,
    };

    ApiService.saveTicket(ticket).then(result => {
      if (result.status === "success") {
        this.setState({ ticketId: result.ticket.ticketId, saveState: "saved" });
      } else if (result.status === "failed") {
        this.setState({ ticketId: result.ticket.ticketId, saveState: "error" });
      }
    });
  };

  isValid = async () => {
    return (
      this.state.validation.channel &&
      this.state.validation.status &&
      this.state.validation.subject &&
      this.state.validation.priority &&
      this.state.validation.client &&
      this.state.validation.description &&
      this.state.validation.responsibleParty &&
      this.state.validation.module &&
      this.state.validation.category &&
      this.state.validation.subCategory &&
      this.state.validation.clientReportedIssue &&
      this.state.validation.creator
    );
  };

  validate = async () => {
    let validation = {
      channel: undefined,
      status: undefined,
      subject: undefined,
      priority: undefined,
      client: undefined,
      description: undefined,
      responsibleParty: undefined,
      module: undefined,
      category: undefined,
      subCategory: undefined,
      clientReportedIssue: undefined,
      creator: undefined,
    };

    if (this.state.subject === undefined || this.state.subject === "") {
      validation.subject = false;
    } else {
      validation.subject = true;
    }

    if (this.state.description === undefined || this.state.description === "") {
      validation.description = false;
    } else {
      validation.description = true;
    }

    if (this.state.channel === undefined) {
      validation.channel = false;
    } else {
      validation.channel = true;
    }

    if (this.state.status === undefined) {
      validation.status = false;
    } else {
      validation.status = true;
    }

    if (this.state.priority === undefined) {
      validation.priority = false;
    } else {
      validation.priority = true;
    }

    if (this.state.client === undefined) {
      validation.client = false;
    } else {
      validation.client = true;
    }

    if (this.getResponsiblePartyString() === "N/A") {
      validation.responsibleParty = false;
    } else {
      validation.responsibleParty = true;
    }

    if (this.state.module === undefined) {
      validation.module = false;
    } else {
      validation.module = true;
    }

    if (this.state.category === undefined) {
      validation.category = false;
    } else {
      validation.category = true;
    }

    if (this.state.subCategory === undefined) {
      validation.subCategory = false;
    } else {
      validation.subCategory = true;
    }

    if (this.state.emailId === undefined || this.state.emailId === "") {
      validation.emailId = false;
    } else {
      validation.emailId = true;
    }

    if (this.state.conversationId === undefined || this.state.conversationId === "") {
      validation.conversationId = false;
    } else {
      validation.conversationId = true;
    }

    if (this.state.clientReportedIssue === undefined) {
      validation.clientReportedIssue = false;
    } else {
      validation.clientReportedIssue = true;
    }

    if (this.state.creator === undefined) {
      validation.creator = false;
    } else {
      validation.creator = true;
    }

    this.setState({ validation: validation });
  };

  getTicketUrl = () => {
    return `http://www.google.com/${this.state.ticketId}`;
  };

  onChannelChanged = (event, item) => {
    let responsibleParty = this.getResponsiblePartyArray(this.state.client, item);
    this.setState({ channel: item, responsibleParty: responsibleParty });
  };

  onStatusChanged = (event, item) => {
    this.setState({ status: item });
  };

  onSubjectChanged = (event, newValue) => {
    this.setState({ subject: newValue || "" });
  };

  onPriorityChanged = (event, item) => {
    this.setState({ priority: item });
  };

  onClientChanged = (event, item) => {
    let responsibleParty = this.getResponsiblePartyArray(item, this.state.channel);
    this.setState({ client: item, responsibleParty: responsibleParty });
  };

  onDescriptionChanged = (event, newValue) => {
    this.setState({ description: newValue || "" });
  };

  onModuleChanged = (event, item) => {
    this.setState({ module: item, category: undefined, subCategory: undefined });
  };

  onCategoryChanged = (event, item) => {
    this.setState({ category: item, subCategory: undefined });
  };

  onSubCategoryChanged = (event, item) => {
    this.setState({ subCategory: item });
  };

  onClientReportedIssueChanged = (event, checked) => {
    this.setState({ clientReportedIssue: checked });
  };

  onCreatorChanged = (event, item) => {
    this.setState({ creator: item });
  };

  getResponsiblePartyArray = (client, channel) => {
    if (client === undefined || channel === undefined) {
      return [];
    }

    let responsibleParties = [];
    switch (channel.key) {
      case "Send to BCM":
        responsibleParties = client.data.bcmResources;
        break;
      case "Send to RCM":
        responsibleParties = client.data.rcmResources;
        break;
      case "Send to AR":
        responsibleParties = client.data.arResources;
        break;
      case "Send to Production":
        responsibleParties = client.data.productionResources;
        break;
      case "Send to CCH":
        responsibleParties = client.data.cchResources;
        break;
      case "Send to Credentialing":
        responsibleParties = [
          {
            id: 0,
            name: "Credentialing",
            email: "credentialing@c.com",
            type: "Group",
          },
        ];
      case "Send to Patient Services":
        responsibleParties = [
          {
            id: 0,
            name: "Patient Services",
            email: "ps@c.com",
            type: "Group",
          },
        ];
      case "Send to Billing Analysis":
        responsibleParties = [
          {
            id: 0,
            name: "Billing Analysis",
            email: "ba@c.com",
            type: "Group",
          },
        ];
    }
    return responsibleParties;
  };

  getResponsiblePartyString = () => {
    if (this.state.client === undefined || this.state.channel === undefined) {
      return "N/A";
    }
    let responsibleParties = [];
    switch (this.state.channel.key) {
      case "Send to BCM":
        responsibleParties = this.state.client.data.bcmResources;
        break;
      case "Send to RCM":
        responsibleParties = this.state.client.data.rcmResources;
        break;
      case "Send to AR":
        responsibleParties = this.state.client.data.arResources;
        break;
      case "Send to Production":
        responsibleParties = this.state.client.data.productionResources;
        break;
      case "Send to CCH":
        responsibleParties = this.state.client.data.cchResources;
        break;
      case "Send to Credentialing":
        return "Credentialing Team";
      case "Send to Patient Services":
        return "Patient Services Team";
      case "Send to Billing Analysis":
        return "Billing Analysis Team";
    }

    return responsibleParties === null || responsibleParties.length === 0
      ? "N/A"
      : responsibleParties.map(x => x.name).join(", ");
  };

  _onRenderOption = option => {
    const isActive = option.data && option.data.active;
    const colorValue = isActive === true ? "black" : "red";

    return (
      <div>
        <span style={{ color: colorValue }}>{option.text}</span>
      </div>
    );
  };

  _onRenderTitle = options => {
    const option = options[0];
    const isActive = option.data && option.data.active;
    const colorValue = isActive === true ? "black" : "red";

    return (
      <div>
        <span style={{ color: colorValue }}>{option.text}</span>
      </div>
    );
  };

  _onRenderClientDropdownLabel = props => {
    return (
      <Stack horizontal verticalAlign="center">
        <Label>{props.label}</Label>
        {this.state.clientList.length === 0 && <Spinner style={{ marginLeft: 5 }} size={SpinnerSize.xSmall}></Spinner>}
      </Stack>
    );
  };

  _onRenderModuleDropdownLabel = props => {
    return (
      <Stack horizontal verticalAlign="center">
        <Label>{props.label}</Label>
        {this.state.moduleList.length === 0 && <Spinner style={{ marginLeft: 5 }} size={SpinnerSize.xSmall}></Spinner>}
      </Stack>
    );
  };

  _onRenderCreatorDropdownLabel = props => {
    return (
      <Stack horizontal verticalAlign="center">
        <Label>{props.label}</Label>
        {this.state.teamMemberList.length === 0 && (
          <Spinner style={{ marginLeft: 5 }} size={SpinnerSize.xSmall}></Spinner>
        )}
      </Stack>
    );
  };

  saveButtonDisbled = () => {
    return this.state.saveState !== "unsaved";
  };

  onAttachmentToggle = (id, checked) => {
    let attachments = this.state.attachments;

    let attachmentToUpdate = attachments.filter(x => x.id === id)[0];
    attachmentToUpdate.selected = checked;

    let updatedAttachments = attachments.map(x => (x.id !== id ? x : attachmentToUpdate));
    this.setState({ attachments: updatedAttachments });
  };

  attachmentList = () => {
    if (this.state.attachments.length === 0) {
      return <Label>No Attachments</Label>;
    }

    return this.state.attachments.map(x => {
      return (
        <AttachmentItem
          key={x.id}
          label={x.name}
          id={x.id}
          checked={x.selected}
          size={x.size}
          onAttachmentToggle={this.onAttachmentToggle}
        />
      );
    });
  };

  getTicketMessage = () => {
    if (this.state.saveState === "saved")
      return (
        <>
          <FontIcon style={{ color: "#107c10" }} iconName="SkypeCircleCheck"></FontIcon>
          <span style={{ marginLeft: 10 }}>Ticket has been saved</span>
        </>
      );
    if (this.state.saveState === "error")
      return (
        <>
          <FontIcon style={{ color: "#a80000" }} iconName="Error"></FontIcon>
          <span style={{ marginLeft: 10 }}>Ticket could not be saved</span>
        </>
      );
    return "Ticket already exists for this email";
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    const containerStackTokens = { childrenGap: 5, padding: 10 };

    if (!isOfficeInitialized || this.state.ticketId === undefined) {
      return (
        <Stack>
          <div>
            <Spinner label="Loading email data" />
          </div>
        </Stack>
      );
    }

    if (this.state.emailId !== undefined && this.state.ticketId !== undefined && this.state.ticketId !== 0) {
      return (
        <Stack>
          <Stack.Item align="center">{this.getTicketMessage()}</Stack.Item>
          {this.state.saveState !== "error" && (
            <Stack.Item align="center">
              <DefaultButton href={this.getTicketUrl()} target="_blank">
                Open Ticket
              </DefaultButton>
            </Stack.Item>
          )}
        </Stack>
      );
    }

    return (
      <Stack tokens={containerStackTokens}>
        <TextField
          label="Subject"
          required={true}
          value={this.state.subject}
          onChange={this.onSubjectChanged}
          errorMessage={
            this.state.validation.subject !== undefined && this.state.validation.subject === false
              ? "Subject is required"
              : ""
          }
        ></TextField>
        <TextField
          label="Description"
          required={true}
          value={this.state.description}
          onChange={this.onDescriptionChanged}
          multiline
          rows={5}
          autoAdjustHeight
          errorMessage={
            this.state.validation.description !== undefined && this.state.validation.description === false
              ? "Description is required"
              : ""
          }
        ></TextField>

        <Dropdown
          label="Client Name"
          onRenderLabel={this._onRenderClientDropdownLabel}
          selectedKey={this.state.client ? this.state.client.key : undefined}
          placeholder="Select a Client"
          onRenderTitle={this._onRenderTitle}
          onRenderOption={this._onRenderOption}
          options={this.state.clientList}
          onChange={this.onClientChanged}
          errorMessage={
            this.state.validation.client !== undefined && this.state.validation.client === false
              ? "Client is required"
              : ""
          }
        ></Dropdown>

        <Dropdown
          label="Channel"
          selectedKey={this.state.channel ? this.state.channel.key : undefined}
          placeholder="Select a Channel"
          errorMessage={
            this.state.validation.channel !== undefined && this.state.validation.channel === false
              ? "Channel is required"
              : ""
          }
          options={channelList}
          onChange={this.onChannelChanged}
        ></Dropdown>

        <Label>Responsible Party</Label>
        <p style={{ color: this.getResponsiblePartyString() === "N/A" ? "red" : "black" }}>
          {this.getResponsiblePartyString()}
        </p>

        <Dropdown
          label="Status"
          selectedKey={this.state.status ? this.state.status.key : undefined}
          placeholder="Select a Status"
          options={statusList}
          onChange={this.onStatusChanged}
          errorMessage={
            this.state.validation.status !== undefined && this.state.validation.status === false
              ? "Status is required"
              : ""
          }
        ></Dropdown>

        <Dropdown
          label="Priority"
          selectedKey={this.state.priority ? this.state.priority.key : undefined}
          placeholder="Select a Priority"
          options={priorityList}
          onChange={this.onPriorityChanged}
          errorMessage={
            this.state.validation.priority !== undefined && this.state.validation.priority === false
              ? "Priority is required"
              : ""
          }
        ></Dropdown>

        <Dropdown
          label="Module"
          onRenderLabel={this._onRenderModuleDropdownLabel}
          selectedKey={this.state.module ? this.state.module.key : undefined}
          placeholder="Select a Module"
          options={this.getModules()}
          onChange={this.onModuleChanged}
          errorMessage={
            this.state.validation.module !== undefined && this.state.validation.module === false
              ? "Module is required"
              : ""
          }
        ></Dropdown>

        <Dropdown
          label="Category"
          onRenderLabel={this._onRenderModuleDropdownLabel}
          selectedKey={this.state.category ? this.state.category.key : undefined}
          placeholder="Select a Category"
          options={this.getCategories()}
          onChange={this.onCategoryChanged}
          errorMessage={
            this.state.validation.category !== undefined && this.state.validation.category === false
              ? "Category is required"
              : ""
          }
        ></Dropdown>

        <Dropdown
          label="Sub Category"
          onRenderLabel={this._onRenderModuleDropdownLabel}
          selectedKey={this.state.subCategory ? this.state.subCategory.key : undefined}
          placeholder="Select a Sub Category"
          options={this.getSubCategories()}
          onChange={this.onSubCategoryChanged}
          errorMessage={
            this.state.validation.subCategory !== undefined && this.state.validation.subCategory === false
              ? "Sub Category is required"
              : ""
          }
        ></Dropdown>

        <Toggle
          label="Client Reported Issue"
          onText="Yes"
          offText="No"
          onChange={this.onClientReportedIssueChanged}
          checked={this.state.clientReportedIssue}
        ></Toggle>

        <Dropdown
          label="Creator"
          onRenderLabel={this._onRenderCreatorDropdownLabel}
          selectedKey={this.state.creator ? this.state.creator.key : undefined}
          placeholder="Select a Person"
          options={this.state.teamMemberList}
          onChange={this.onCreatorChanged}
        ></Dropdown>

        <Label>Attachments</Label>
        {this.attachmentList()}

        {this.state.saveState === "saving" && <Spinner label="Saving..."></Spinner>}
        <PrimaryButton style={{ marginTop: 15 }} disabled={this.saveButtonDisbled()} onClick={this.onSaveClicked}>
          Save
        </PrimaryButton>
      </Stack>
    );
  }
}
