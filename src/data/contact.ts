import { ContactConfig } from '../types';

export const contactConfig: ContactConfig = {
  officialEmail: 'info@tisscoltd.com',
  secondaryEmail: 'tisscorporation@gmail.com',
  officialPhone: null,
  officialWebsite: 'tisscoltd.com',
  registeredAddress: 'House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230',
  corporateOffice: 'House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230',

  registeredOfficeDetails: {
    title: 'Registered Office',
    house: 'House-28',
    floor: '6th Floor',
    avenueOrRoad: '9 Ave.',
    sector: 'Sec-15D',
    city: 'Uttara, Dhaka-1230',
    fullAddress: 'House-28, 6th Floor, 9 Ave., Sec-15D, Uttara, Dhaka-1230',
  },

  corporateOfficeDetails: {
    title: 'Corporate Office',
    house: 'House-59',
    floor: '6th Floor',
    avenueOrRoad: 'Road-13',
    sector: 'Sector-13',
    city: 'Uttara, Dhaka-1230',
    fullAddress: 'House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230',
  },

  inquiryNotice:
    'For corporate inquiries, commercial partnership discussions, or sector-specific service requirements, please connect directly with our corporate team or submit the inquiry form below.',
  internalVerificationNote:
    'Official corporate office in Uttara Sector-13 and registered office in Uttara Sec-15D.',
};

export const inquiryTypes = [
  'General Inquiry',
  'Business Partnership',
  'Service Inquiry',
  'Media Inquiry',
  'Career Inquiry',
  'Other',
];
