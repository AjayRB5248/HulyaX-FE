export type IArtistItem = {
    _id: string;
    artistName: string;
    category: string;
    profileImage: string;  
}

export type IArtistTableFilters = {
    artistName: string;
    status: string;
  };