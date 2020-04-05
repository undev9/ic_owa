using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class Resource
    {
        [JsonProperty(PropertyName ="id")]
        public int ID { get; set; }

        [JsonProperty(PropertyName  = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName  = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }
    }
}