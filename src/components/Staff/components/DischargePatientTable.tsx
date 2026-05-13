import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed } from "../Pages/DischargePatient";

type Props = {
  beds: Bed[];

  loading: boolean;

  dischargingId: number | null;

  handleDischarge: (
    bedId: number,
  ) => void;
};

export default function DischargePatientsTable({
  beds,
  loading,
  dischargingId,
  handleDischarge,
}: Props) {
  return (
    <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">

      <CardContent className="p-0 overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100 border-b border-slate-200">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Patient
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Age
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Diagnosis
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Bed
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Doctor
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Admitted At
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-16 text-slate-500"
                >
                  Loading patients...
                </td>

              </tr>

            ) : beds.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-16 text-slate-500"
                >
                  No admitted patients found
                </td>

              </tr>

            ) : (

              beds.map(
                (bed) => (

                  <tr
                    key={bed.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {
                        bed.patient?.name
                      }
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {
                        bed.patient?.age
                      }
                    </td>

                    <td className="px-6 py-5 text-slate-600 max-w-[220px] truncate">
                      {
                        bed.patient?.diagnosis
                      }
                    </td>

                    <td className="px-6 py-5 text-slate-700 font-medium">
                      {
                        bed.bed_number
                      }
                    </td>

                    <td className="px-6 py-5">

                      <Badge className="px-3 py-1 rounded-full bg-[#00288E]/10 text-[#00288E] text-xs font-semibold font-['Inter'] border border-[#00288E]/20">

                        {bed.status}

                      </Badge>

                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {bed.doctor}
                    </td>

                    <td className="px-6 py-5 text-slate-600 whitespace-nowrap">
                      {
                        bed.patient?.admittedAt
                      }
                    </td>

                    <td className="px-6 py-5 text-center">

                      <Button
                        disabled={
                          dischargingId ===
                          bed.id
                        }
                        onClick={() =>
                          handleDischarge(
                            bed.id,
                          )
                        }
                        className="bg-[#00288E] hover:bg-[#001F6B] text-white font-medium rounded-lg px-4 py-2 font-['Inter']"
                      >
                        {dischargingId ===
                        bed.id
                          ? "Discharging..."
                          : "Discharge"}
                      </Button>

                    </td>

                  </tr>
                ),
              )
            )}

          </tbody>

        </table>

      </CardContent>

    </Card>
  );
}