export interface AnalyticsStore {
  visits?: {
    name?: string;
    amount?: number;
    tick?: number;
    base?: number;
    modifier?: number;
    cost?: number;
  };
  views?: {
    name?: string;
    amount?: number;
    tick?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
    };
    produces?: {
      visits?: number;
      views?: number;
    };
    generators?: number;
  };
  reads?: {
    name?: string;
    amount?: number;
    tick?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
      reads?: number;
    };
    produces?: {
      visits?: number;
      views?: number;
      reads?: number;
    };
    generators?: number;
  };
  shares?: {
    name?: string;
    amount?: number;
    tick?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
      reads?: number;
      shares?: number;
    };
    produces?: {
      visits?: number;
      views?: number;
      reads?: number;
      shares?: number;
    };
    generators?: number;
  };
  downloads?: {
    name?: string;
    amount?: number;
    tick?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
      reads?: number;
      shares?: number;
      downloads?: number;
    };
    produces?: {
      visits?: number;
      views?: number;
      reads?: number;
      shares?: number;
      downloads?: number;
    };
    generators?: number;
  };
}
