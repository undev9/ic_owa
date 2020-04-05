using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class TicketSaveResponse
    {
        [JsonProperty(PropertyName ="status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }

        [JsonProperty(PropertyName = "ticket")]
        public Ticket Ticket { get; set; }
    }
}