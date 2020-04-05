using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using InterComm_OWA_Service.Models;
using Microsoft.Exchange.WebServices.Data;

namespace InterComm_OWA_Service.Services
{
    public static class ExchangeAttachmentService
    {
        public static AttachmentDetail[] GetAttachments(AttachmentRequest request)
        {
            ExchangeService service = new ExchangeService();
            service.Credentials = new OAuthCredentials(request.AttachmentToken);
            service.Url = new Uri(request.EWSURL);

            List<string> attachmentIds = request.Attachments.Select(x => x.ID).ToList();

            var response = service.GetAttachments(attachmentIds.ToArray(), null, new PropertySet(BasePropertySet.FirstClassProperties, ItemSchema.MimeContent));

            if (response.OverallResult == ServiceResult.Success)
            {
                foreach (var attachmentResponse in response)
                {
                    if (attachmentResponse.Attachment is FileAttachment)
                    {
                        FileAttachment attachment = attachmentResponse.Attachment as FileAttachment;
                        //using (Stream ms = new MemoryStream(a.Content))
                        //using (FileStream fs = new FileStream($@"C:\Users\Af\Desktop\{attachmentResponse.Attachment.Name}", FileMode.Create, FileAccess.Write))
                        //{
                        //    byte[] bytes = new byte[ms.Length];
                        //    ms.Read(bytes, 0, (int)ms.Length);
                        //    fs.Write(bytes, 0, bytes.Length);
                        //}
                    }

                    if (attachmentResponse.Attachment is ItemAttachment)
                    {
                        ItemAttachment attachment = attachmentResponse.Attachment as ItemAttachment;

                    }
                }
            }

            return new AttachmentDetail[] { };
        }
    }
}