type TransferExportRow = {
  patientName: string;
  patientMrn: string;
  fromWard: string;
  fromBed: string;
  toWard: string;
  toBed: string;
  requestedBy: string;
  requestedAt: string;
  status: string;
};

export const buildTransfersExportHtml = (transfers: TransferExportRow[]) => {
  if (transfers.length === 0) {
    return "";
  }

  return `
    <h1>Inter-Ward Transfers</h1>
    <p>Total Transfers: ${transfers.length}</p>

    <table>
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>MRN</th>
          <th>From Ward</th>
          <th>From Bed</th>
          <th>To Ward</th>
          <th>To Bed</th>
          <th>Requested By</th>
          <th>Requested At</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        ${transfers
          .map(
            (t) => `
              <tr>
                <td>${t.patientName}</td>
                <td>${t.patientMrn}</td>
                <td>${t.fromWard}</td>
                <td>${t.fromBed}</td>
                <td>${t.toWard}</td>
                <td>${t.toBed}</td>
                <td>${t.requestedBy}</td>
                <td>${new Date(t.requestedAt).toLocaleString()}</td>
                <td>${t.status}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};
