using InterComm_OWA_Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using InterComm_OWA_Service.Services;

namespace InterComm_OWA_Service.Controllers
{
    [EnableCors(origins: "https://localhost:3000", headers: "*", methods: "*")]
    public class TicketsController : ApiController
    {
        [HttpPost]
        [Route("api/tickets")]
        public Ticket Get([FromBody] TicketRequest request)
        {
            return Dataset.Tickets.FirstOrDefault(x => x.EmailId == request.EmailId);
            //return new Ticket();
        }

        [HttpPost]
        [Route("api/tickets/save")]
        public TicketSaveResponse Save([FromBody] Ticket ticket)
        {
            if(ticket.Attachments!= null && ticket.Attachments.Count != 0)
            {
                if(string.IsNullOrEmpty(ticket.AttachmentToken))
                {
                    return new TicketSaveResponse
                    {
                        Status = "failed",
                        Message = "Attachment token missing",
                        Ticket = ticket
                    };
                }

                if (string.IsNullOrEmpty(ticket.EWSURL))
                {
                    return new TicketSaveResponse
                    {
                        Status = "failed",
                        Message = "EWS Url missing",
                        Ticket = ticket
                    };
                }

                if(string.IsNullOrEmpty (ticket.EmailId))
                {
                    return new TicketSaveResponse
                    {
                        Status = "failed",
                        Message = "EmailId missing",
                        Ticket = ticket
                    };
                }

                if (string.IsNullOrEmpty(ticket.ConversationId))
                {
                    return new TicketSaveResponse
                    {
                        Status = "failed",
                        Message = "ConversationId missing",
                        Ticket = ticket
                    };
                }
            }

            //get attachments
            var selectedAttachments = ticket.Attachments.Where(x => x.Selected);
            if (selectedAttachments.Count() != 0)
            {
                AttachmentRequest attachmentRequest = new AttachmentRequest
                {
                    Attachments = selectedAttachments.ToArray(),
                    AttachmentToken = ticket.AttachmentToken,
                    EWSURL = ticket.EWSURL
                };
                ExchangeAttachmentService.GetAttachments(attachmentRequest);
            }

            //save ticket
            ticket.TicketId = 9999;

            return new TicketSaveResponse
            {
                Status = "success",
                Ticket = ticket
            };
        }
    }
}