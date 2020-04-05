using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class AttachmentRequest
    {
        [JsonProperty(PropertyName ="attachmentToken")]
        public string AttachmentToken { get; set; }

        [JsonProperty(PropertyName = "ewsUrl")]
        public string EWSURL { get; set; }

        [JsonProperty(PropertyName = "service")]
        public string Service { get; set; }

        [JsonProperty(PropertyName = "attachments")]
        public AttachmentDetail[] Attachments { get; set; }
    }
}