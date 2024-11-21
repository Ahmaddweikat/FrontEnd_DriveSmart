import MonitorIcon from "@mui/icons-material/Monitor";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MedicationIcon from "@mui/icons-material/Medication";

export const cards = [
  {
    id: 1,
    title: "Medical Examination",
    icon: (
      <MedicationIcon
        style={{ color: "#72b626", width: "50px", height: "50px" }}
      />
    ),
    description:
      "The medical examination is the first step after completing the transaction at the driving school. You can apply for the medical examination at the Health Department on Sundays, Mondays, and Thursdays from 08:00 am to 10:30 am. It is preferable to go as early as possible. Students with a shipping license and above should not have breakfast before the examination.",
    additionalInfo: "Medical Examination / Health Department",
  },
  {
    id: 2,
    title: "Theoretical Examination",
    icon: (
      <MonitorIcon
        style={{ color: "#72b626", width: "50px", height: "50px" }}
      />
    ),
    description:
      "After studying the theory well and practicing the theory training apply for the official theory exam any day from Sunday to Thursday, and on the day designated for the exam you must be present at the department from 08:30 in the morning and wait for your turn.",
    additionalInfo: "Theoretical Examination (Theory) / Traffic Department",
  },
  {
    id: 3,
    title: "Practical Examination",
    icon: (
      <DirectionsBusIcon
        style={{ color: "#72b626", width: "50px", height: "50px" }}
      />
    ),
    description:
      "The last step after mastering the basic driving skills is to take the practical driving test. You can take the official test any day from Sunday to Thursday by prior appointment through the driving school. As for the test time, it is determined in advance (and is not considered an exact date).",
    additionalInfo: "Practical examination (Test) / Traffic Department",
  },
  {
    id: 4,
    title: "Obtaining the License",
    icon: (
      <CreditCardIcon
        style={{ color: "#72b626", width: "50px", height: "50px" }}
      />
    ),
    description:
      "After passing the practical exam (test), you can obtain a driving license from the licensing authority (Traffic Department) any day from Sunday to Thursday from 08:00 AM to 01:00 PM, with the necessity of bringing your personal ID card and going in person to receive the license.",
    additionalInfo: "Obtaining a license / Traffic department",
  },
];
