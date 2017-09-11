/**
 * Thanks to a few answers that helped me build this script
 * Explaining the Advanced Drive Service must be enabled: http://stackoverflow.com/a/27281729/1385429
 * Explaining how to convert to a blob: http://ctrlq.org/code/20009-convert-google-documents
 * Explaining how to convert to zip and to send the email: http://ctrlq.org/code/19869-email-google-spreadsheets-pdf
 */
function emailAsExcel() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
     dd='0'+dd;
  }

  if(mm<10) {
     mm='0'+mm;
  }

  today = yyyy+mm+dd;

  var emailRecipient = "abc@gmail";
  var emailSubject = today + " title"
  var emailBody = "email content"

  var spreadsheetId = "spreadsheetid";
  var file          = Drive.Files.get(spreadsheetId);
  var url           = file.exportLinks[MimeType.MICROSOFT_EXCEL];
  var token         = ScriptApp.getOAuthToken();
  var response      = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
  });

  var fileName = today+"DailyReport" + '.xlsx';
  var blobs   = [response.getBlob().setName(fileName)];

  GmailApp.sendEmail(
    emailRecipient,
    emailSubject,
    emailBody,
    {
      attachments: blobs
    }
  );
}
