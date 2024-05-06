interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface DateInfo {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface EventStatus {
  code: string;
}

interface SalesPeriod {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

interface Classification {
  primary: boolean;
  segment: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  subGenre: {
    id: string;
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  subType: {
    id: string;
    name: string;
  };
  family: boolean;
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface Link {
  href: string;
}

interface Links {
  self: Link;
  attractions: Link[];
  venues: Link[];
}

interface EmbeddedVenue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  distance: number;
  units: string;
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  state: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
  markets: {
    name: string;
    id: string;
  }[];
  dmas: {
    id: number;
  }[];
  boxOfficeInfo: {
    phoneNumberDetail: string;
    openHoursDetail: string;
    acceptedPaymentDetail: string;
    willCallDetail: string;
  };
  parkingDetail: string;
  accessibleSeatingDetail: string;
  generalInfo: {
    generalRule: string;
    childRule: string;
  };
  upcomingEvents: {
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  ada: {
    adaPhones: string;
    adaCustomCopy: string;
    adaHours: string;
  };
  _links: Links;
}

interface EmbeddedAttraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  classifications: Classification[];
  upcomingEvents: {
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  _links: Links;
}

interface Embedded {
  venues: EmbeddedVenue[];
  attractions: EmbeddedAttraction[];
}

export interface IEmbedded {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  distance: number;
  units: string;
  sales: {
    public: SalesPeriod;
  };
  dates: {
    start: DateInfo;
    end: DateInfo;
    timezone: string;
    status: EventStatus;
    spanMultipleDays: boolean;
  };
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  info: string;
  pleaseNote: string;
  priceRanges: PriceRange[];
  seatmap: {
    staticUrl: string;
  };
  accessibility: {
    ticketLimit: number;
  };
  ticketLimit: {
    info: string;
  };
  ageRestrictions: {
    legalAgeEnforced: boolean;
  };
  ticketing: {
    safeTix: {
      enabled: boolean;
    };
    allInclusivePricing: {
      enabled: boolean;
    };
  };
  _links: Links;
  _embedded: Embedded;
}

interface IPagination {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface IPaginationLinks {
  first: Link;
  self: Link;
  next: Link;
  last: Link;
}

export interface ISearchApiResponse {
  page: IPagination;
  _embedded: {
    events: IEmbedded[];
  };
  _links: IPaginationLinks;
}
