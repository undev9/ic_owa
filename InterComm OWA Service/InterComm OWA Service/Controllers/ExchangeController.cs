using InterComm_OWA_Service.Models;
using Microsoft.Exchange.WebServices.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InterComm_OWA_Service.Controllers
{
    [EnableCors(origins: "https://localhost:3000", headers: "*", methods: "*")]
    public class ExchangeController : ApiController
    {
        // GET: api/Exchange
        [HttpPost]
        [Route("api/exchange")]
        public IEnumerable<string> Get([FromBody] AttachmentRequest request)
        {
            ExchangeService service = new ExchangeService();
            service.Credentials = new OAuthCredentials(request.AttachmentToken);
            service.Url = new Uri(request.EWSURL);

            List<string> attachmentIds = request.Attachments.Select(x => x.ID).ToList();
            List<string> attachmentNames = new List<string>();

            var response = service.GetAttachments(attachmentIds.ToArray(), null, new PropertySet(BasePropertySet.FirstClassProperties, ItemSchema.MimeContent));

            if (response.OverallResult == ServiceResult.Success)
            {
                foreach (var attachmentResponse in response)
                {
                    attachmentNames.Add(attachmentResponse.Attachment.Name);

                    if (attachmentResponse.Attachment is FileAttachment)
                    {
                        FileAttachment a = attachmentResponse.Attachment as FileAttachment;
                        using (Stream ms = new MemoryStream(a.Content))
                        using (FileStream fs = new FileStream($@"C:\Users\Af\Desktop\{attachmentResponse.Attachment.Name}", FileMode.Create, FileAccess.Write))
                        {
                            byte[] bytes = new byte[ms.Length];
                            ms.Read(bytes, 0, (int)ms.Length);
                            fs.Write(bytes, 0, bytes.Length);
                        }
                    }

                    if(attachmentResponse.Attachment is ItemAttachment)
                    {
                        ItemAttachment attachment = attachmentResponse.Attachment as ItemAttachment;

                    }
                }
            }

            return attachmentNames;
        }

        // GET: api/Exchange/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Exchange
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Exchange/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Exchange/5
        public void Delete(int id)
        {
        }
    }
}
