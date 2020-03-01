export interface AnalyticsStore {
  visits?: {
    name?: string;
    amount?: number;
    worth?: number;
    base?: number;
    modifier?: number;
    cost?: number;
  };
  views?: {
    name?: string;
    amount?: number;
    worth?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
    };
  };
  reads?: {
    name?: string;
    amount?: number;
    worth?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
    };
  };
  shares?: {
    name?: string;
    amount?: number;
    worth?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
      reads?: number;
    };
  };
  downloads?: {
    name?: string;
    amount?: number;
    worth?: number;
    base?: number;
    modifier?: number;
    cost?: {
      visits?: number;
      views?: number;
      reads?: number;
      shares?: number;
    };
  };
}
