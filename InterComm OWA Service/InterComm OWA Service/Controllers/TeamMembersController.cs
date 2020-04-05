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
    public class TeamMembersController : ApiController
    {
        // GET: api/TeamMembers
        [EnableCors(origins: "https://localhost:3000", headers: "*", methods:"*")]
        public List<Resource> Get()
        {
            return Dataset.TeamMembers;
        }
    }
}
