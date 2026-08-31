const SHEET_NAME = 'Waitlist';
const SPREADSHEET_ID = '1R62hDmIKxRUvZZzJOrA6GPx3Zlu4U9Df3u15rMzLG2E';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const email = String(payload.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return json_({ ok: false, error: 'A valid email is required.' });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Missing sheet: ${SHEET_NAME}`);

    const existing = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1)
      .getDisplayValues().flat().map(value => value.trim().toLowerCase());
    if (!existing.includes(email)) {
      sheet.appendRow([
        new Date(), email, payload.firmName || '', payload.firmType || '',
        payload.teamSize || '', payload.phone || '', payload.source || 'firmvault.co.in',
        'New', '',
      ]);
    }
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
