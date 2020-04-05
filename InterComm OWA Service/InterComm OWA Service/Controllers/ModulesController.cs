using InterComm_OWA_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InterComm_OWA_Service.Controllers
{
    [EnableCors(origins: "https://localhost:3000", headers: "*", methods: "*")]
    public class ModulesController : ApiController
    {
        [HttpGet]
        public List<TicketModule> Get()
        {
            return Dataset.Modules;
        }
    }
}
