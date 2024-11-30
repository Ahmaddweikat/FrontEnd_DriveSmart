import Tracktor from "../../../../assets/GetALicense/svgs/tractor.svg";
import Car from "../../../../assets/GetALicense/svgs/car.svg";
import Trcuk from "../../../../assets/GetALicense/svgs/truck.svg";
import TrcukAbove15Ton from "../../../../assets/GetALicense/svgs/oil-truck.svg";
import TurckLoaded from "../../../../assets/GetALicense/svgs/truck-load.svg";
import Taxi from "../../../../assets/GetALicense/svgs/taxi.svg";
import Bus from "../../../../assets/GetALicense/svgs/bus.svg";
import FireTruck from "../../../../assets/GetALicense/svgs/fire-truck.svg";
import Scooter from "../../../../assets/GetALicense/svgs/scooter.svg";
import Motor from "../../../../assets/GetALicense/svgs/motor-bike-alt.svg";

const licenseInfo = [
  {
    title: "Tractor License / Class (01) Tractor Driving License",
    requirements: [
      "Must be at least 16 years old.",
      "Fill out the specific application form.",
      "Pass the vision test at the traffic department.",
      "Complete a tractor driving course from a Ministry of Transport and Communications approved school.",
      "Pass the practical driving test.",
      "Pay the required fees.",
    ],
    icon: Tracktor,
    iconAlt: "Tractor Icon",
  },
  {
    title: "Private license / Driving license class (B)",
    requirements: [
      "The age must not be less than 17 years to learn, conduct tests and reserve the license until reaching 17.5 years.",
      "Filling out the special form.",
      "Conducting an eye examination at the medical institution of the Traffic Department.",
      "Applying for the theoretical examination (theory).",
      "Applying for a practical driving test.",
      "Paying the due fees.",
    ],
    icon: Car,
    iconAlt: "Car Icon",
  },
  {
    title:
      "Commercial driving license / Class (C1) commercial driving license up to 15 tons",
    requirements: [
      "The applicant must not be less than (17.5) years old.",
      "Medical examination from the medical institution of the Traffic Department.",
      "Filling out the special signs form.",
      "Conducting a signs examination.",
      "Applying for a practical driving test.",
      "Paying the due fees.",
    ],
    icon: Trcuk,
    iconAlt: "Truck Icon",
  },
  {
    title: "Driving license class (C) for cargo over 15 tons",
    requirements: [
      "The applicant must be at least 19 years old.",
      "One year seniority on a freight license up to 15 tons (C1).",
      "Heavy cargo course certificate from an institute accredited and licensed by the Ministry of Transport and Communications.",
      "Medical certificate from the Traffic Department Medical Institution.",
      "Conducting the theoretical examination (theory).",
      "Applying for a practical driving test.",
      "Paying the due fees.",
    ],
    icon: TrcukAbove15Ton,
    iconAlt: "Truck above 15 Ton Icon",
  },
  {
    title:
      "Class (E) driving license for a locomotive and trailer/trailer licence",
    requirements: [
      "The applicant must not be less than 20 years old.",
      "One year seniority on a heavy truck license C upon submitting the application.",
      "A heavy truck course certificate from an institute licensed by the Ministry of Transport and Communications.",
      "A medical examination from the Medical Institution of the Traffic Department.",
      "A school certificate up to the fifth grade according to the executive regulations.",
      "Apply for the practical driving test.",
      "Pay the required fees.",
    ],
    icon: TurckLoaded,
    iconAlt: "Truck Loaded Icon",
  },
  {
    title: "Public license / Driving license (D1) public taxi",
    requirements: [
      "The applicant must be at least 21 years old.",
      "Two years seniority on a private or commercial C or B license.",
      "A public course certificate from an accredited institute licensed by the Ministry of Transport and Communications.",
      "A medical examination from the medical institution at the Traffic Department.",
      "A school certificate up to the second year of middle school, certified as successful according to the executive regulations.",
      "A certificate of good conduct from the Ministry of Interior.",
      "Theoretical examination (theory).",
      "Apply for the practical driving test.",
      "Payment of the required fees.",
    ],
    icon: Taxi,
    iconAlt: "Taxi Icon",
  },
  {
    title: "Public bus license / Driving license (D) public bus",
    requirements: [
      "The applicant must not be less than 21 years old.",
      "Two years seniority on a commercial (C1) license.",
      "A public course certificate from an accredited institute licensed by the Ministry of Transport and Communications.",
      "A medical examination from the medical institution at the Traffic Department",
      "A school certificate up to the second year of middle school certified (successful) according to the executive regulations.",
      "A certificate of good conduct from the Ministry of Interior.",
      "Theoretical examination (theory).",
      "Payment of the required fees.",
      "Apply for the practical driving test.",
      "Payment of the due fees.",
    ],
    icon: Bus,
    iconAlt: "Bus Icon",
  },
  {
    title: "Fire truck driving license",
    requirements: [
      "Driving license (C1) and above for two years or more.",
      "Civil Defense course certificate from Civil Defense according to the Ministry's agreement.",
      "Medical examination from the Medical Institution of the Traffic Department.",
      "At least 10 years of study.",
      "Good conduct and behavior certificate from the Ministry of Interior.",
      "Conducting theoretical and practical tests from Civil Defense.",
      "Certificate approval from the licensing authority.",
    ],
    icon: FireTruck,
    iconAlt: "Fire Truck Icon",
  },
  {
    title: "Motorcycle driving license (A1) up to 500 cm3",
    requirements: [
      "The applicant must be at least 17 years old.",
      "CApproval of the student's guardian.",
      "An eye test from the medical institution at the Traffic Department.",
      "Passing the theoretical test (theory).",
      "Passing a practical driving test.",
    ],
    icon: Scooter,
    iconAlt: "Scooter Icon",
  },
  {
    title: "Motorcycle driving license (A) above 500 cc",
    requirements: [
      "The applicant must be at least 21 years old.",
      "One year seniority on a (A1) license.",
      "An eye test from the medical institution at the Traffic Department.",
      "Passing the theoretical test (theory).",
      "Passing a practical driving test.",
    ],
    icon: Motor,
    iconAlt: "Motor Icon",
  },
];
export default licenseInfo;
