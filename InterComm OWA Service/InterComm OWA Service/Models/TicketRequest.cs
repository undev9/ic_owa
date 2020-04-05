using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class TicketRequest
    {
        [JsonProperty(PropertyName ="emailId")]
        public string EmailId { get; set; }
    }
}