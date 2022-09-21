export interface DisplayCardProps {
  id: number;
  title: string;
  name: string | undefined;
  poster_path: string;
  overview?: string;
  media_type?: string;
}

export interface MediaProps {
  media: {
    backdrop_path: string;
    genres: [
      {
        id: number;
        name: string;
      }
    ];
    homepage: string;
    original_language: string;
    original_title: string;
    original_name: string;
    name: string;
    title: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    last_air_date?: string;
    runtime?: number;
    rating?: number;
    poster_path: string;
    videos: {
      results: {
        official?: boolean;
        id: number;
        key: string;
      }[];
    };
    reviews: { results: [] };
    credits: {
      cast: {
        id: number;
        character: string;
        known_for_department: string;
        name: string;
        profile_path: string;
      }[];
    };
    images: {
      backdrops: { file_path: string }[];
    };
    similar: {
      results: DisplayCardProps[];
    };
  };
}
