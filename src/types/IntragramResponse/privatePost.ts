export interface Welcome {
  username?:        string;
  followers_count?: number;
  media?:           Media;
  id?:              string;
}

export interface Media {
  data?:   MediaDatum[];
  paging?: Paging;
}

export interface MediaDatum {
  caption?:       string;
  media_url?:     string;
  permalink?:     string;
  shortcode?:     string;
  insights?:      Insights;
  id?:            string;
  thumbnail_url?: string;
}

export interface Insights {
  data?: InsightsDatum[];
}

export interface InsightsDatum {
  name?:   Name;
  values?: Value[];
  id?:     string;
}

export enum Name {
  Comments = "comments",
  Engagement = "engagement",
  Impressions = "impressions",
  Likes = "likes",
  Plays = "plays",
  Reach = "reach",
  Saved = "saved",
  Shares = "shares",
}

export interface Value {
  value?: number;
}

export interface Paging {
  cursors?: Cursors;
  next?:    string;
}

export interface Cursors {
  before?: string;
  after?:  string;
}
