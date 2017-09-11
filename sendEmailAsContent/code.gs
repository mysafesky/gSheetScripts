function sendEmails() {
  var ss = SpreadsheetApp.openById('sheetid');
  var dataSheet = ss.getSheetByName("WhoHasFilled");
  var dataRange = dataSheet.getRange(2, 3, 20, 1);
  var emailAdd = "xxxx@abc.com";
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
  var emailSubject = '' + today + '  Sustained Engineering Daily Report Filling Status';
  var emailText = 'email body';
  var colcnt = dataRange.getColumn();
  var rowcnt = dataRange.getRow();
  var values = dataRange.getValues();
  // Create one JavaScript object per row of data.
  // For every row object, create a personalized email from a template and send
  // it to the appropriate person.


  for (var row in values) {
    // Get a row object
    for (var col in values[row]){
    // Generate a personalized email.
    // Given a template string, replace markers (for instance ${"First Name"}) with
    // the corresponding value in a row object (for instance rowData.firstName).
       emailText = emailText + values[row][col].toString() + "\n"
    }
  }
   MailApp.sendEmail(emailAdd, emailSubject, emailText);
}
