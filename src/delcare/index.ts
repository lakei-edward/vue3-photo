export type Iamge = {
  id: string;
  name: string;
  poster: string;
  duration: number;
  updateTime: string;
};

export type Video = {
  id: string;
  name: string;
  url: string;
  uploadTime: string;
};

export interface Album {
  readonly id: string;
  readonly name: string;
  readonly poster: string;
  readonly imageList: Array<Iamge>;
  readonly videoList: Array<Video>;
}
