using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class Client
    {
        [JsonProperty(PropertyName="id")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }

        [JsonProperty(PropertyName = "bcmResources")]
        public List<Resource> BcmResources { get; set; }
        
        [JsonProperty(PropertyName = "rcmResources")]
        public List<Resource> RcmResources { get; set; }

        [JsonProperty(PropertyName = "productionResources")]
        public List<Resource> ProductionResources { get; set; }

        [JsonProperty(PropertyName = "arResources")]
        public List<Resource> ArResources { get; set; }

        [JsonProperty(PropertyName = "cchResources")]
        public List<Resource> CchResources { get; set; }
    }
}