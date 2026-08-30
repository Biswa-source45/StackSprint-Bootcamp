// Turns a Google Drive share link (any of the forms Drive's "Share" dialog produces)
// into the two URLs the app actually needs: an iframe-embeddable preview URL and a
// canonical "open in Drive" view URL. Single source of truth so the admin resource
// form and the legacy-data importer never drift apart on the parsing logic.

const FILE_ID_PATTERNS = [
  /\/d\/([a-zA-Z0-9_-]{10,})/, // .../file/d/{id}/view or /preview
  /[?&]id=([a-zA-Z0-9_-]{10,})/ // ...open?id={id} or uc?id={id}
];

export function extractDriveFileId(rawUrl) {
  const url = (rawUrl || '').trim();
  for (const pattern of FILE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function parseDriveLink(rawUrl) {
  const fileId = extractDriveFileId(rawUrl);
  if (!fileId) {
    throw new Error(
      'Could not read a file ID from that link. Paste the "Share" link from Google Drive (e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing).'
    );
  }
  return {
    fileId,
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    driveUrl: `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`
  };
}
