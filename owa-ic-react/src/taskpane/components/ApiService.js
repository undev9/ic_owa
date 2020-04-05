import axios from "axios";

const baseUrl = "https://localhost:44303/api";

const getClients = () => {
  const req = axios.get(`${baseUrl}/clients`);
  return req.then(response => {
    return response.data;
  });
};

const getModules = () => {
  const req = axios.get(`${baseUrl}/modules`);
  return req.then(response => {
    return response.data;
  });
};

const getTeamMembers = () => {
  const req = axios.get(`${baseUrl}/teamMembers`);
  return req.then(response => {
    return response.data;
  });
};

const getTicketByEmailId = emailId => {
  const req = axios.post(`${baseUrl}/tickets`, {
    emailId: emailId,
  });

  return req.then(response => {
    return response.data;
  });
};

const saveTicket = async ticket => {
  let formattedTicket = {
    ticketId: ticket.ticketId,
    emailId: ticket.emailId,
    conversationId: ticket.conversationId,
    channel: ticket.channel.key,
    status: ticket.status.key,
    subject: ticket.subject,
    priority: ticket.priority.key,
    client: {
      id: ticket.client.key,
      name: ticket.client.text,
    },
    description: ticket.description,
    responsibleParty: ticket.responsibleParty,
    module: ticket.module.key,
    category: ticket.category.key,
    subCategory: ticket.subCategory.key,
    clientReportedIssue: ticket.clientReportedIssue,
    creator: {
      id: ticket.creator.key,
      name: ticket.creator.text,
      email: ticket.creator.data.email,
    },
    attachments: ticket.attachments,
    ewsUrl: ticket.ewsUrl,
    attachmentToken: ticket.attachmentToken,
  };

  const req = axios.post(`${baseUrl}/tickets/save`, formattedTicket);

  return req.then(response => {
    return response.data;
  });
};

const getAttachments = serviceRequest => {
  const req = axios.post(`${baseUrl}/exchange`, serviceRequest);
  return req.then(response => {
    return response.data;
  });
};

export default { getClients, getModules, getTeamMembers, getTicketByEmailId, saveTicket, getAttachments };
