using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public class TicketModule
    {
        [JsonProperty(PropertyName ="module")]
        public string Module { get; set; }

        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }

        [JsonProperty(PropertyName = "subCategory")]
        public string SubCategory { get; set; }
    }
}