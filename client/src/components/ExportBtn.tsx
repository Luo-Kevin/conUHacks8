import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "@chakra-ui/react";

const headers = [
    { label: "Call Request", key: "call_request" },
    { label: "Appointment Date", key: "appointment_date" },
    { label: "Appointment End Date", key: "appointment_end_date" },
    { label: "Bay", key: "bay" },
    { label: "Vehicle Type", key: "vehicle_type" },
    { label: "Revenue", key: "revenue" },
    { label: "Status", key: "status" },
];

function ExportBtn({ data }: any) {
    if (data === undefined) {
        return null;
    }

    return (
        <Button mx="auto">
            <CSVLink data={data} headers={headers} filename="Schedule">
                Export
            </CSVLink>
        </Button>
    );
}

export default ExportBtn;
