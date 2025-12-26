export interface Movie{
    id?:number,
    movieName:string,
    releaseYear:string,
    genre:string,
    description:string,
    posterUrl:string

}
export interface Review{
    reviewId?:number,
    movie:Movie,
    currentuser:string,
    rating:number,
    comment:string,
    createdAt?:string
}
export interface OMDBMovie {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbID: string;
}
export interface statistics{
  totalReviews:number
  avgRating:number
  totalUsers:number
  mostReviewed:string
}