using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace InterComm_OWA_Service.Models
{
    public static class Dataset
    {
        [JsonProperty(PropertyName ="clients")]
        public static List<Client> Clients = new List<Client>
        {
            new Client
            {
                ID = 1,
                Name = "ClientA",
                Active = true,
                BcmResources = new List<Resource>
                {
                    new Resource
                    {
                        ID = 10,
                        Name = "Aliyah Cross",
                        Email = "aliyahcross@contoso.com",
                        Type="Person"
                    },
                    new Resource
                    {
                        ID = 11,
                        Name = "Bayley Benjamin",
                        Email = "bayleybenjamin@contoso.com",
                        Type="Person"
                    }
                },
                RcmResources = new List<Resource>
                {
                    new Resource
                    {
                        ID = 20,
                        Name = "Elena Strong",
                        Email = "elenastrong@contoso.com",
                        Type="Person"
                    }
                },
                ProductionResources = new List<Resource>
                {
                    new Resource
                    {
                        ID = 30,
                        Name = "Haider Wickens",
                        Email = "haiderwickens.n@contoso.com",
                        Type="Person"
                    }
                },
                ArResources = new List<Resource>
                {
                    new Resource
                    {
                        ID = 40,
                        Name = "Amelia-Mae Ortega",
                        Email = "ameliamaeortega@contoso.com",
                        Type="Person"
                    }
                },
                CchResources = new List<Resource>
                {
                    new Resource
                    {
                        ID = 50,
                        Name = "Michaela Holding",
                        Email = "michaelaholding@contoso.com",
                        Type="Person"
                    }
                },
            },
            new Client
            {
                ID=2,
                Name="Client B",
                Active=true
            },
            new Client
            {
                ID=3,
                Name="Client C",
                Active=false
            },
            new Client
            {
                ID=4,
                Name="Client D",
                Active=true
            }
        };

        [JsonProperty(PropertyName = "modules")]
        public static List<TicketModule> Modules = new List<TicketModule>
        {
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category A",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category A",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category A",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category B",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category B",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category B",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category C",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category C",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module A",
            Category= "MA Category C",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category A",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category A",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category A",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category B",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category B",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category B",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category C",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category C",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module B",
            Category= "MB Category C",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category A",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category A",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category A",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category B",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category B",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category B",
            SubCategory= "Sub Category C"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category C",
            SubCategory= "Sub Category A"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category C",
            SubCategory= "Sub Category B"
          },
          new TicketModule
          {
            Module= "Module C",
            Category= "MC Category C",
            SubCategory= "Sub Category C"
          }
        };

        [JsonProperty(PropertyName = "teamMembers")]
        public static List<Resource> TeamMembers = new List<Resource>
        {
            new Resource
            {
                ID=101,
                Name="Rubie Erickson",
                Email="rubiee.erickson@contoso.com"
            },
            new Resource
            {
                ID=102,
                Name="Amiyah Childs",
                Email="amiyahchilds@contoso.com"
            },
            new Resource
            {
                ID=103,
                Name="Eleni Manning",
                Email="elenimanning@contoso.com"
            }
        };

        [JsonProperty(PropertyName = "tickets")]
        public static List<Ticket> Tickets = new List<Ticket>
        {
            new Ticket
            {
                TicketId=10001,
                EmailId="AAMkADcwYTRiYmJmLTQyMjEtNGJjNi1iZjY1LWYzZDQ0OWUyMzE2OABGAAAAAAC5PctRK5afRKI86OLuYtttBwAxZoDtFywpR4bgtNXGGf02AAAAAAEJAAAxZoDtFywpR4bgtNXGGf02AABTJ/KlAAA="
            },
            new Ticket
            {
                TicketId=10002,
                EmailId="AAMkADcwYTRiYmJmLTQyMjEtNGJjNi1iZjY1LWYzZDQ0OWUyMzE2OABGAAAAAAC5PctRK5afRKI86OLuYtttBwAxZoDtFywpR4bgtNXGGf02AAAAAAEMAAAxZoDtFywpR4bgtNXGGf02AABTJ6N2AAA="
            }
        };
    }
}