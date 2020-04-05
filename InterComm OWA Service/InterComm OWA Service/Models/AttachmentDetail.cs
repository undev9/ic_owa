using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class AttachmentDetail
    {
        [JsonProperty(PropertyName ="attachmentType")]
        public string AttachmentType { get; set; }

        [JsonProperty(PropertyName = "contentType")]
        public string ContentType { get; set; }
        
        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "isInline")]
        public bool IsInline { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "size")]
        public int Size { get; set; }

        [JsonProperty(PropertyName = "selected")]
        public bool Selected { get; set; }
    }
}