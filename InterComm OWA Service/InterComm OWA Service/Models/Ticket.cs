using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class Ticket
    {
        [JsonProperty(PropertyName ="ticketId")]
        public int TicketId { get; set; }

        [JsonProperty(PropertyName = "emailId")]
        public string EmailId { get; set; }

        [JsonProperty(PropertyName = "conversationId")]
        public string ConversationId { get; set; }

        [JsonProperty(PropertyName = "channel")]
        public string Channel { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "subject")]
        public string Subject { get; set; }

        [JsonProperty(PropertyName = "priority")]
        public string Priority { get; set; }

        [JsonProperty(PropertyName = "client")]
        public Client Client { get; set; }
        
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        
        [JsonProperty(PropertyName = "responsibleParty")]
        public List<Resource> ResponsibleParty { get; set; }
        
        [JsonProperty(PropertyName = "module")]
        public string Module { get; set; }
        
        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }
        
        [JsonProperty(PropertyName = "subCategory")]
        public string SubCategory { get; set; }
        
        [JsonProperty(PropertyName = "clientReportedIssue")]
        public bool ClientReportedIssue { get; set; }
        
        [JsonProperty(PropertyName = "creator")]
        public Resource Creator { get; set; }
        
        [JsonProperty(PropertyName = "attachments")]
        public List<AttachmentDetail> Attachments { get; set; }

        [JsonProperty(PropertyName = "attachmentToken")]
        public string AttachmentToken { get; set; }

        [JsonProperty(PropertyName = "ewsUrl")]
        public string EWSURL { get; set; }
    }
}